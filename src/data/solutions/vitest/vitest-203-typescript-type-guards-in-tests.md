# TypeScript: type guards in tests

**Level:** 203
**ID:** `vitest-203`
**XP:** 190
**Tags:** `TypeScript`, `types`

## Objective

Complete the starter code using TypeScript: type guards in tests so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use TypeScript: type guards in tests to implement the missing assertions and make everything pass.

## Hints
1. Section 14: TypeScript & ESM

## Solution

```javascript
import { test, expect } from 'vitest';

interface Cat { type: 'cat'; meow(): string; }
interface Dog { type: 'dog'; bark(): string; }

function isCat(animal: Cat | Dog): animal is Cat {
  return animal.type === 'cat';
}

function makeSound(animal: Cat | Dog): string {
  if (isCat(animal)) return animal.meow();
  return animal.bark();
}

test('type guard isCat', () => {
  const cat: Cat = { type: 'cat', meow: () => 'meow!' };
  const dog: Dog = { type: 'dog', bark: () => 'woof!' };
  expect(isCat(cat)).toBe(true);
  expect(isCat(dog)).toBe(false);
  expect(makeSound(cat)).toBe('meow!');
  expect(makeSound(dog)).toBe('woof!');
});
```

## Explanation

`TypeScript` lets you complete the starter code using TypeScript: type guards in tests so all tests run and pass with exit code 0. Use it in your tests to verify the expected behavior.

## Starter Code

```javascript
import { test, expect } from 'vitest';

interface Cat { type: 'cat'; meow(): string; }
interface Dog { type: 'dog'; bark(): string; }

function isCat(animal: Cat | Dog): animal is Cat {
  return animal.type === 'cat';
}

function makeSound(animal: Cat | Dog): string {
  if (isCat(animal)) return animal.meow();
  return animal.bark();
}

test('type guard isCat', () => {
  const cat: Cat = { type: 'cat', meow: () => 'meow!' };
  const dog: Dog = { type: 'dog', bark: () => 'woof!' };
  // TODO: add assertion using TypeScript: type guards in tests
  // TODO: add assertion using TypeScript: type guards in tests
  // TODO: add assertion using TypeScript: type guards in tests
  // TODO: add assertion using TypeScript: type guards in tests
});
```
