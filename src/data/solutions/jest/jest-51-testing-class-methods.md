# Testing Class Methods

**Level:** 51
**ID:** `jest-51`
**XP:** 150
**Tags:** `classes`, `methods`, `beforeEach`

## Objective

Write tests for a class with multiple methods.

## Story

The Knight class must prove it can attack and defend correctly.

## Hints
1. Use beforeEach to create a fresh instance for each test.
2. Test each method independently.
3. Test both happy path and edge cases (hp = 0).

## Solution

```javascript
class Knight{constructor(n,hp){this.name=n;this.hp=hp;}attack(){return 50;}defend(d){this.hp-=d;return this.hp;}isAlive(){return this.hp>0;}}
describe('Knight',()=>{let k;beforeEach(()=>{k=new Knight('Arthur',100);});test('attack',()=>{expect(k.attack()).toBe(50);});test('defend',()=>{expect(k.defend(30)).toBe(70);});test('isAlive',()=>{expect(k.isAlive()).toBe(true);});test('dead',()=>{k.hp=0;expect(k.isAlive()).toBe(false);});});
```

## Explanation

Timer mocks: `jest.useFakeTimers()` replaces `setTimeout`, `setInterval`, and `Date`.

```
jest.useFakeTimers();
const callback = jest.fn();
setTimeout(callback, 1000);

jest.advanceTimersByTime(999);
expect(callback).not.toHaveBeenCalled();

jest.advanceTimersByTime(1);
expect(callback).toHaveBeenCalledTimes(1);

jest.useRealTimers(); // restore after test
```

## Starter Code

```javascript
class Knight {
  constructor(name, hp) {
    this.name = name;
    this.hp = hp;
  }
  attack() { return 50; }
  defend(damage) { this.hp -= damage; return this.hp; }
  isAlive() { return this.hp > 0; }
}

describe('Knight', () => {
  let knight;
  beforeEach(() => {
    knight = new Knight('Arthur', 100);
  });

  test('attack returns 50', () => {
    // TODO: Assert that knight.attack( equals 50 using .toBe().
  });

  test('defend reduces hp', () => {
    // TODO: Assert that knight.defend(30 equals 70 using .toBe().
  });

  test('isAlive when hp > 0', () => {
    // TODO: Assert that knight.isAlive( equals true using .toBe().
  });

  test('not alive when hp <= 0', () => {
    knight.hp = 0;
    // TODO: Assert that knight.isAlive( equals false using .toBe().
  });
});
```
