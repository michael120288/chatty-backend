# Sharing State Safely

**Level:** 59
**ID:** `jest-59`
**XP:** 150
**Tags:** `beforeEach`, `state`, `isolation`

## Objective

Use beforeEach to ensure each test starts with a clean state.

## Story

The guild register must be fresh for each test. Shared state between tests causes flaky failures.

## Hints
1. Without beforeEach, tests share the same register instance.
2. State from one test pollutes the next (test order matters — bad).
3. Always use beforeEach to reset shared state.

## Solution

```javascript
class GuildRegister{constructor(){this.members=[];}add(n){this.members.push(n);}count(){return this.members.length;}}
let register;
beforeEach(()=>{register=new GuildRegister();});
test('starts empty',()=>{expect(register.count()).toBe(0);});
test('add one',()=>{register.add('Alice');expect(register.count()).toBe(1);});
test('still empty',()=>{expect(register.count()).toBe(0);});
```

## Explanation

`jest.mock` with a factory function lets you control exactly what a module exports:

```
jest.mock('../utils/logger', () => ({
  log: jest.fn(),
  error: jest.fn(),
}));

import { log } from '../utils/logger';
log('test');
expect(log).toHaveBeenCalledWith('test');
```

## Starter Code

```javascript
class GuildRegister {
  constructor() { this.members = []; }
  add(name) { this.members.push(name); }
  count() { return this.members.length; }
}

let register;

beforeEach(() => {
  // TODO: register = new GuildRegister()
});

test('starts empty', () => {
  expect(register.count()).toBe(0);
});

test('add one member', () => {
  register.add('Alice');
  expect(register.count()).toBe(1);
});

test('still starts empty in next test', () => {
  // This passes because beforeEach creates a fresh register
  expect(register.count()).toBe(0);
});
```
