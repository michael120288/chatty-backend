# Table-Driven Tests: string manipulation

**Level:** 134
**ID:** `vitest-134`
**XP:** 160
**Tags:** `table`, `driven`

## Objective

Complete the starter code using Table-Driven Tests: string manipulation so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Table-Driven Tests: string manipulation to implement the missing assertions and make everything pass.

## Hints
1. Section 9: Table-Driven Tests

## Solution

```javascript
import { test, expect } from 'vitest';

function slugify(text) {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

test.each([
  ['Hello World', 'hello-world'],
  ['My Blog Post!', 'my-blog-post'],
  ['  spaces  ', 'spaces'],
  ['already-slug', 'already-slug'],
  ['CamelCase Text', 'camelcase-text'],
])('slugify(%s) = %s', (input, expected) => {
  expect(slugify(input)).toBe(expected);
});
```

## Explanation

`Table` lets you complete the starter code using Table-Driven Tests: string manipulation so all tests run and pass with exit code 0. Use it in your tests to verify the expected behavior.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function slugify(text) {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

test.each([
  ['Hello World',    'hello-world'  ],
  ['My Blog Post!',  'my-blog-post' ],
  ['  spaces  ',     'spaces'       ],
  ['already-slug',   'already-slug' ],
  ['CamelCase',      'camelcase'    ],
])('slugify(%s) = %s', (input, expected) => {
  // TODO: assert slugify(input) equals expected
});
```
