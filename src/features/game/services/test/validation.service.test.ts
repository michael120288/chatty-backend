import { ValidationService } from '@game/services/validation.service';
import { config } from '@root/config';

describe('ValidationService', () => {
  let service: ValidationService;

  beforeEach(() => {
    service = new ValidationService();
  });

  describe('valid code', () => {
    it('accepts a normal Cypress test', () => {
      const code = `describe('test', () => { it('works', () => { cy.visit('/'); cy.get('h1').should('exist'); }); });`;
      expect(service.validate(code)).toEqual({ valid: true });
    });

    it('accepts a plain Node.js assertion', () => {
      const code = `const x = 1 + 1; console.log(x);`;
      expect(service.validate(code)).toEqual({ valid: true });
    });

    it('accepts code at exactly MAX_CODE_LENGTH', () => {
      const code = 'a'.repeat(config.MAX_CODE_LENGTH);
      expect(service.validate(code).valid).toBe(true);
    });
  });

  describe('empty / invalid input', () => {
    it('rejects an empty string', () => {
      const result = service.validate('');
      expect(result.valid).toBe(false);
      expect(result.reason).toMatch(/non-empty string/);
    });

    it('rejects null', () => {
      const result = service.validate(null as unknown as string);
      expect(result.valid).toBe(false);
      expect(result.reason).toMatch(/non-empty string/);
    });

    it('rejects a number', () => {
      const result = service.validate(42 as unknown as string);
      expect(result.valid).toBe(false);
    });
  });

  describe('code length', () => {
    it('rejects code exceeding MAX_CODE_LENGTH', () => {
      const code = 'a'.repeat(config.MAX_CODE_LENGTH + 1);
      const result = service.validate(code);
      expect(result.valid).toBe(false);
      expect(result.reason).toMatch(/exceeds maximum length/);
      expect(result.reason).toMatch(String(config.MAX_CODE_LENGTH));
    });
  });

  describe('blocked patterns', () => {
    const cases: Array<{ name: string; code: string }> = [
      { name: "require('fs')",            code: "const fs = require('fs');" },
      { name: 'require("fs")',            code: 'const fs = require("fs");' },
      { name: 'require(`fs`)',            code: 'const fs = require(`fs`);' },
      { name: "require('child_process')", code: "require('child_process');" },
      { name: "require('net')",           code: "require('net');" },
      { name: "require('dgram')",         code: "require('dgram');" },
      { name: "require('cluster')",       code: "require('cluster');" },
      { name: 'eval()',                   code: 'eval("alert(1)");' },
      { name: 'process.env',              code: 'const s = process.env.SECRET;' },
      { name: 'process.exit',             code: 'process.exit(0);' },
      { name: 'exec()',                   code: 'exec("ls -la");' },
      { name: 'spawn()',                  code: 'spawn("bash", ["-c", "ls"]);' },
      { name: 'fork()',                   code: 'fork("./worker");' },
      { name: 'writeFile',               code: 'fs.writeFile("x.txt", "data", cb);' },
      { name: 'unlink()',                 code: 'fs.unlink("file.txt", cb);' },
      { name: '__dirname',               code: 'path.join(__dirname, "file");' },
      { name: '__filename',              code: 'console.log(__filename);' },
    ];

    cases.forEach(({ name, code }) => {
      it(`blocks ${name}`, () => {
        const result = service.validate(code);
        expect(result.valid).toBe(false);
        expect(result.reason).toMatch(/Forbidden pattern/);
      });
    });
  });

  describe('blocklist bypass techniques', () => {
    const cases: Array<{ name: string; code: string }> = [
      { name: "process['env'] bracket access",              code: "process['env']" },
      { name: 'process["exit"] bracket access',              code: 'process["exit"](0)' },
      { name: "require() via string concatenation",          code: "require('child'+'_process')" },
      { name: 'Function() constructor',                      code: "Function('return process')()" },
      { name: 'new Function() constructor',                  code: "new Function('return process')()" },
      { name: '.constructor.constructor escape',             code: "this.constructor.constructor('return process')()" },
      { name: 'globalThis reference',                        code: 'globalThis.process' },
      { name: 'require() via template-literal interpolation', code: "require(`${'fs'}`)" },
      { name: 'dynamic import()',                             code: "import('fs')" },
    ];

    cases.forEach(({ name, code }) => {
      it(`blocks ${name}`, () => {
        const result = service.validate(code);
        expect(result.valid).toBe(false);
      });
    });
  });

  describe('legitimate code that must keep working', () => {
    const cases: Array<{ name: string; code: string }> = [
      {
        name: 'React component import for cypress-component levels',
        code: "import React from 'react';\nimport { HeroCard } from '../../components/HeroCard.jsx';",
      },
      {
        name: 'plain literal requires/imports of fs, os, path (levels that teach fs mocking)',
        code: "import fs from 'node:fs';\nimport path from 'path';\nimport os from 'os';\nconst { readFileSync } = require('node:fs');",
      },
    ];

    cases.forEach(({ name, code }) => {
      it(`allows ${name}`, () => {
        expect(service.validate(code)).toEqual({ valid: true });
      });
    });
  });
});
