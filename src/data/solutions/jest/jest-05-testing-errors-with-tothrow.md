# Testing Errors with toThrow

**Level:** 5
**ID:** `jest-05`
**XP:** 150
**Tags:** `toThrow`, `errors`, `exceptions`

## Objective

Write a test that verifies a function throws using toThrow.

## Story

A cursed function throws an error when invoked. You must prove it throws — but wrap it in an arrow function or the curse will strike you first!

## Hints
1. ALWAYS wrap the function call in an arrow function: expect(() => fn()).toThrow()
2. toThrow() checks that any error is thrown.
3. toThrow('message') checks that the error message contains the string.

## Solution

```javascript
function cursedFunction() { throw new Error('You have been cursed!'); }
test('cursedFunction throws an error', () => { expect(() => cursedFunction()).toThrow(); });
test('error message contains cursed', () => { expect(() => cursedFunction()).toThrow('cursed'); });
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
function cursedFunction() {
  throw new Error('You have been cursed!');
}

test('cursedFunction throws an error', () => {
  // TODO: Assert that the function throws the expected error using .toThrow().
  // IMPORTANT: wrap the call in () => otherwise Jest cannot catch it
});

test('error message contains cursed', () => {
  // TODO: Assert that the function throws the expected error using .toThrow().
});
```
