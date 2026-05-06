# toBeInstanceOf

**Level:** 23
**ID:** `vitest-023`
**XP:** 100
**Tags:** `toBeInstanceOf`, `classes`, `instanceof`

## Objective

Use toBeInstanceOf to check object types.

## Story

Confirm the creature is truly a Dragon, not just any monster.

## Hints
1. expect(monster).toBeInstanceOf(Dragon)
2. expect(new Date()).toBeInstanceOf(Date)

## Solution

```javascript
import { test, expect } from 'vitest';
class Dragon { constructor(name) { this.name = name; } }
class Goblin { constructor(name) { this.name = name; } }
test('it is a Dragon', () => { expect(new Dragon('Smaug')).toBeInstanceOf(Dragon); });
test('it is not a Goblin', () => { expect(new Dragon('Smaug')).not.toBeInstanceOf(Goblin); });
test('Date', () => { expect(new Date()).toBeInstanceOf(Date); });
```

## Explanation

Vitest's `toBeInstanceOf` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect } from 'vitest';

class Dragon { constructor(name) { this.name = name; } }
class Goblin { constructor(name) { this.name = name; } }

test('it is a Dragon', () => {
  const monster = new Dragon('Smaug');
  // TODO: Assert monster is a Dragon
});

test('it is not a Goblin', () => {
  const monster = new Dragon('Smaug');
  // TODO: Assert monster is NOT a Goblin
});

test('Date is an instance of Date', () => {
  // TODO: Assert new Date() is a Date
});
```
