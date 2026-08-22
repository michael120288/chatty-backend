import crypto from 'crypto';

export class Helpers {
  static firstLetterUppercase(str: string): string {
    const valueString = str.toLowerCase();
    return valueString
      .split(' ')
      .map((value: string) => `${value.charAt(0).toUpperCase()}${value.slice(1).toLowerCase()}`)
      .join(' ');
  }

  static lowerCase(str: string): string {
    return str.toLowerCase();
  }

  static generateRandomIntegers(integerLength: number): number {
    const bytes = crypto.randomBytes(Math.ceil(integerLength * 4 / 3));
    let result = '';
    for (const byte of bytes) {
      if (result.length >= integerLength) break;
      const digit = byte % 10;
      result += digit.toString();
    }
    return parseInt(result, 10);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static parseJson(prop: string): any {
    try {
      return JSON.parse(prop);
    } catch (error) {
      return prop;
    }
  }

  // For a value read from a Redis hash field that may genuinely be missing
  // (real `undefined`, not the field holding some falsy-but-present value).
  // Callers used to do `Helpers.parseJson(`${value}`)` unconditionally, which
  // stringifies a missing field to the literal text "undefined", fails to
  // JSON.parse, and returns that literal string back — corrupting the field
  // instead of falling back to a sane default.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static parseJsonSafe(value: unknown, fallback: any): any {
    if (value === undefined || value === null) {
      return fallback;
    }
    return Helpers.parseJson(`${value}`);
  }

  static isDataURL(value: string): boolean {
    const dataUrlRegex = /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\\/?%\s]*)\s*$/i;
    return dataUrlRegex.test(value);
  }

  static shuffle(list: string[]): string[] {
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  }

  static escapeRegex(text: string): string {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }
}