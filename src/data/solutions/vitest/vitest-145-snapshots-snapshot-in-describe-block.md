# Snapshots: snapshot in describe block

**Level:** 145
**ID:** `vitest-145`
**XP:** 160
**Tags:** `organization`, `describe`

## Objective

Complete the starter code using Snapshots: snapshot in describe block so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Snapshots: snapshot in describe block to implement the missing assertions and make everything pass.

## Hints
1. Section 10: Snapshots

## Solution

```javascript
import { describe, test, expect } from 'vitest';

function formatDate(date, format) {
  const d = new Date(date);
  if (format === 'long') return d.toDateString();
  return d.toISOString().split('T')[0];
}

describe('formatDate', () => {
  describe('short format', () => {
    test('formats ISO date', () => {
      expect(formatDate('2024-01-15', 'short')).toMatchInlineSnapshot(\`"2024-01-15"\`);
    });
  });

  describe('long format', () => {
    test('formats readable date', () => {
      const result = formatDate('2024-01-15', 'long');
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
```

## Explanation

`Snapshots` Use snapshots inside nested describe blocks.

## Starter Code

```javascript
import { describe, test, expect } from 'vitest';

function formatDate(date, format) {
  const d = new Date(date);
  if (format === 'long') return d.toDateString();
  return d.toISOString().split('T')[0];
}

describe('formatDate', () => {
  describe('short format', () => {
    test('formats ISO date', () => {
      // TODO: add assertion using Snapshots: snapshot in describe block
    });
  });

  describe('long format', () => {
    test('formats readable date', () => {
      const result = formatDate('2024-01-15', 'long');
      // TODO: add assertion using Snapshots: snapshot in describe block
      // TODO: add assertion using Snapshots: snapshot in describe block
    });
  });
});
```
