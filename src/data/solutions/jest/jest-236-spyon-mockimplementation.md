# spyOn — mockImplementation

**Level:** 236
**ID:** `jest-236`
**XP:** 120
**Tags:** `spyOn`, `mockImplementation`, `class`

## Objective

Use jest.spyOn with mockImplementation to replace a method's logic.

## Story

Override the wizard's spell with your own logic. SpyOn with full implementation override.

## Hints
1. mockImplementation replaces the real method entirely.
2. The spy still records the call.
3. mockRestore() brings the real cast() back.

## Solution

```javascript
class Wizard {
  cast(spell) { return `${spell} spell cast`; }
}

test('spy with custom impl', () => {
  const wizard = new Wizard();
  const spy = jest.spyOn(wizard, 'cast').mockImplementation((spell) => {
    return `MOCK: ${spell.toUpperCase()}`;
  });
  expect(wizard.cast('fire')).toBe('MOCK: FIRE');
  expect(spy).toHaveBeenCalledWith('fire');
  spy.mockRestore();
});
```

## Explanation

Complex mock setups with implementation per call:

```
const mockFn = jest.fn()
  .mockReturnValueOnce('first')   // first call returns 'first'
  .mockReturnValueOnce('second')  // second call returns 'second'
  .mockReturnValue('default');    // all subsequent calls

expect(mockFn()).toBe('first');
expect(mockFn()).toBe('second');
expect(mockFn()).toBe('default');
```

## Starter Code

```javascript
class Wizard {
  cast(spell) { return `${spell} spell cast`; }
}

test('spy with custom impl', () => {
  const wizard = new Wizard();
  const spy = jest.spyOn(wizard, 'cast').mockImplementation((spell) => {
    return `MOCK: ${spell.toUpperCase()}`;
  });
  // TODO: Assert that wizard.cast('fire' equals 'MOCK: FIRE' using .toBe().
  // TODO: Assert that spy was called with the expected arguments.
  spy.mockRestore();
});
```
