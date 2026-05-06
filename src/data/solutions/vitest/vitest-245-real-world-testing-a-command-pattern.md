# Real-World: testing a command pattern

**Level:** 245
**ID:** `vitest-245`
**XP:** 290
**Tags:** `integration`, `patterns`

## Objective

Complete the starter code using Real-World: testing a command pattern so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Real-World: testing a command pattern to implement the missing assertions and make everything pass.

## Hints
1. Section 16: Real-World Patterns

## Solution

```javascript
import { test, expect } from 'vitest';

interface Command { execute(): void; undo(): void; }

class CommandQueue {
  private history: Command[] = [];
  private redoStack: Command[] = [];

  execute(cmd: Command): void {
    cmd.execute();
    this.history.push(cmd);
    this.redoStack = [];
  }

  undo(): void {
    const cmd = this.history.pop();
    if (cmd) { cmd.undo(); this.redoStack.push(cmd); }
  }

  redo(): void {
    const cmd = this.redoStack.pop();
    if (cmd) { cmd.execute(); this.history.push(cmd); }
  }

  get canUndo() { return this.history.length > 0; }
  get canRedo() { return this.redoStack.length > 0; }
}

test('CommandQueue execute and undo', () => {
  const queue = new CommandQueue();
  let value = 0;

  queue.execute({ execute: () => { value += 10; }, undo: () => { value -= 10; } });
  queue.execute({ execute: () => { value *= 2; }, undo: () => { value /= 2; } });
  expect(value).toBe(20);

  queue.undo();
  expect(value).toBe(10);

  queue.undo();
  expect(value).toBe(0);
  expect(queue.canUndo).toBe(false);
});

test('CommandQueue redo restores state', () => {
  const queue = new CommandQueue();
  let count = 0;
  const incCmd = { execute: () => count++, undo: () => count-- };

  queue.execute(incCmd);
  queue.execute(incCmd);
  expect(count).toBe(2);
  queue.undo();
  expect(count).toBe(1);
  expect(queue.canRedo).toBe(true);
  queue.redo();
  expect(count).toBe(2);
});
```

## Explanation

`Real` Test a command queue with undo/redo functionality.

## Starter Code

```javascript
import { test, expect } from 'vitest';

interface Command { execute(): void; undo(): void; }

class CommandQueue {
  private history: Command[] = [];
  private redoStack: Command[] = [];

  execute(cmd: Command): void {
    cmd.execute();
    this.history.push(cmd);
    this.redoStack = [];
  }

  undo(): void {
    const cmd = this.history.pop();
    if (cmd) { cmd.undo(); this.redoStack.push(cmd); }
  }

  redo(): void {
    const cmd = this.redoStack.pop();
    if (cmd) { cmd.execute(); this.history.push(cmd); }
  }

  get canUndo() { return this.history.length > 0; }
  get canRedo() { return this.redoStack.length > 0; }
}

test('CommandQueue execute and undo', () => {
  const queue = new CommandQueue();
  let value = 0;

  queue.execute({ execute: () => { value += 10; }, undo: () => { value -= 10; } });
  queue.execute({ execute: () => { value *= 2; }, undo: () => { value /= 2; } });
  // TODO: add assertion using Real-World: testing a command pattern

  queue.undo();
  // TODO: add assertion using Real-World: testing a command pattern

  queue.undo();
  // TODO: add assertion using Real-World: testing a command pattern
  // TODO: add assertion using Real-World: testing a command pattern
});

test('CommandQueue redo restores state', () => {
  const queue = new CommandQueue();
  let count = 0;
  const incCmd = { execute: () => count++, undo: () => count-- };

  queue.execute(incCmd);
  queue.execute(incCmd);
  // TODO: add assertion using Real-World: testing a command pattern
  queue.undo();
  // TODO: add assertion using Real-World: testing a command pattern
  // TODO: add assertion using Real-World: testing a command pattern
  queue.redo();
  // TODO: add assertion using Real-World: testing a command pattern
});
```
