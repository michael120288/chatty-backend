# Testing Class Methods

**Level:** 107
**ID:** `jest-107`
**XP:** 120
**Tags:** `class`, `method`, `state`

## Objective

Test a class method that mutates instance state.

## Story

The Adventurer can take damage. Test that takeDamage reduces HP correctly.

## Hints
1. Create a fresh instance for each test to avoid state leakage.
2. Math.max ensures HP never goes negative.
3. Test boundary conditions: exact damage, overkill.

## Solution

```javascript
class Adventurer{constructor(n){this.name=n;this.hp=100;}takeDamage(a){this.hp=Math.max(0,this.hp-a);}}
test('take damage',()=>{const h=new Adventurer('Aria');h.takeDamage(30);expect(h.hp).toBe(70);});
test('hp floor at 0',()=>{const h=new Adventurer('Aria');h.takeDamage(200);expect(h.hp).toBe(0);});
```

## Explanation

Testing hooks with `renderHook` from `@testing-library/react`:

```
import { renderHook, act } from '@testing-library/react';

const { result } = renderHook(() => useCounter(0));
expect(result.current.count).toBe(0);

act(() => { result.current.increment(); });
expect(result.current.count).toBe(1);
```

## Starter Code

```javascript
class Adventurer {
  constructor(name) {
    this.name = name;
    this.hp = 100;
  }
  takeDamage(amount) {
    this.hp = Math.max(0, this.hp - amount);
  }
}

test('take damage', () => {
  const hero = new Adventurer('Aria');
  hero.takeDamage(30);
  // TODO: Assert that hero.hp equals 70 using .toBe().
});

test('hp floor at 0', () => {
  const hero = new Adventurer('Aria');
  hero.takeDamage(200);
  // TODO: Assert that hero.hp equals 0 using .toBe().
});
```
