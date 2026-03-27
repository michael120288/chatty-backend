# Boss: Class Integration

**Level:** 110
**ID:** `jest-110`
**XP:** 200
**Tags:** `class`, `boss`, `integration`

## Objective

Write a comprehensive test suite for a multi-method class.

## Story

The Adventurer class is complete. Constructor, methods, getters — test it all.

## Hints
1. Test each method in isolation with a fresh instance.
2. Getters are tested like properties.
3. Boundary: 250 XP → Math.floor(250/100)+1 = 3.

## Solution

```javascript
class Adventurer{constructor(n,hp=100){this.name=n;this.hp=hp;this.xp=0;}takeDamage(n){this.hp=Math.max(0,this.hp-n);}gainXP(n){this.xp+=n;}get isAlive(){return this.hp>0;}get level(){return Math.floor(this.xp/100)+1;}}
test('initial state',()=>{const h=new Adventurer('Aria');expect(h.name).toBe('Aria');expect(h.hp).toBe(100);expect(h.xp).toBe(0);});
test('take damage and die',()=>{const h=new Adventurer('Aria');h.takeDamage(100);expect(h.hp).toBe(0);expect(h.isAlive).toBe(false);});
test('gain XP and level up',()=>{const h=new Adventurer('Aria');h.gainXP(250);expect(h.xp).toBe(250);expect(h.level).toBe(3);});
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
  constructor(name, hp = 100) {
    this.name = name;
    this.hp = hp;
    this.xp = 0;
  }
  takeDamage(n) { this.hp = Math.max(0, this.hp - n); }
  gainXP(n) { this.xp += n; }
  get isAlive() { return this.hp > 0; }
  get level() { return Math.floor(this.xp / 100) + 1; }
}

test('initial state', () => {
  const h = new Adventurer('Aria');
  // TODO: Assert that h.name equals 'Aria' using .toBe().
  // TODO: Assert that h.hp equals 100 using .toBe().
  // TODO: Assert that h.xp equals 0 using .toBe().
});

test('take damage and die', () => {
  const h = new Adventurer('Aria');
  h.takeDamage(100);
  // TODO: Assert that h.hp equals 0 using .toBe().
  // TODO: Assert that h.isAlive equals false using .toBe().
});

test('gain XP and level up', () => {
  const h = new Adventurer('Aria');
  h.gainXP(250);
  // TODO: Assert that h.xp equals 250 using .toBe().
  // TODO: Assert that h.level equals 3 using .toBe().
});
```
