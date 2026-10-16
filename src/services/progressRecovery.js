const timestampOf = (value) => {
  if (typeof value !== 'string' || value.trim() === '') return null;
  const timestamp = Date.parse(value);
  return Number.isFinite(timestamp) ? timestamp : null;
};

/** Chọn bài khôi phục mà không làm thay đổi danh sách bài đã mở khóa. */
/** @param {Record<number, any>} progressByLesson @param {number[]} unlockedLessonIds @returns {{status:'selected',lessonId:number,reason:string}|{status:'conflict',reason:string}} */
export function chooseRestoreLesson(progressByLesson, unlockedLessonIds) {
  const records = Object.entries(progressByLesson || {})
    .map(([key, progress]) => [Number(key), progress])
    .filter(([lessonId, progress]) => Number.isInteger(lessonId) && lessonId > 0 && progress);
  const unlocked = [...new Set((unlockedLessonIds || []).filter(Number.isInteger))];
  const completed = new Set(records
    .filter(([, progress]) => progress.status === 'completed' || (typeof progress.examScore === 'number' && progress.examScore >= 5))
    .map(([lessonId]) => lessonId));
  const active = records.filter(([lessonId, progress]) => unlocked.includes(lessonId) && progress.status === 'in_progress');

  if (records.length === 0) {
    return unlocked.length > 0
      ? { status: 'selected', lessonId: unlocked[0], reason: 'no_progress' }
      : { status: 'conflict', reason: 'no_unlocked_lessons' };
  }

  if (active.length > 0) {
    const timed = active.map(([lessonId, progress]) => ({ lessonId, timestamp: timestampOf(progress.lastUpdatedAt) }));
    if (timed.some((item) => item.timestamp === null)) return { status: 'conflict', reason: 'missing_active_timestamp' };
    const newest = Math.max(...timed.map((item) => item.timestamp));
    const newestLessons = timed.filter((item) => item.timestamp === newest);
    if (newestLessons.length !== 1) return { status: 'conflict', reason: 'ambiguous_active_progress' };
    return { status: 'selected', lessonId: newestLessons[0].lessonId, reason: 'in_progress' };
  }

  const firstIncomplete = unlocked.find((lessonId) => !completed.has(lessonId));
  if (firstIncomplete !== undefined) return { status: 'selected', lessonId: firstIncomplete, reason: 'first_incomplete_unlocked' };

  const finished = records.filter(([lessonId]) => unlocked.includes(lessonId) && completed.has(lessonId));
  if (finished.length === 0) {
    return unlocked.length > 0
      ? { status: 'selected', lessonId: unlocked[0], reason: 'no_progress' }
      : { status: 'conflict', reason: 'no_unlocked_lessons' };
  }

  const timedFinished = finished.map(([lessonId, progress]) => ({
    lessonId,
    timestamp: timestampOf(progress.completedAt) ?? timestampOf(progress.lastUpdatedAt)
  }));
  if (timedFinished.some((item) => item.timestamp === null)) return { status: 'conflict', reason: 'missing_completion_timestamp' };
  const newest = Math.max(...timedFinished.map((item) => item.timestamp));
  const newestLessons = timedFinished.filter((item) => item.timestamp === newest);
  if (newestLessons.length !== 1) return { status: 'conflict', reason: 'ambiguous_completion_timestamp' };
  return { status: 'selected', lessonId: newestLessons[0].lessonId, reason: 'latest_completed_review' };
}

const normalize = (value) => {
  if (Array.isArray(value)) return [...value].sort((a, b) => String(a).localeCompare(String(b)));
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, normalize(value[key])]));
  }
  return value;
};

const comparableFields = [
  'lessonId', 'status', 'progressPercent', 'currentSection', 'lastViewedSection',
  'startedAt', 'lastUpdatedAt', 'completedAt', 'completedSections', 'currentTopicIdx',
  'completedTopicIds', 'practiceScore', 'practiceAnswers', 'examScore',
  'examMcAnswers', 'examEssayAnswers'
];

/** So sánh các trường ảnh hưởng đến khôi phục; không tự chọn một bản xung đột. */
/** @param {Array<{id:string,data:Record<string, any>}>} documents @returns {Array<{lessonId:number|null,reason:string}>} */
export function findProgressConflicts(documents) {
  const grouped = new Map();
  for (const document of documents) {
    const lessonId = Number(document?.data?.lessonId);
    if (!Number.isInteger(lessonId) || lessonId < 1) return [{ lessonId: null, reason: 'invalid_lesson_id' }];
    const idMatches = document.id === String(lessonId) || document.id === `lesson${lessonId}`;
    if (!idMatches) return [{ lessonId, reason: 'document_id_mismatch' }];
    const status = document.data.status;
    const percent = document.data.progressPercent;
    if (!['not_started', 'in_progress', 'completed'].includes(status) || typeof percent !== 'number' || percent < 0 || percent > 100) {
      return [{ lessonId, reason: 'invalid_progress_record' }];
    }
    const bucket = grouped.get(lessonId) || [];
    bucket.push(document);
    grouped.set(lessonId, bucket);
  }

  const conflicts = [];
  for (const [lessonId, matches] of grouped) {
    if (matches.length < 2) continue;
    const first = JSON.stringify(normalize(Object.fromEntries(comparableFields.map((key) => [key, matches[0].data[key]]))));
    if (matches.slice(1).some((match) => JSON.stringify(normalize(Object.fromEntries(comparableFields.map((key) => [key, match.data[key]])))) !== first)) {
      conflicts.push({ lessonId, reason: 'alias_documents_disagree' });
    }
  }
  return conflicts;
}

/** Chỉ báo không có dữ liệu khi cả hai lần đọc đã hoàn tất thành công. */
/** @template T @param {Array<{id:string,data:T}>} documents @returns {{status:'conflict'}|{status:'not_found'}|{status:'found',progress:T}} */
export function resolveProgressDocuments(documents) {
  const conflicts = findProgressConflicts(documents);
  if (conflicts.length > 0) return { status: 'conflict' };
  if (documents.length === 0) return { status: 'not_found' };
  return { status: 'found', progress: documents[0].data };
}

/** Bản chính phải ghi xong trước; đồng bộ phụ thất bại được báo riêng. */
/** @param {()=>Promise<{status?:string}|void>} commitPrimary @param {()=>Promise<unknown>} syncCompatibility @returns {Promise<{status:'saved'|'saved_with_warning'|'already_exists'}>} */
export async function commitProgressWrites(commitPrimary, syncCompatibility) {
  const primaryResult = await commitPrimary();
  if (primaryResult?.status === 'already_exists') return primaryResult;
  try {
    await syncCompatibility();
    return { status: 'saved' };
  } catch {
    return { status: 'saved_with_warning' };
  }
}
