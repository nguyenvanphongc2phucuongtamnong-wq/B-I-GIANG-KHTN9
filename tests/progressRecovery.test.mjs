import test from 'node:test';
import assert from 'node:assert/strict';
import {
  chooseRestoreLesson,
  commitProgressWrites,
  findProgressConflicts,
  resolveProgressDocuments
} from '../src/services/progressRecovery.js';

const record = (overrides = {}) => ({
  lessonId: 1,
  status: 'in_progress',
  progressPercent: 25,
  currentSection: 'sec_2',
  lastViewedSection: 'sec_2',
  startedAt: '2026-01-01T00:00:00.000Z',
  lastUpdatedAt: '2026-01-01T01:00:00.000Z',
  completedAt: null,
  completedSections: ['sec_1'],
  ...overrides
});

test('no data after successful read starts from the first unlocked lesson', () => {
  assert.deepEqual(chooseRestoreLesson({}, [1]), { status: 'selected', lessonId: 1, reason: 'no_progress' });
});

test('restores newest valid in-progress lesson that is already unlocked', () => {
  const result = chooseRestoreLesson({
    1: record({ lessonId: 1, lastUpdatedAt: '2026-01-01T01:00:00.000Z' }),
    2: record({ lessonId: 2, lastUpdatedAt: '2026-01-02T01:00:00.000Z' })
  }, [1, 2]);
  assert.deepEqual(result, { status: 'selected', lessonId: 2, reason: 'in_progress' });
});

test('does not unlock or restore a lesson that is still locked', () => {
  const result = chooseRestoreLesson({ 2: record({ lessonId: 2 }) }, [1]);
  assert.deepEqual(result, { status: 'selected', lessonId: 1, reason: 'first_incomplete_unlocked' });
});

test('chooses first incomplete unlocked lesson when none is in progress', () => {
  const result = chooseRestoreLesson({ 1: record({ lessonId: 1, status: 'completed' }) }, [1, 2, 3]);
  assert.deepEqual(result, { status: 'selected', lessonId: 2, reason: 'first_incomplete_unlocked' });
});

test('chooses the most recently completed unlocked lesson for review', () => {
  const result = chooseRestoreLesson({
    1: record({ lessonId: 1, status: 'completed', lastUpdatedAt: '2026-01-01T01:00:00.000Z' }),
    2: record({ lessonId: 2, status: 'completed', lastUpdatedAt: '2026-01-02T01:00:00.000Z' })
  }, [1, 2]);
  assert.deepEqual(result, { status: 'selected', lessonId: 2, reason: 'latest_completed_review' });
});

test('reports ambiguous active records instead of relying on Firestore order', () => {
  const timestamp = '2026-01-01T01:00:00.000Z';
  const result = chooseRestoreLesson({
    1: record({ lessonId: 1, lastUpdatedAt: timestamp }),
    2: record({ lessonId: 2, lastUpdatedAt: timestamp })
  }, [1, 2]);
  assert.deepEqual(result, { status: 'conflict', reason: 'ambiguous_active_progress' });
});

test('reports active progress without a valid timestamp as a conflict', () => {
  const result = chooseRestoreLesson({ 1: record({ lastUpdatedAt: 'invalid' }) }, [1]);
  assert.deepEqual(result, { status: 'conflict', reason: 'missing_active_timestamp' });
});

test('supports either document ID format and equivalent aliases', () => {
  const data = record();
  assert.deepEqual(resolveProgressDocuments([]), { status: 'not_found' });
  assert.deepEqual(resolveProgressDocuments([{ id: '1', data }]), { status: 'found', progress: data });
  assert.deepEqual(resolveProgressDocuments([{ id: 'lesson1', data }]), { status: 'found', progress: data });
  assert.deepEqual(findProgressConflicts([
    { id: '1', data },
    { id: 'lesson1', data: { ...data } }
  ]), []);
});

test('flags conflicting aliases without choosing the higher percentage', () => {
  assert.deepEqual(findProgressConflicts([
    { id: '2', data: record({ lessonId: 2, progressPercent: 25 }) },
    { id: 'lesson2', data: record({ lessonId: 2, progressPercent: 75 }) }
  ]), [{ lessonId: 2, reason: 'alias_documents_disagree' }]);
});

test('detects conflicts in status, timestamps, section, and restore details', () => {
  for (const overrides of [
    { status: 'completed' },
    { lastUpdatedAt: '2026-01-02T01:00:00.000Z' },
    { currentSection: 'sec_3' },
    { completedSections: ['sec_1', 'sec_2'] },
    { currentTopicIdx: 2 }
  ]) {
    assert.equal(findProgressConflicts([
      { id: '1', data: record() },
      { id: 'lesson1', data: record(overrides) }
    ])[0]?.reason, 'alias_documents_disagree');
  }
});

test('a rejected Firestore read remains an error, not a not-found result', async () => {
  const readBothAliases = () => Promise.all([
    Promise.resolve({ id: '1', data: record() }),
    Promise.reject(new Error('read denied'))
  ]);
  await assert.rejects(readBothAliases, /read denied/);
});

test('primary write failure does not run compatibility write or report success', async () => {
  let compatibilityCalled = false;
  await assert.rejects(commitProgressWrites(
    async () => { throw new Error('primary failed'); },
    async () => { compatibilityCalled = true; }
  ), /primary failed/);
  assert.equal(compatibilityCalled, false);
});

test('secondary mirror failure is reported separately after primary success', async () => {
  const result = await commitProgressWrites(async () => {}, async () => { throw new Error('mirror failed'); });
  assert.deepEqual(result, { status: 'saved_with_warning' });
});

test('initialization skips writes if progress appeared after the first read', async () => {
  let compatibilityCalled = false;
  const result = await commitProgressWrites(
    async () => ({ status: 'already_exists' }),
    async () => { compatibilityCalled = true; }
  );
  assert.deepEqual(result, { status: 'already_exists' });
  assert.equal(compatibilityCalled, false);
});

test('flags invalid progress record when percent is negative or greater than 100', () => {
  assert.deepEqual(findProgressConflicts([
    { id: '1', data: record({ lessonId: 1, progressPercent: 120 }) }
  ]), [{ lessonId: 1, reason: 'invalid_progress_record' }]);
  assert.deepEqual(findProgressConflicts([
    { id: '1', data: record({ lessonId: 1, progressPercent: -10 }) }
  ]), [{ lessonId: 1, reason: 'invalid_progress_record' }]);
});

test('flags invalid status outside allowed enum values', () => {
  assert.deepEqual(findProgressConflicts([
    { id: '1', data: record({ lessonId: 1, status: 'unknown_status' }) }
  ]), [{ lessonId: 1, reason: 'invalid_progress_record' }]);
});
