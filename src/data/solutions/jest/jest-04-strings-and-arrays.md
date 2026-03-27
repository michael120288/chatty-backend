# Strings and Arrays

**Level:** 4
**ID:** `jest-04`
**XP:** 100
**Tags:** `toMatch`, `toContain`, `strings`, `arrays`

## Objective

Use toMatch to test a string and toContain to test an array.

## Story

The wizard's spell-book contains a list of ingredients. Test that a string matches a pattern and that an array contains the right item.

## Hints
1. toMatch(regex) — checks if a string matches a regular expression.
2. toContain(item) — checks if an array includes the given item.
3. Both support .not to invert the assertion.

## Solution

```javascript
const spellName = 'Fireball of Doom';
const ingredients = ['sulfur', 'bat wing', 'dragon scale'];
test('spell name contains Fireball', () => { expect(spellName).toMatch(/Fireball/); });
test('ingredients include bat wing', () => { expect(ingredients).toContain('bat wing'); });
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
const spellName = 'Fireball of Doom';
const ingredients = ['sulfur', 'bat wing', 'dragon scale'];

test('spell name contains Fireball', () => {
  // TODO: Assert that spellName matches the expected pattern using .toMatch().
});

test('ingredients include bat wing', () => {
  // TODO: Assert that ingredients contains 'bat wing'.
});
```
