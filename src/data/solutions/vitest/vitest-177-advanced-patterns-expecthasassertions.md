# Advanced Patterns: expect.hasAssertions()

**Level:** 177
**ID:** `vitest-177`
**XP:** 180
**Tags:** `advanced`, `patterns`

## Objective

Complete the starter code using Advanced Patterns: expect.hasAssertions so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Advanced Patterns: expect.hasAssertions() to implement the missing assertions and make everything pass.

## Hints
1. Section 12: Advanced Patterns

## Solution

```javascript
import { test, expect } from 'vitest';

function fetchProfile(userId) {
  if (!userId) return Promise.reject(new Error('No user ID'));
  return Promise.resolve({ id: userId, name: 'Alice' });
}

test('fetchProfile resolves for valid ID', async () => {
  expect.hasAssertions();
  const profile = await fetchProfile(1);
  expect(profile.id).toBe(1);
  expect(profile.name).toBe('Alice');
});

test('fetchProfile rejects for missing ID', async () => {
  expect.hasAssertions();
  await expect(fetchProfile(null)).rejects.toThrow('No user ID');
});
```

## Explanation

`Advanced Patterns` Use expect.hasAssertions() to guarantee at least one assertion runs.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function fetchProfile(userId) {
  if (!userId) return Promise.reject(new Error('No user ID'));
  return Promise.resolve({ id: userId, name: 'Alice' });
}

test('fetchProfile resolves for valid ID', async () => {
  expect.hasAssertions();
  const profile = await fetchProfile(1);
  // TODO: add assertion using Advanced Patterns: expect.hasAssertions
  // TODO: add assertion using Advanced Patterns: expect.hasAssertions
});

test('fetchProfile rejects for missing ID', async () => {
  expect.hasAssertions();
  // TODO: add assertion using Advanced Patterns: expect.hasAssertions
});
```
