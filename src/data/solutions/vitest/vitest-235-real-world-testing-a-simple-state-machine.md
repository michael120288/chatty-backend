# Real-World: testing a simple state machine

**Level:** 235
**ID:** `vitest-235`
**XP:** 260
**Tags:** `patterns`, `state machines`

## Objective

Complete the starter code using Real-World: testing a simple state machine so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Real-World: testing a simple state machine to implement the missing assertions and make everything pass.

## Hints
1. Section 16: Real-World Patterns

## Solution

```javascript
import { test, expect } from 'vitest';

type OrderState = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

class OrderStateMachine {
  private static transitions: Record<OrderState, OrderState[]> = {
    pending: ['processing', 'cancelled'],
    processing: ['shipped', 'cancelled'],
    shipped: ['delivered'],
    delivered: [],
    cancelled: [],
  };

  constructor(public state: OrderState = 'pending') {}

  transition(to: OrderState): void {
    const allowed = OrderStateMachine.transitions[this.state];
    if (!allowed.includes(to)) {
      throw new Error(\`Cannot transition from \${this.state} to \${to}\`);
    }
    this.state = to;
  }

  canTransitionTo(to: OrderState): boolean {
    return OrderStateMachine.transitions[this.state].includes(to);
  }
}

test('order state machine happy path', () => {
  const order = new OrderStateMachine();
  expect(order.state).toBe('pending');
  order.transition('processing');
  expect(order.state).toBe('processing');
  order.transition('shipped');
  order.transition('delivered');
  expect(order.state).toBe('delivered');
});

test('order state machine cancellation', () => {
  const order = new OrderStateMachine();
  order.transition('cancelled');
  expect(order.state).toBe('cancelled');
  expect(() => order.transition('processing')).toThrow('Cannot transition');
});

test('canTransitionTo returns correct booleans', () => {
  const order = new OrderStateMachine('shipped');
  expect(order.canTransitionTo('delivered')).toBe(true);
  expect(order.canTransitionTo('cancelled')).toBe(false);
  expect(order.canTransitionTo('pending')).toBe(false);
});
```

## Explanation

`Real` Test a workflow state machine with valid transitions.

## Starter Code

```javascript
import { test, expect } from 'vitest';

type OrderState = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

class OrderStateMachine {
  private static transitions: Record<OrderState, OrderState[]> = {
    pending: ['processing', 'cancelled'],
    processing: ['shipped', 'cancelled'],
    shipped: ['delivered'],
    delivered: [],
    cancelled: [],
  };

  constructor(public state: OrderState = 'pending') {}

  transition(to: OrderState): void {
    const allowed = OrderStateMachine.transitions[this.state];
    if (!allowed.includes(to)) {
      throw new Error(\`Cannot transition from \${this.state} to \${to}\`);
    }
    this.state = to;
  }

  canTransitionTo(to: OrderState): boolean {
    return OrderStateMachine.transitions[this.state].includes(to);
  }
}

test('order state machine happy path', () => {
  const order = new OrderStateMachine();
  // TODO: add assertion using Real-World: testing a simple state machine
  order.transition('processing');
  // TODO: add assertion using Real-World: testing a simple state machine
  order.transition('shipped');
  order.transition('delivered');
  // TODO: add assertion using Real-World: testing a simple state machine
});

test('order state machine cancellation', () => {
  const order = new OrderStateMachine();
  order.transition('cancelled');
  // TODO: add assertion using Real-World: testing a simple state machine
  // TODO: add assertion using Real-World: testing a simple state machine
});

test('canTransitionTo returns correct booleans', () => {
  const order = new OrderStateMachine('shipped');
  // TODO: add assertion using Real-World: testing a simple state machine
  // TODO: add assertion using Real-World: testing a simple state machine
  // TODO: add assertion using Real-World: testing a simple state machine
});
```
