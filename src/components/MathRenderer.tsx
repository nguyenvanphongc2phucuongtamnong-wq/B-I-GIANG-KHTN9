import React, { useMemo } from 'react';
import katex from 'katex';

interface MathFormulaProps {
  formula: string;
  block?: boolean;
  className?: string;
}

/**
 * Làm sạch và chuẩn hóa chuỗi LaTeX trước khi đưa vào KaTeX:
 * - Loại bỏ các delimiter nếu có ($$, \[, \(, $)
 * - Chuẩn hóa chỉ số dưới tiếng Việt theo chuẩn LaTeX:
 *   W_đ -> W_{\text{đ}}, W_d -> W_{\text{đ}}, W_t -> W_{\text{t}}, W_c -> W_{\text{c}}
 * - Chuẩn hóa dấu nhân: '·' hoặc '•' -> \cdot
 * - Chuẩn hóa số mũ: '²' -> ^2, '³' -> ^3
 * - Chuẩn hóa mũi tên và tương đương: '=>' hoặc '➔' -> \Rightarrow, '<=>' -> \iff
 * - Chuẩn hóa hằng số: 'hằng số' -> \text{const}
 * - Chuẩn hóa phân số đơn giản: '1/2' đứng trước biến -> \frac{1}{2}
 */
export function cleanLatex(raw: string): { tex: string; isBlock: boolean } {
  let text = (raw || '').trim();
  let isBlock = false;

  // Kiểm tra block delimiters ($$ ... $$, \[ ... \])
  if (text.startsWith('$$') && text.endsWith('$$')) {
    text = text.slice(2, -2).trim();
    isBlock = true;
  } else if (text.startsWith('\\[') && text.endsWith('\\]')) {
    text = text.slice(2, -2).trim();
    isBlock = true;
  } else if (text.startsWith('\\(') && text.endsWith('\\)')) {
    text = text.slice(2, -2).trim();
    isBlock = false;
  } else if (text.startsWith('$') && text.endsWith('$') && text.length > 2) {
    text = text.slice(1, -1).trim();
    isBlock = false;
  }

  // Chuẩn hóa chỉ số dưới tiếng Việt
  text = text.replace(/W_đ/g, 'W_{\\text{đ}}');
  text = text.replace(/W_d(?![a-zA-Z])/g, 'W_{\\text{đ}}');
  text = text.replace(/W_t(?![a-zA-Z])/g, 'W_{\\text{t}}');
  text = text.replace(/W_c(?![a-zA-Z])/g, 'W_{\\text{c}}');
  text = text.replace(/W_đỉnh/g, 'W_{\\text{đỉnh}}');
  text = text.replace(/W_chân/g, 'W_{\\text{chân}}');
  text = text.replace(/W_ban_đầu/g, 'W_{\\text{ban đầu}}');
  text = text.replace(/W_lúc_sau/g, 'W_{\\text{lúc sau}}');
  text = text.replace(/\bWđ\b/g, 'W_{\\text{đ}}');
  text = text.replace(/\bWt\b/g, 'W_{\\text{t}}');
  text = text.replace(/\bWc\b/g, 'W_{\\text{c}}');
  text = text.replace(/F_cản/g, 'F_{\\text{cản}}');
  text = text.replace(/F_kéo/g, 'F_{\\text{kéo}}');
  text = text.replace(/A_cản/g, 'A_{\\text{cản}}');
  text = text.replace(/A_ma_sát/g, 'A_{\\text{ms}}');
  text = text.replace(/A_ms/g, 'A_{\\text{ms}}');
  text = text.replace(/P_vật/g, 'P_{\\text{vật}}');
  text = text.replace(/v_thực/g, 'v_{\\text{thực}}');

  // Chuẩn hóa ký hiệu toán học
  text = text.replace(/·/g, ' \\cdot ');
  text = text.replace(/•/g, ' \\cdot ');
  text = text.replace(/²/g, '^2');
  text = text.replace(/³/g, '^3');
  text = text.replace(/=>/g, ' \\Rightarrow ');
  text = text.replace(/➔/g, ' \\Rightarrow ');
  text = text.replace(/<=>/g, ' \\iff ');
  text = text.replace(/\bhằng số\b/g, '\\text{const}');

  // Chuẩn hóa phân số dạng 1/2 đứng trước biến
  text = text.replace(/\b1\/2(?=\s*([a-zA-Z\\]|\{))/g, '\\frac{1}{2} ');

  return { tex: text, isBlock };
}

/**
 * Render trực tiếp một công thức toán sang chuỗi HTML của KaTeX
 */
export function renderLatexToHtml(formula: string, isBlock: boolean = false): string {
  const { tex, isBlock: detectedBlock } = cleanLatex(formula);
  const displayMode = isBlock || detectedBlock;
  try {
    return katex.renderToString(tex, {
      displayMode,
      throwOnError: false,
      strict: false,
      trust: true,
    });
  } catch (err) {
    console.warn('[KaTeX render error]:', err, tex);
    return `<span class="text-rose-500 font-mono text-xs">${tex}</span>`;
  }
}

/**
 * Component React render một công thức toán học KaTeX thuần túy
 */
export const MathFormula: React.FC<MathFormulaProps> = ({ formula, block = false, className = '' }) => {
  const { tex, isBlock } = useMemo(() => cleanLatex(formula), [formula]);
  const displayMode = block || isBlock;

  const html = useMemo(() => {
    try {
      return katex.renderToString(tex, {
        displayMode,
        throwOnError: false,
        strict: false,
        trust: true,
      });
    } catch (err) {
      console.warn('[KaTeX error]:', err, tex);
      return `<span class="text-rose-500 font-mono text-xs">${tex}</span>`;
    }
  }, [tex, displayMode]);

  if (displayMode) {
    return (
      <div 
        className={`my-3 py-3 px-4 bg-slate-50/80 rounded-2xl border border-slate-200/80 flex items-center justify-center overflow-x-auto text-slate-900 shadow-2xs ${className}`}
        dangerouslySetInnerHTML={{ __html: html }} 
      />
    );
  }

  return (
    <span 
      className={`inline-block align-baseline mx-0.5 text-slate-900 ${className}`}
      dangerouslySetInnerHTML={{ __html: html }} 
    />
  );
};

interface MathTextProps {
  text: string | null | undefined;
  className?: string;
  blockFormulaClass?: string;
}

interface ParsedToken {
  type: 'block' | 'inline' | 'text';
  content: string;
}

/**
 * Phân tích và trích xuất các công thức toán từ văn bản:
 * 1. Nhận diện các cú pháp chuẩn:
 *    - Block: $$ ... $$ hoặc \[ ... \]
 *    - Inline: \( ... \) hoặc $ ... $
 * 2. Tự động nhận diện công thức LaTeX chưa được bọc delimiter:
 *    - Chứa \frac{...}{...}, \sqrt{...}, \cdot, \text{...}, \Delta, \iff, \Rightarrow
 *    - Chứa biểu thức vật lí như:
 *      + W_c = W_d + W_t = \frac{1}{2} m v^2 + m g h
 *      + W_đ = \frac{1}{2} m v^2
 *      + W_t = P \cdot h = m \cdot g \cdot h
 *      + A = F \cdot s
 *      + P = \frac{A}{t} = F \cdot v
 *      + v^2, mgh, \frac{1}{2}
 */
export function parseMathTokens(input: string): ParsedToken[] {
  if (!input) return [];

  // 1. Phân tách theo delimiters chuẩn: $$ ... $$, \[ ... \], \( ... \), $ ... $
  const mainRegex = /(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\\\(.*?\\\)|\$(?:\\\$|[^\$\n])+?\$)/g;
  const rawParts = input.split(mainRegex);

  const tokens: ParsedToken[] = [];

  // Regex nhận diện các khối công thức toán LaTeX không bọc delimiter
  const unescapedMathRegex = /(\\frac\{[^{}]+\}\{[^{}]+\}|\\sqrt\{[^{}]+\}|W_c\s*=\s*(?:W_d|W_đ)\s*\+\s*W_t\s*=\s*(?:\\frac\{1\}\{2\}|1\/2)\s*m\s*v\^2\s*\+\s*m\s*g\s*h|W_c\s*=\s*(?:W_d|W_đ)\s*\+\s*W_t\s*=\s*\\text\{const\}|\b(?:W_c|W_đ|W_t|W_d|v\^2|m\s*g\s*h|mgh|A\s*=\s*F\s*\\cdot\s*s|P\s*=\s*\\frac\{A\}\{t\}(?:\s*=\s*F\s*\\cdot\s*v)?)\b|\\frac\{1\}\{2\})/g;

  for (const part of rawParts) {
    if (!part) continue;

    // 1. Block: $$ ... $$
    if (part.startsWith('$$') && part.endsWith('$$')) {
      tokens.push({ type: 'block', content: part.slice(2, -2).trim() });
    } 
    // 2. Block: \[ ... \]
    else if (part.startsWith('\\[') && part.endsWith('\\]')) {
      tokens.push({ type: 'block', content: part.slice(2, -2).trim() });
    } 
    // 3. Inline: \( ... \)
    else if (part.startsWith('\\(') && part.endsWith('\\)')) {
      tokens.push({ type: 'inline', content: part.slice(2, -2).trim() });
    } 
    // 4. Inline: $ ... $
    else if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
      tokens.push({ type: 'inline', content: part.slice(1, -1).trim() });
    } 
    // 5. Text thô: kiểm tra nếu có un-delimited LaTeX
    else {
      if (
        part.includes('\\frac') || 
        part.includes('\\sqrt') || 
        part.includes('W_c =') || 
        part.includes('W_d +') ||
        part.includes('v^2') ||
        part.includes('mgh') ||
        part.includes('m g h') ||
        part.includes('A = F') ||
        part.includes('P = \\frac')
      ) {
        const subParts = part.split(unescapedMathRegex);
        for (const sp of subParts) {
          if (!sp) continue;
          if (
            sp.includes('\\frac') || 
            sp.includes('\\sqrt') || 
            sp.includes('\\cdot') || 
            sp.startsWith('W_c =') || 
            sp.includes('W_d +') ||
            sp === 'v^2' || 
            sp === 'mgh' || 
            sp.trim() === 'm g h' || 
            sp.startsWith('A = F') ||
            sp.startsWith('P = \\frac') ||
            sp === '\\frac{1}{2}'
          ) {
            tokens.push({ type: 'inline', content: sp.trim() });
          } else {
            tokens.push({ type: 'text', content: sp });
          }
        }
      } else {
        tokens.push({ type: 'text', content: part });
      }
    }
  }

  return tokens;
}

