# Test Context: multiple fixtures in one test

**Level:** 162
**ID:** `vitest-162`
**XP:** 210
**Tags:** `test`, `context`

## Objective

Complete the starter code using Test Context: multiple fixtures in one test so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Test Context: multiple fixtures in one test to implement the missing assertions and make everything pass.

## Hints
1. Section 11: Test Context & Fixtures

## Solution

```javascript
import { test as base, expect, vi } from 'vitest';

const test = base.extend({
  user: async ({}, use) => {
    await use({ id: 1, name: 'Alice', email: 'alice@example.com' });
  },
  emailService: async ({}, use) => {
    await use({ send: vi.fn().mockResolvedValue({ sent: true }) });
  },
  config: async ({}, use) => {
    await use({ smtpHost: 'smtp.test.com', from: 'no-reply@test.com' });
  },
});

test('send welcome email to user', async ({ user, emailService, config }) => {
  const result = await emailService.send({
    to: user.email,
    from: config.from,
    subject: \`Welcome \${user.name}\`,
  });
  expect(result.sent).toBe(true);
  expect(emailService.send).toHaveBeenCalledWith(
    expect.objectContaining({ to: 'alice@example.com' })
  );
});
```

## Explanation

`Test Context` Use multiple fixtures simultaneously in a single test.

## Starter Code

```javascript
import { test as base, expect, vi } from 'vitest';

const test = base.extend({
  user: async ({}, use) => {
    await use({ id: 1, name: 'Alice', email: 'alice@example.com' });
  },
  emailService: async ({}, use) => {
    await use({ send: vi.fn().mockResolvedValue({ sent: true }) });
  },
  config: async ({}, use) => {
    await use({ smtpHost: 'smtp.test.com', from: 'no-reply@test.com' });
  },
});

test('send welcome email to user', async ({ user, emailService, config }) => {
  const result = await emailService.send({
    to: user.email,
    from: config.from,
    subject: \`Welcome \${user.name}\`,
  });
  // TODO: add assertion using Test Context: multiple fixtures in one test
  // TODO: add assertion using Test Context: multiple fixtures in one test
    expect.objectContaining({ to: 'alice@example.com' })
  );
});
```
