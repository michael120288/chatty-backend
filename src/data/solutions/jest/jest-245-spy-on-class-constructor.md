# Spy on Class Constructor

**Level:** 245
**ID:** `jest-245`
**XP:** 140
**Tags:** `spyOn`, `factory`, `class`

## Objective

Use jest.spyOn to track instantiation via a factory method.

## Story

Track every hero instantiated by the factory. Spy on the class constructor.

## Hints
1. Spy on the factory method, not the class itself.
2. The real Hero instances are still created.
3. Verify each create() call with the right arguments.

## Solution

```javascript
class Hero {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }
}

const heroFactory = {
  create(name, role) { return new Hero(name, role); }
};

test('factory creates heroes', () => {
  const spy = jest.spyOn(heroFactory, 'create');
  heroFactory.create('Alice', 'warrior');
  heroFactory.create('Bob', 'mage');
  expect(spy).toHaveBeenCalledTimes(2);
  expect(spy).toHaveBeenCalledWith('Alice', 'warrior');
  expect(spy).toHaveBeenCalledWith('Bob', 'mage');
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
class Hero {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }
}

const heroFactory = {
  create(name, role) { return new Hero(name, role); }
};

test('factory creates heroes', () => {
  const spy = jest.spyOn(heroFactory, 'create');
  heroFactory.create('Alice', 'warrior');
  heroFactory.create('Bob', 'mage');
  // TODO: Assert that spy was called exactly 2 times.
  // TODO: Assert that spy was called with the expected arguments.
  spy.mockRestore();
});
```
