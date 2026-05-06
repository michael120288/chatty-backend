# Real-World: testing data pagination

**Level:** 242
**ID:** `vitest-242`
**XP:** 280
**Tags:** `integration`, `patterns`

## Objective

Complete the starter code using Real-World: testing data pagination so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Real-World: testing data pagination to implement the missing assertions and make everything pass.

## Hints
1. Section 16: Real-World Patterns

## Solution

```javascript
import { test, expect } from 'vitest';

interface PaginateOptions<T> {
  page: number;
  pageSize: number;
  filter?: (item: T) => boolean;
  sort?: (a: T, b: T) => number;
}

function paginate<T>(data: T[], opts: PaginateOptions<T>) {
  let items = [...data];
  if (opts.filter) items = items.filter(opts.filter);
  if (opts.sort) items = items.sort(opts.sort);
  const total = items.length;
  const start = (opts.page - 1) * opts.pageSize;
  const slice = items.slice(start, start + opts.pageSize);
  return {
    data: slice,
    total,
    page: opts.page,
    pageSize: opts.pageSize,
    totalPages: Math.ceil(total / opts.pageSize),
  };
}

const users = Array.from({ length: 25 }, (_, i) => ({ id: i + 1, name: \`User \${i + 1}\`, age: 20 + i }));

test('paginate returns correct page', () => {
  const result = paginate(users, { page: 2, pageSize: 10 });
  expect(result.data).toHaveLength(10);
  expect(result.data[0].id).toBe(11);
  expect(result.total).toBe(25);
  expect(result.totalPages).toBe(3);
});

test('paginate with filter', () => {
  const result = paginate(users, {
    page: 1,
    pageSize: 5,
    filter: u => u.age >= 35,
  });
  expect(result.data.every(u => u.age >= 35)).toBe(true);
});

test('paginate with sort descending', () => {
  const result = paginate(users.slice(0, 5), {
    page: 1,
    pageSize: 5,
    sort: (a, b) => b.id - a.id,
  });
  expect(result.data[0].id).toBe(5);
  expect(result.data[4].id).toBe(1);
});
```

## Explanation

`Real` Test a paginator utility with sorting and filtering.

## Starter Code

```javascript
import { test, expect } from 'vitest';

interface PaginateOptions<T> {
  page: number;
  pageSize: number;
  filter?: (item: T) => boolean;
  sort?: (a: T, b: T) => number;
}

function paginate<T>(data: T[], opts: PaginateOptions<T>) {
  let items = [...data];
  if (opts.filter) items = items.filter(opts.filter);
  if (opts.sort) items = items.sort(opts.sort);
  const total = items.length;
  const start = (opts.page - 1) * opts.pageSize;
  const slice = items.slice(start, start + opts.pageSize);
  return {
    data: slice,
    total,
    page: opts.page,
    pageSize: opts.pageSize,
    totalPages: Math.ceil(total / opts.pageSize),
  };
}

const users = Array.from({ length: 25 }, (_, i) => ({ id: i + 1, name: \`User \${i + 1}\`, age: 20 + i }));

test('paginate returns correct page', () => {
  const result = paginate(users, { page: 2, pageSize: 10 });
  // TODO: add assertion using Real-World: testing data pagination
  // TODO: add assertion using Real-World: testing data pagination
  // TODO: add assertion using Real-World: testing data pagination
  // TODO: add assertion using Real-World: testing data pagination
});

test('paginate with filter', () => {
  const result = paginate(users, {
    page: 1,
    pageSize: 5,
    filter: u => u.age >= 35,
  });
  // TODO: add assertion using Real-World: testing data pagination
});

test('paginate with sort descending', () => {
  const result = paginate(users.slice(0, 5), {
    page: 1,
    pageSize: 5,
    sort: (a, b) => b.id - a.id,
  });
  // TODO: add assertion using Real-World: testing data pagination
  // TODO: add assertion using Real-World: testing data pagination
});
```
