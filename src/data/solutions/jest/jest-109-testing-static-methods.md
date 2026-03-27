# Testing Static Methods

**Level:** 109
**ID:** `jest-109`
**XP:** 110
**Tags:** `static`, `class`, `factory`

## Objective

Test a static method that creates an instance from data.

## Story

The Adventurer factory creates heroes from raw data. Test the static factory method.

## Hints
1. Call static methods on the class: Adventurer.fromData().
2. Test default parameter handling by omitting the field.
3. toBeInstanceOf(Adventurer) can verify the returned type.

## Solution

```javascript
class Adventurer{constructor(n,h){this.name=n;this.hp=h;}static fromData(d){return new Adventurer(d.name,d.hp??100);}}
test('fromData with HP',()=>{const h=Adventurer.fromData({name:'Aria',hp:80});expect(h.name).toBe('Aria');expect(h.hp).toBe(80);});
test('fromData default HP',()=>{const h=Adventurer.fromData({name:'Bob'});expect(h.hp).toBe(100);});
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
  constructor(name, hp) { this.name = name; this.hp = hp; }
  static fromData(data) {
    return new Adventurer(data.name, data.hp ?? 100);
  }
}

test('fromData with HP', () => {
  const hero = Adventurer.fromData({ name: 'Aria', hp: 80 });
  // TODO: Assert that hero.name equals 'Aria' using .toBe().
  // TODO: Assert that hero.hp equals 80 using .toBe().
});

test('fromData default HP', () => {
  const hero = Adventurer.fromData({ name: 'Bob' });
  // TODO: Assert that hero.hp equals 100 using .toBe().
});
```
