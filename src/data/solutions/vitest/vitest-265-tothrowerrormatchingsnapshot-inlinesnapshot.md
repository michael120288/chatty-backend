# toThrowErrorMatchingSnapshot & InlineSnapshot

**Level:** 265
**ID:** `vitest-265`
**XP:** 200
**Tags:** `snapshots`, `errors`

## Objective

Complete the starter code using toThrowErrorMatchingSnapshot & InlineSnapshot so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use toThrowErrorMatchingSnapshot & InlineSnapshot to implement the missing assertions and make everything pass.

## Hints
1. Section 17: Missing API Coverage

## Solution

```javascript
import { test, expect } from 'vitest';

class ValidationError extends Error {
  constructor(field, reason) {
    super(\`Validation failed for '\${field}': \${reason}\`);
    this.name = 'ValidationError';
    this.field = field;
  }
}

function validateEmail(email) {
  if (!email) throw new ValidationError('email', 'is required');
  if (!email.includes('@')) throw new ValidationError('email', 'must contain @');
  return true;
}

function validateAge(age) {
  if (typeof age !== 'number') throw new TypeError('Age must be a number');
  if (age < 0) throw new RangeError('Age cannot be negative');
  return true;
}

test('email required error matches inline snapshot', () => {
  expect(() => validateEmail('')).toThrowErrorMatchingInlineSnapshot(
    \`"Validation failed for 'email': is required"\`
  );
});

test('email format error matches inline snapshot', () => {
  expect(() => validateEmail('notanemail')).toThrowErrorMatchingInlineSnapshot(
    \`"Validation failed for 'email': must contain @"\`
  );
});

test('age type error matches inline snapshot', () => {
  expect(() => validateAge('old')).toThrowErrorMatchingInlineSnapshot(
    \`"Age must be a number"\`
  );
});

test('age negative error matches inline snapshot', () => {
  expect(() => validateAge(-5)).toThrowErrorMatchingInlineSnapshot(
    \`"Age cannot be negative"\`
  );
});

test('toThrowErrorMatchingSnapshot for email validation', () => {
  expect(() => validateEmail('')).toThrowErrorMatchingSnapshot();
});
```

## Explanation

`toThrowErrorMatchingSnapshot & InlineSnapshot` Lock error messages in snapshots so accidental error message changes break the test.

## Starter Code

```javascript
import { test, expect } from 'vitest';

class ValidationError extends Error {
  constructor(field, reason) {
    super(\`Validation failed for '\${field}': \${reason}\`);
    this.name = 'ValidationError';
    this.field = field;
  }
}

function validateEmail(email) {
  if (!email) throw new ValidationError('email', 'is required');
  if (!email.includes('@')) throw new ValidationError('email', 'must contain @');
  return true;
}

function validateAge(age) {
  if (typeof age !== 'number') throw new TypeError('Age must be a number');
  if (age < 0) throw new RangeError('Age cannot be negative');
  return true;
}

test('email required error matches inline snapshot', () => {
  // TODO: add assertion using toThrowErrorMatchingSnapshot & InlineSnapshot
    \`"Validation failed for 'email': is required"\`
  );
});

test('email format error matches inline snapshot', () => {
  // TODO: add assertion using toThrowErrorMatchingSnapshot & InlineSnapshot
    \`"Validation failed for 'email': must contain @"\`
  );
});

test('age type error matches inline snapshot', () => {
  // TODO: add assertion using toThrowErrorMatchingSnapshot & InlineSnapshot
    \`"Age must be a number"\`
  );
});

test('age negative error matches inline snapshot', () => {
  // TODO: add assertion using toThrowErrorMatchingSnapshot & InlineSnapshot
    \`"Age cannot be negative"\`
  );
});

test('toThrowErrorMatchingSnapshot for email validation', () => {
  // TODO: add assertion using toThrowErrorMatchingSnapshot & InlineSnapshot
});
```
