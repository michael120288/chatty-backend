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
];

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

    return { valid: true };
  }
}

export const validationService = new ValidationService();
