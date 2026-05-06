# Spy on Class Method

**Level:** 64
**ID:** `vitest-064`
**XP:** 100
**Tags:** `vi.spyOn`, `class`, `instance-method`

## Objective

Use vi.spyOn on a class instance method.

## Story

Intercept a class instance method without replacing the whole class.

## Hints
1. vi.spyOn works on instance objects.
2. The original method still executes (returns 7).

## Solution

```javascript
import { test, expect, vi } from 'vitest';
class Calculator { add(a,b){return a+b;} multiply(a,b){return a*b;} }
test('spy on instance', () => {
  const calc = new Calculator();
  const spy = vi.spyOn(calc, 'add');
  calc.add(3,4);
  expect(spy).toHaveBeenCalledWith(3,4);
  expect(spy).toHaveBeenCalledTimes(1);
  spy.mockRestore();
});
```

## Explanation

Vitest's `Spy on Class Method` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

class Calculator {
  add(a, b) { return a + b; }
  multiply(a, b) { return a * b; }
}

test('spy on instance method', () => {
  const calc = new Calculator();
  const spy = vi.spyOn(calc, 'add');

  calc.add(3, 4);

  // TODO: Assert spy was called with (3, 4)
  // TODO: Assert spy was called once

  spy.mockRestore();
});
```
