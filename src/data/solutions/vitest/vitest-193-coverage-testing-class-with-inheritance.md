# Coverage: testing class with inheritance

**Level:** 193
**ID:** `vitest-193`
**XP:** 190
**Tags:** `coverage`, `reporting`

## Objective

Complete the starter code using Coverage: testing class with inheritance so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Coverage: testing class with inheritance to implement the missing assertions and make everything pass.

## Hints
1. Use `Coverage: testing class with inheritance` in your test assertions.
2. Check the Vitest docs for `Coverage: testing class with inheritance` usage examples.
3. A passing test exits with code 0 — all `expect()` calls must succeed.

## Solution

```javascript
import { test, expect } from 'vitest';

class Animal {
  constructor(name) { this.name = name; }
  speak() { return \`\${this.name} makes a sound\`; }
  toString() { return \`Animal(\${this.name})\`; }
}

class Dog extends Animal {
  speak() { return \`\${this.name} barks\`; }
  fetch() { return \`\${this.name} fetches the ball\`; }
}

test('Animal and Dog coverage', () => {
  const animal = new Animal('Generic');
  expect(animal.speak()).toBe('Generic makes a sound');
  expect(animal.toString()).toBe('Animal(Generic)');

  const dog = new Dog('Rex');
  expect(dog.speak()).toBe('Rex barks');
  expect(dog.fetch()).toBe('Rex fetches the ball');
  expect(dog.toString()).toBe('Animal(Rex)');
  expect(dog instanceof Animal).toBe(true);
});
```

## Explanation

`Coverage` Cover all methods including inherited ones.

## Starter Code

```javascript
import { test, expect } from 'vitest';

class Animal {
  constructor(name) { this.name = name; }
  speak() { return \`\${this.name} makes a sound\`; }
  toString() { return \`Animal(\${this.name})\`; }
}

class Dog extends Animal {
  speak() { return \`\${this.name} barks\`; }
  fetch() { return \`\${this.name} fetches the ball\`; }
}

test('Animal and Dog coverage', () => {
  const animal = new Animal('Generic');
  // TODO: add assertion using Coverage: testing class with inheritance
  // TODO: add assertion using Coverage: testing class with inheritance

  const dog = new Dog('Rex');
  // TODO: add assertion using Coverage: testing class with inheritance
  // TODO: add assertion using Coverage: testing class with inheritance
  // TODO: add assertion using Coverage: testing class with inheritance
  // TODO: add assertion using Coverage: testing class with inheritance
});
```
