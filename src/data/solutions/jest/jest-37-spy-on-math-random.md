# Spy on Math.random

**Level:** 37
**ID:** `jest-37`
**XP:** 150
**Tags:** `jest.spyOn`, `Math.random`, `deterministic`

## Objective

Use jest.spyOn to mock Math.random.

## Story

Control fate itself — spy on Math.random to make dice deterministic.

## Hints
1. jest.spyOn(Math, 'random') wraps the global Math.random.
2. mockReturnValue(0.5) makes it always return 0.5.
3. Always restore after the test.

## Solution

```javascript
function rollDice(){return Math.floor(Math.random()*6)+1;}
test('dice rolls 4',()=>{const spy=jest.spyOn(Math,'random').mockReturnValue(0.5);expect(rollDice()).toBe(4);spy.mockRestore();});
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
function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

test('dice rolls 4 when random returns 0.5', () => {
  const spy = jest.spyOn(Math, 'random').mockReturnValue(0.5);

  // Math.floor(0.5 * 6) + 1 = Math.floor(3) + 1 = 4
  // TODO: Assert that rollDice() equals 4 using .toBe().

  spy.mockRestore();
});
```
