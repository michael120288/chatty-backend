# toHaveProperty

**Level:** 24
**ID:** `vitest-024`
**XP:** 100
**Tags:** `toHaveProperty`, `nested`, `objects`

## Objective

Use toHaveProperty with a key path and an expected value.

## Story

Navigate the nested properties of a complex object.

## Hints
1. toHaveProperty('key')
2. toHaveProperty('nested.key', value)
3. Dot notation or array path both work.

## Solution

```javascript
import { test, expect } from 'vitest';
const hero = { name: 'Aria', stats: { level: 10, hp: 200 }, items: ['sword', 'shield'] };
test('has name property', () => { expect(hero).toHaveProperty('name'); });
test('has nested hp', () => { expect(hero).toHaveProperty('stats.hp', 200); });
test('items', () => { expect(hero).toHaveProperty('items', ['sword', 'shield']); });
```

## Explanation

Vitest's `toHaveProperty` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect } from 'vitest';

const hero = {
  name: 'Aria',
  stats: { level: 10, hp: 200 },
  items: ['sword', 'shield']
};

test('has name property', () => {
  // TODO: Assert hero has property 'name'
});

test('has nested hp', () => {
  // TODO: Assert hero has property 'stats.hp' equal to 200
});

test('items is an array', () => {
  // TODO: Assert hero has property 'items' equal to ['sword', 'shield']
});
```
