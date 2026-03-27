# Testing a Class Constructor

**Level:** 106
**ID:** `jest-106`
**XP:** 120
**Tags:** `class`, `constructor`, `instance`

## Objective

Test a class constructor by creating an instance and asserting its properties.

## Story

The Adventurer is born with a name and starting HP. Test its initial state.

## Hints
1. Instantiate the class with new inside the test.
2. Assert each property individually with toBe or toEqual.
3. Use toBeInstanceOf(Adventurer) to check the type.

## Solution

```javascript
class Adventurer{constructor(n){this.name=n;this.hp=100;this.level=1;}}
test('adventurer initial state',()=>{const h=new Adventurer('Aria');expect(h.name).toBe('Aria');expect(h.hp).toBe(100);expect(h.level).toBe(1);});
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
    this.level = 1;
  }
}

test('adventurer initial state', () => {
  const hero = new Adventurer('Aria');
  // TODO: Assert that hero.name equals 'Aria' using .toBe().
  // TODO: Assert that hero.hp equals 100 using .toBe().
  // TODO: Assert that hero.level equals 1 using .toBe().
});
```
