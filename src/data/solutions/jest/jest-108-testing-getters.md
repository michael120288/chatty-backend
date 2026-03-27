# Testing Getters

**Level:** 108
**ID:** `jest-108`
**XP:** 110
**Tags:** `getter`, `class`, `branches`

## Objective

Test a JavaScript getter property on a class.

## Story

The hero's status is derived from HP. Test the computed getter.

## Hints
1. Access getter like a property: hero.status, not hero.status().
2. Create fresh instances with different HP values.
3. Test all branches: > 50, 1-50, 0.

## Solution

```javascript
class Adventurer{constructor(hp){this.hp=hp;}get status(){if(this.hp>50)return'healthy';if(this.hp>0)return'injured';return'dead';}}
test('healthy',()=>{expect(new Adventurer(100).status).toBe('healthy');});
test('injured',()=>{expect(new Adventurer(25).status).toBe('injured');});
test('dead',()=>{expect(new Adventurer(0).status).toBe('dead');});
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
  constructor(hp) { this.hp = hp; }
  get status() {
    if (this.hp > 50) return 'healthy';
    if (this.hp > 0) return 'injured';
    return 'dead';
  }
}

test('healthy', () => {
  // TODO: Assert that new Adventurer(100 equals 'healthy' using .toBe().
});

test('injured', () => {
  // TODO: Assert that new Adventurer(25 equals 'injured' using .toBe().
});

test('dead', () => {
  // TODO: Assert that new Adventurer(0 equals 'dead' using .toBe().
});
```
