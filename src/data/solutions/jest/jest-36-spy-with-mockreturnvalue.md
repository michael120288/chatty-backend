# Spy with mockReturnValue

**Level:** 36
**ID:** `jest-36`
**XP:** 150
**Tags:** `jest.spyOn`, `mockReturnValue`, `override`

## Objective

Use jest.spyOn + mockReturnValue to override a method's return value.

## Story

Override the oracle's answer with a spy while still being able to restore it later.

## Hints
1. jest.spyOn(obj, method).mockReturnValue(val) — spy + override return.
2. mockRestore() undoes the spy and restores the original implementation.
3. Without mockRestore, the override persists across tests.

## Solution

```javascript
const oracle={predict(){return Math.random()>0.5?'victory':'defeat';}};
test('oracle predicts victory',()=>{const spy=jest.spyOn(oracle,'predict').mockReturnValue('victory');expect(oracle.predict()).toBe('victory');spy.mockRestore();});
```

## Explanation

`beforeEach` / `afterEach` run setup and teardown around each test. `beforeAll` / `afterAll` run once for the entire `describe` block.

```
describe('UserService', () => {
  let service;

  beforeEach(() => {
    service = new UserService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('creates a user', () => {
    expect(service.create('Aria')).toBeDefined();
  });
});
```

## Starter Code

```javascript
const oracle = {
  predict() {
    return Math.random() > 0.5 ? 'victory' : 'defeat';
  }
};

test('oracle predicts victory', () => {
  const spy = jest.spyOn(oracle, 'predict').mockReturnValue('victory');

  // TODO: Assert that oracle.predict( equals 'victory' using .toBe().

  spy.mockRestore();
});
```
