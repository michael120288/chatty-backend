# Boss: The Mock Gauntlet

**Level:** 61
**ID:** `jest-61`
**XP:** 200
**Tags:** `boss`, `mocks`, `spyOn`, `combined`

## Objective

Combine multiple mocking techniques in a single test suite.

## Story

Face the Mock Gauntlet — combine jest.fn(), mockReturnValueOnce, spyOn, and assertion matchers in one epic test.

## Hints
1. Use mockReturnValueOnce for first call, mockReturnValue for fallback.
2. jest.spyOn preserves the original — check return value AND call.
3. Restore spies after each test.

## Solution

```javascript
const dungeon={getRoomType(){return'empty';},openDoor(){return true;}};
const encounter=jest.fn();
test('trap',()=>{const s=jest.spyOn(dungeon,'getRoomType').mockReturnValueOnce('trap');expect(dungeon.getRoomType()).toBe('trap');s.mockRestore();});
test('goblin',()=>{encounter.mockReturnValueOnce('goblin').mockReturnValue(null);expect(encounter()).toBe('goblin');expect(encounter()).toBeNull();});
test('door',()=>{const s=jest.spyOn(dungeon,'openDoor');expect(dungeon.openDoor()).toBe(true);expect(s).toHaveBeenCalled();s.mockRestore();});
```

## Explanation

Snapshot testing captures the rendered output of a component and stores it in a `.snap` file.

```
import { render } from '@testing-library/react';
it('renders correctly', () => {
  const { container } = render(<Button label="Click me" />);
  expect(container).toMatchSnapshot();
});
```

On first run, Jest creates the snapshot. On subsequent runs, it compares. Update with `jest --updateSnapshot`.

## Starter Code

```javascript
const dungeon = {
  getRoomType() { return 'empty'; },
  openDoor() { return true; }
};

const encounter = jest.fn();

test('room is a trap', () => {
  const spy = jest.spyOn(dungeon, 'getRoomType').mockReturnValueOnce('trap');
  expect(dungeon.getRoomType()).toBe('trap');
  spy.mockRestore();
});

test('encounter a goblin then nothing', () => {
  encounter.mockReturnValueOnce('goblin').mockReturnValue(null);
  // TODO: Assert that encounter() equals 'goblin' using .toBe().
  // TODO: Assert that encounter() is null.
});

test('door opens', () => {
  const spy = jest.spyOn(dungeon, 'openDoor');
  // TODO: Assert that dungeon.openDoor( equals true using .toBe().
  // TODO: Assert that spy was called.
  spy.mockRestore();
});
```
