# Table-Driven Tests: test.each with objects

**Level:** 122
**ID:** `vitest-122`
**XP:** 150
**Tags:** `parameterized`, `test.each`

## Objective

Complete the starter code using Table-Driven Tests: test.each with objects so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Table-Driven Tests: test.each with objects to implement the missing assertions and make everything pass.

## Hints
1. Section 9: Table-Driven Tests

## Solution

```javascript
import { test, expect } from 'vitest';

function greet(name, lang) {
  if (lang === 'es') return \`Hola, \${name}!\`;
  return \`Hello, \${name}!\`;
}

test.each([
  { name: 'Alice', lang: 'en', expected: 'Hello, Alice!' },
  { name: 'Bob', lang: 'es', expected: 'Hola, Bob!' },
  { name: 'Charlie', lang: 'en', expected: 'Hello, Charlie!' },
])('greet $name in $lang', ({ name, lang, expected }) => {
  expect(greet(name, lang)).toBe(expected);
});
```

## Explanation

`Table` Use objects as test.each rows for named properties.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function greet(name, lang) {
  if (lang === 'es') return `Hola, ${name}!`;
  return `Hello, ${name}!`;
}

test.each([
  { name: 'Alice', lang: 'en', expected: 'Hello, Alice!' },
  { name: 'Bob',   lang: 'es', expected: 'Hola, Bob!' },
  { name: 'Charlie', lang: 'en', expected: 'Hello, Charlie!' },
])('greet $name in $lang', ({ name, lang, expected }) => {
  // TODO: assert that greet(name, lang) equals expected
});
```
