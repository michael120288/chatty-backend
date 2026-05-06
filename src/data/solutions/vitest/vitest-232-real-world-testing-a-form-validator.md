# Real-World: testing a form validator

**Level:** 232
**ID:** `vitest-232`
**XP:** 240
**Tags:** `validation`, `forms`

## Objective

Complete the starter code using Real-World: testing a form validator so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Real-World: testing a form validator to implement the missing assertions and make everything pass.

## Hints
1. Section 16: Real-World Patterns

## Solution

```javascript
import { test, expect } from 'vitest';

interface ValidationResult { valid: boolean; errors: Record<string, string>; }

class FormValidator {
  private rules: Record<string, Array<(v: string) => string | null>> = {};

  addField(name: string, ...validators: Array<(v: string) => string | null>) {
    this.rules[name] = validators;
    return this;
  }

  validate(data: Record<string, string>): ValidationResult {
    const errors: Record<string, string> = {};
    for (const [field, validators] of Object.entries(this.rules)) {
      const value = data[field] || '';
      for (const validator of validators) {
        const error = validator(value);
        if (error) { errors[field] = error; break; }
      }
    }
    return { valid: Object.keys(errors).length === 0, errors };
  }
}

const required = (v: string) => v.trim() ? null : 'Required';
const minLen = (n: number) => (v: string) => v.length >= n ? null : \`Min \${n} chars\`;
const isEmail = (v: string) => /^[^@]+@[^@]+\.[^@]+$/.test(v) ? null : 'Invalid email';

test('form validator: valid data', () => {
  const validator = new FormValidator()
    .addField('name', required, minLen(2))
    .addField('email', required, isEmail);

  const result = validator.validate({ name: 'Alice', email: 'alice@test.com' });
  expect(result.valid).toBe(true);
  expect(result.errors).toEqual({});
});

test('form validator: invalid data', () => {
  const validator = new FormValidator()
    .addField('name', required, minLen(2))
    .addField('email', required, isEmail);

  const result = validator.validate({ name: 'A', email: 'bad-email' });
  expect(result.valid).toBe(false);
  expect(result.errors.name).toContain('Min 2');
  expect(result.errors.email).toContain('Invalid email');
});
```

## Explanation

`Real` Test a comprehensive form validation class.

## Starter Code

```javascript
import { test, expect } from 'vitest';

interface ValidationResult { valid: boolean; errors: Record<string, string>; }

class FormValidator {
  private rules: Record<string, Array<(v: string) => string | null>> = {};

  addField(name: string, ...validators: Array<(v: string) => string | null>) {
    this.rules[name] = validators;
    return this;
  }

  validate(data: Record<string, string>): ValidationResult {
    const errors: Record<string, string> = {};
    for (const [field, validators] of Object.entries(this.rules)) {
      const value = data[field] || '';
      for (const validator of validators) {
        const error = validator(value);
        if (error) { errors[field] = error; break; }
      }
    }
    return { valid: Object.keys(errors).length === 0, errors };
  }
}

const required = (v: string) => v.trim() ? null : 'Required';
const minLen = (n: number) => (v: string) => v.length >= n ? null : \`Min \${n} chars\`;
const isEmail = (v: string) => /^[^@]+@[^@]+\.[^@]+$/.test(v) ? null : 'Invalid email';

test('form validator: valid data', () => {
  const validator = new FormValidator()
    .addField('name', required, minLen(2))
    .addField('email', required, isEmail);

  const result = validator.validate({ name: 'Alice', email: 'alice@test.com' });
  // TODO: add assertion using Real-World: testing a form validator
  // TODO: add assertion using Real-World: testing a form validator
});

test('form validator: invalid data', () => {
  const validator = new FormValidator()
    .addField('name', required, minLen(2))
    .addField('email', required, isEmail);

  const result = validator.validate({ name: 'A', email: 'bad-email' });
  // TODO: add assertion using Real-World: testing a form validator
  // TODO: add assertion using Real-World: testing a form validator
  // TODO: add assertion using Real-World: testing a form validator
});
```
