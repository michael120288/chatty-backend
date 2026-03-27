# Truthiness Matchers

**Level:** 3
**ID:** `jest-03`
**XP:** 100
**Tags:** `toBeNull`, `toBeTruthy`, `toBeFalsy`, `matchers`

## Objective

Write four tests — one each for toBeNull, toBeUndefined, toBeTruthy, and toBeFalsy.

## Story

The Oracle speaks in truths and falsehoods. Master four matchers: toBeNull, toBeUndefined, toBeTruthy, and toBeFalsy.

## Hints
1. toBeNull() — only passes for null.
2. toBeUndefined() — only passes for undefined.
3. toBeTruthy() / toBeFalsy() — use JavaScript boolean coercion.

## Solution

```javascript
test('null is null', () => { expect(null).toBeNull(); });
test('undefined is undefined', () => { expect(undefined).toBeUndefined(); });
test('non-zero is truthy', () => { expect(1).toBeTruthy(); });
test('zero is falsy', () => { expect(0).toBeFalsy(); });
```

## Explanation

Jest's `describe` groups related tests; `it`/`test` defines a single test case. `expect(received).toBe(expected)` checks strict equality (===).

```
describe('My module', () => {
  it('adds two numbers correctly', () => {
    expect(1 + 2).toBe(3);
  });

  it('returns a string', () => {
    expect(typeof 'hello').toBe('string');
  });
});
```

Tests pass when all `expect` calls succeed. A single failed assertion fails the whole test.

## Starter Code

```javascript
// Write four tests using truthiness matchers

test('null is null', () => {
  // TODO: Assert that null is null.
});

test('undefined is undefined', () => {
  // TODO: Assert that undefined is undefined.
});

test('non-zero is truthy', () => {
  // TODO: Assert that 1 is truthy.
});

test('zero is falsy', () => {
  // TODO: Assert that 0 is falsy.
});
```
