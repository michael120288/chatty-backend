import { config } from '@root/config';

const BLOCKED_PATTERNS: RegExp[] = [
  /require\s*\(\s*['"`]fs['"`]\s*\)/,
  /require\s*\(\s*['"`]child_process['"`]\s*\)/,
  /require\s*\(\s*['"`]net['"`]\s*\)/,
  /require\s*\(\s*['"`]dgram['"`]\s*\)/,
  /require\s*\(\s*['"`]cluster['"`]\s*\)/,
  /\beval\s*\(/,
  /process\.env/,
  /process\.exit/,
  /\bexec\s*\(/,
  /\bspawn\s*\(/,
  /\bfork\s*\(/,
  /\.writeFile/,
  /\.readFile(?!Sync)/,
  /\brm\s*\(/,
  /\bunlink\s*\(/,
  /__dirname/,
  /__filename/,
  // Bracket/computed-property access used to dodge the dot-notation checks
  // above, e.g. process['env'], process["exit"], global['process'].
  /\bprocess\s*\[/,
  /\bglobal(?:This)?\s*\[/,
  // Dynamic import() — no sample level solution uses it, and it opens the
  // same arbitrary-module-loading surface as an unrestricted require().
  /\bimport\s*\(/,
  // Function constructor and .constructor chains — the classic way to reach
  // the global object / Function from inside a restricted scope.
  /\bnew\s+Function\s*\(/,
  /\bFunction\s*\(/,
  /\.constructor\s*\.\s*constructor\b/,
  /\bglobalThis\b/,
];

// A require() call is only accepted when its argument is a single plain
// string literal with no interpolation, e.g. require('path'). Anything else
// (string concatenation, template interpolation, computed expressions) is an
// obfuscation technique no legitimate level solution needs — see
// require('child'+'_process') / require(`${'fs'}`) bypass reports.
const REQUIRE_CALL = /require\s*\(/g;
const SAFE_REQUIRE_ARG = /^\s*(['"`])((?:(?!\1)[^\\]|\\.)*)\1\s*\)/;

function hasUnsafeRequireCall(code: string): boolean {
  REQUIRE_CALL.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = REQUIRE_CALL.exec(code))) {
    const rest = code.slice(match.index + match[0].length);
    const argMatch = SAFE_REQUIRE_ARG.exec(rest);
    if (!argMatch || (argMatch[1] === '`' && argMatch[2].includes('${'))) {
      return true;
    }
  }
  return false;
}

export class ValidationService {
  validate(code: string): { valid: boolean; reason?: string } {
    if (!code || typeof code !== 'string') {
      return { valid: false, reason: 'Code must be a non-empty string.' };
    }

    if (code.length > config.MAX_CODE_LENGTH) {
      return { valid: false, reason: `Code exceeds maximum length of ${config.MAX_CODE_LENGTH} characters.` };
    }

    for (const pattern of BLOCKED_PATTERNS) {
      if (pattern.test(code)) {
        return {
          valid: false,
          reason: `Forbidden pattern detected: ${pattern.source}. Security policy violation.`,
        };
      }
    }

    if (hasUnsafeRequireCall(code)) {
      return {
        valid: false,
        reason: 'require() must be called with a single plain string literal. Security policy violation.',
      };
    }

    return { valid: true };
  }
}

export const validationService = new ValidationService();
