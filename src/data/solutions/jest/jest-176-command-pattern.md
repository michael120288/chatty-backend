# Command Pattern

**Level:** 176
**ID:** `jest-176`
**XP:** 130
**Tags:** `command`, `pattern`, `undo`, `jest.fn`

## Objective

Test a command pattern with execute and undo.

## Story

The dungeon records commands for undo/redo. Test the command history.

## Hints
1. execute() runs the command and adds it to history.
2. undo() pops the last command and calls its undo.
3. jest.fn() for both execute and undo so we can spy.

## Solution

```javascript
class CommandHistory{constructor(){this._history=[];}execute(cmd){cmd.execute();this._history.push(cmd);}undo(){const cmd=this._history.pop();if(cmd)cmd.undo();}}
test('execute and undo',()=>{const world={value:0};const addCmd={execute:jest.fn(()=>{world.value+=10;}),undo:jest.fn(()=>{world.value-=10;})};const h=new CommandHistory();h.execute(addCmd);expect(world.value).toBe(10);expect(addCmd.execute).toHaveBeenCalledTimes(1);h.undo();expect(world.value).toBe(0);expect(addCmd.undo).toHaveBeenCalledTimes(1);});
```

## Explanation

Testing cleanup and mock restoration between tests:

```
describe('MyComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks();          // clear call history
    useMyHook.mockReturnValue(defaultState);
  });

  afterEach(() => {
    jest.restoreAllMocks();        // restore spied methods
  });
});
```

`jest.clearAllMocks()` — clears call counts and instances
`jest.resetAllMocks()` — also removes implementations
`jest.restoreAllMocks()` — restores spies to originals

## Starter Code

```javascript
class CommandHistory {
  constructor() { this._history = []; }
  execute(cmd) { cmd.execute(); this._history.push(cmd); }
  undo() { const cmd = this._history.pop(); if (cmd) cmd.undo(); }
}

test('execute and undo', () => {
  const world = { value: 0 };
  const addCmd = {
    execute: jest.fn(() => { world.value += 10; }),
    undo: jest.fn(() => { world.value -= 10; }),
  };
  const history = new CommandHistory();

  history.execute(addCmd);
  // TODO: Assert that world.value equals 10 using .toBe().
  // TODO: Assert that addCmd.execute was called exactly 1 times.

  history.undo();
  // TODO: Assert that world.value equals 0 using .toBe().
  // TODO: Assert that addCmd.undo was called exactly 1 times.
});
```
