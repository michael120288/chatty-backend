# Snapshots: snapshot HTML string

**Level:** 143
**ID:** `vitest-143`
**XP:** 170
**Tags:** `snapshots`, `testing`

## Objective

Complete the starter code using Snapshots: snapshot HTML string so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Snapshots: snapshot HTML string to implement the missing assertions and make everything pass.

## Hints
1. Section 10: Snapshots

## Solution

```javascript
import { test, expect } from 'vitest';

function renderBadge(text, variant) {
  const colors = { success: 'green', error: 'red', info: 'blue' };
  const color = colors[variant] || 'gray';
  return \`<span class="badge badge--\${variant}" style="color:\${color}">\${text}</span>\`;
}

test('badge HTML snapshots', () => {
  expect(renderBadge('Active', 'success')).toMatchInlineSnapshot(
    \`"<span class=\"badge badge--success\" style=\"color:green\">Active</span>"\`
  );
  expect(renderBadge('Error', 'error')).toMatchInlineSnapshot(
    \`"<span class=\"badge badge--error\" style=\"color:red\">Error</span>"\`
  );
});
```

## Explanation

`Snapshots` Snapshot rendered HTML-like strings for UI regression.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function renderBadge(text, variant) {
  const colors = { success: 'green', error: 'red', info: 'blue' };
  const color = colors[variant] || 'gray';
  return \`<span class="badge badge--\${variant}" style="color:\${color}">\${text}</span>\`;
}

test('badge HTML snapshots', () => {
  // TODO: add assertion using Snapshots: snapshot HTML string
    \`"<span class=\"badge badge--success\" style=\"color:green\">Active</span>"\`
  );
  // TODO: add assertion using Snapshots: snapshot HTML string
    \`"<span class=\"badge badge--error\" style=\"color:red\">Error</span>"\`
  );
});
```
