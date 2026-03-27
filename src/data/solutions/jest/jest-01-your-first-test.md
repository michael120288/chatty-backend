# Your First Test

**Level:** 1
**ID:** `jest-01`
**XP:** 100
**Tags:** `test`, `expect`, `toBe`

## Objective

Write a Jest test that calls expect(1 + 1).toBe(2) and passes.

## Story

You have entered the Realm of Unit Tests. Every great tester starts with a single assertion. Write your first test to prove that 1 + 1 is indeed 2.

## Hints
1. Use expect(value).toBe(expected) for strict equality.
2. expect(1 + 1).toBe(2) — wrap the expression inside expect().
3. A passing test exits with code 0.

## Solution

```javascript
test('one plus one equals two', () => {
  expect(1 + 1).toBe(2);
});
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
// Write your first Jest test below

test('one plus one equals two', () => {
  // TODO: Assert that 1 + 1 equals 2 using .toBe().
});
```
