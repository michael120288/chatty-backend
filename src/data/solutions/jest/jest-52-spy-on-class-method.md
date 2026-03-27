# Spy on Class Method

**Level:** 52
**ID:** `jest-52`
**XP:** 150
**Tags:** `jest.spyOn`, `class`, `instance`

## Objective

Use jest.spyOn to spy on a class instance method.

## Story

Monitor the wizard's cast method without interrupting the spell.

## Hints
1. jest.spyOn works on class instances, not just plain objects.
2. The real method still executes.
3. spy.mockRestore() removes the spy after the test.

## Solution

```javascript
class Wizard{cast(s){return`casting: ${s}`;}}
test('spy on cast',()=>{const w=new Wizard();const spy=jest.spyOn(w,'cast');w.cast('fireball');w.cast('ice bolt');expect(spy).toHaveBeenCalledTimes(2);expect(spy).toHaveBeenCalledWith('fireball');spy.mockRestore();});
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
class Wizard {
  cast(spell) {
    return `casting: ${spell}`;
  }
}

test('spy on cast method', () => {
  const wizard = new Wizard();
  const spy = jest.spyOn(wizard, 'cast');

  wizard.cast('fireball');
  wizard.cast('ice bolt');

  // TODO: Assert that spy was called exactly 2 times.
  // TODO: Assert that spy was called with the expected arguments.

  spy.mockRestore();
});
```