/**
 * Phân tích và render đoạn văn bản chứa hỗn hợp text và công thức toán:
 * Đảm bảo mọi công thức toán học hiển thị chuẩn KaTeX, không bao giờ lộ raw LaTeX.
 */
export const MathText: React.FC<MathTextProps> = ({ 
  text, 
  className = '',
  blockFormulaClass = '' 
}) => {
  const renderedContent = useMemo(() => {
    if (!text) return null;

    const tokens = parseMathTokens(text);

    return tokens.map((token, index) => {
      if (token.type === 'block') {
        const { tex } = cleanLatex(token.content);
        try {
          const html = katex.renderToString(tex, {
            displayMode: true,
            throwOnError: false,
            strict: false,
            trust: true,
          });
          return (
            <div
              key={index}
              className={`my-3 py-3 px-4 bg-blue-50/50 rounded-2xl border border-blue-200/70 flex items-center justify-center overflow-x-auto text-blue-950 font-medium shadow-2xs ${blockFormulaClass}`}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        } catch {
          return <span key={index} className="text-rose-500 font-mono">{token.content}</span>;
        }
      }

      if (token.type === 'inline') {
        const { tex } = cleanLatex(token.content);
        try {
          const html = katex.renderToString(tex, {
            displayMode: false,
            throwOnError: false,
            strict: false,
            trust: true,
          });
          return (
            <span
              key={index}
              className="inline-block align-baseline mx-0.5"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        } catch {
          return <span key={index} className="text-rose-500 font-mono">{token.content}</span>;
        }
      }

      // Xử lý xuống dòng cho text thông thường
      const lines = token.content.split('\n');
      if (lines.length === 1) {
        return <span key={index}>{token.content}</span>;
      }

      return (
        <span key={index}>
          {lines.map((line, lIdx) => (
            <React.Fragment key={lIdx}>
              {lIdx > 0 && <br />}
              {line}
            </React.Fragment>
          ))}
        </span>
      );
    });
  }, [text, blockFormulaClass]);

  return <span className={className}>{renderedContent}</span>;
};
