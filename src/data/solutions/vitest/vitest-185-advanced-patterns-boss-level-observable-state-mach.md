# Advanced Patterns: Boss Level — observable state machine

**Level:** 185
**ID:** `vitest-185`
**XP:** 270
**Tags:** `advanced`, `patterns`

## Objective

Complete the starter code using Advanced Patterns: Boss Level so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Advanced Patterns: Boss Level to implement the missing assertions and make everything pass.

## Hints
1. Section 12: Advanced Patterns

## Solution

```javascript
import { test, expect, vi } from 'vitest';

expect.extend({
  toBeInState(machine, state) {
    return {
      pass: machine.state === state,
      message: () => \`Expected machine to be in state '\${state}', got '\${machine.state}'\`,
    };
  },
});

class TrafficLight {
  constructor() {
    this.state = 'red';
    this.listeners = [];
    this.transitions = { red: 'green', green: 'yellow', yellow: 'red' };
  }
  onChange(fn) { this.listeners.push(fn); }
  next() {
    const prev = this.state;
    this.state = this.transitions[this.state];
    this.listeners.forEach(fn => fn(this.state, prev));
  }
}

test('traffic light state machine', () => {
  expect.assertions(6);
  const light = new TrafficLight();
  const onChange = vi.fn();
  light.onChange(onChange);

  expect(light).toBeInState('red');
  light.next();
  expect(light).toBeInState('green');
  light.next();
  expect(light).toBeInState('yellow');
  light.next();
  expect(light).toBeInState('red');

  expect(onChange).toHaveBeenCalledTimes(3);
  expect(onChange).toHaveBeenNthCalledWith(1, 'green', 'red');
});
```

## Explanation

`Advanced Patterns` Test a state machine with complex transitions using all advanced patterns.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

expect.extend({
  toBeInState(machine, state) {
    return {
      pass: machine.state === state,
      message: () => \`Expected machine to be in state '\${state}', got '\${machine.state}'\`,
    };
  },
});

class TrafficLight {
  constructor() {
    this.state = 'red';
    this.listeners = [];
    this.transitions = { red: 'green', green: 'yellow', yellow: 'red' };
  }
  onChange(fn) { this.listeners.push(fn); }
  next() {
    const prev = this.state;
    this.state = this.transitions[this.state];
    this.listeners.forEach(fn => fn(this.state, prev));
  }
}

test('traffic light state machine', () => {
  expect.assertions(6);
  const light = new TrafficLight();
  const onChange = vi.fn();
  light.onChange(onChange);

  // TODO: add assertion using Advanced Patterns: Boss Level
  light.next();
  // TODO: add assertion using Advanced Patterns: Boss Level
  light.next();
  // TODO: add assertion using Advanced Patterns: Boss Level
  light.next();
  // TODO: add assertion using Advanced Patterns: Boss Level

  // TODO: add assertion using Advanced Patterns: Boss Level
  // TODO: add assertion using Advanced Patterns: Boss Level
});
```
