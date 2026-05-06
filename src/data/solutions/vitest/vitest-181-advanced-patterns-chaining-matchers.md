# Advanced Patterns: chaining matchers

**Level:** 181
**ID:** `vitest-181`
**XP:** 180
**Tags:** `advanced`, `patterns`

## Objective

Complete the starter code using Advanced Patterns: chaining matchers so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Advanced Patterns: chaining matchers to implement the missing assertions and make everything pass.

## Hints
1. Section 12: Advanced Patterns

## Solution

```javascript
import { test, expect } from 'vitest';

function getMetrics() {
  return {
    requests: 1250,
    errors: 5,
    avgResponseTime: 145.7,
    uptime: 0.9994,
    tags: ['production', 'v2', 'stable'],
  };
}

test('metrics are within expected bounds', () => {
  const m = getMetrics();
  expect(m.requests).toBeGreaterThan(1000);
  expect(m.errors).toBeLessThan(10);
  expect(m.avgResponseTime).toBeCloseTo(145.7, 1);
  expect(m.uptime).toBeCloseTo(0.9994, 4);
  expect(m.tags).toContain('production');
  expect(m.tags).toHaveLength(3);
});
```

## Explanation

`Advanced Patterns` Chain Vitest matchers for readable assertions.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function getMetrics() {
  return {
    requests: 1250,
    errors: 5,
    avgResponseTime: 145.7,
    uptime: 0.9994,
    tags: ['production', 'v2', 'stable'],
  };
}

test('metrics are within expected bounds', () => {
  const m = getMetrics();
  // TODO: add assertion using Advanced Patterns: chaining matchers
  // TODO: add assertion using Advanced Patterns: chaining matchers
  // TODO: add assertion using Advanced Patterns: chaining matchers
  // TODO: add assertion using Advanced Patterns: chaining matchers
  // TODO: add assertion using Advanced Patterns: chaining matchers
  // TODO: add assertion using Advanced Patterns: chaining matchers
});
```
