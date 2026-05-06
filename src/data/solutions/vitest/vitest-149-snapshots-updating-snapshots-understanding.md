# Snapshots: updating snapshots understanding

**Level:** 149
**ID:** `vitest-149`
**XP:** 160
**Tags:** `snapshots`, `testing`

## Objective

Complete the starter code using Snapshots: updating snapshots understanding so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Snapshots: updating snapshots understanding to implement the missing assertions and make everything pass.

## Hints
1. Section 10: Snapshots

## Solution

```javascript
import { test, expect } from 'vitest';

function getVersion() {
  return { major: 2, minor: 0, patch: 0, label: 'stable' };
}

test('version object matches snapshot', () => {
  const version = getVersion();
  expect(version.label).toBe('stable');
  expect(version).toMatchSnapshot();
});

test('version string format', () => {
  const v = getVersion();
  const vStr = \`v\${v.major}.\${v.minor}.\${v.patch}-\${v.label}\`;
  expect(vStr).toMatchInlineSnapshot(\`"v2.0.0-stable"\`);
});
```

## Explanation

`Snapshots` Demonstrate intentional snapshot update behavior.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function getVersion() {
  return { major: 2, minor: 0, patch: 0, label: 'stable' };
}

test('version object matches snapshot', () => {
  const version = getVersion();
  // TODO: add assertion using Snapshots: updating snapshots understanding
  // TODO: add assertion using Snapshots: updating snapshots understanding
});

test('version string format', () => {
  const v = getVersion();
  const vStr = \`v\${v.major}.\${v.minor}.\${v.patch}-\${v.label}\`;
  // TODO: add assertion using Snapshots: updating snapshots understanding
});
```
