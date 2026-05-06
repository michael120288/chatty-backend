# Advanced Patterns: expect.stringContaining and expect.stringMatching

**Level:** 179
**ID:** `vitest-179`
**XP:** 190
**Tags:** `advanced`, `patterns`

## Objective

Complete the starter code using Advanced Patterns: expect.stringContaining and expect.stringMatching so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Advanced Patterns: expect.stringContaining and expect.stringMatching to implement the missing assertions and make everything pass.

## Hints
1. Section 12: Advanced Patterns

## Solution

```javascript
import { test, expect, vi } from 'vitest';

const logger = { log: vi.fn() };

function logAction(action, user) {
  logger.log(\`[\${new Date().toISOString()}] User \${user} performed: \${action}\`);
}

test('logger message content', () => {
  logAction('login', 'alice');
  expect(logger.log).toHaveBeenCalledWith(
    expect.stringContaining('User alice performed: login')
  );
  expect(logger.log).toHaveBeenCalledWith(
    expect.stringMatching(/\[\d{4}-\d{2}-\d{2}/)
  );
});
```

## Explanation

`Advanced Patterns` Use string asymmetric matchers for partial matching.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

const logger = { log: vi.fn() };

function logAction(action, user) {
  logger.log(\`[\${new Date().toISOString()}] User \${user} performed: \${action}\`);
}

test('logger message content', () => {
  logAction('login', 'alice');
  // TODO: add assertion using Advanced Patterns: expect.stringContaining and expect.stringMatching
    expect.stringContaining('User alice performed: login')
  );
  // TODO: add assertion using Advanced Patterns: expect.stringContaining and expect.stringMatching
    expect.stringMatching(/\[\d{4}-\d{2}-\d{2}/)
  );
});
```
