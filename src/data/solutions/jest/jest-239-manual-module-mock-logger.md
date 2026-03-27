# Manual Module Mock — Logger

**Level:** 239
**ID:** `jest-239`
**XP:** 130
**Tags:** `manual mock`, `logger`, `clearAllMocks`

## Objective

Build a complete manual mock module object with jest.fn() methods.

## Story

Replace the dungeon logger entirely with a silent mock for testing.

## Hints
1. jest.clearAllMocks() in beforeEach resets call counts between tests.
2. info is called twice for valid orders: start and item count.
3. warn is called for empty orders, never for valid ones.

## Solution

```javascript
// Simulated logger module
const logger = {
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  debug: jest.fn(),
};

function processOrder(order, log) {
  log.info(`Processing order ${order.id}`);
  if (!order.items.length) { log.warn('Empty order'); return null; }
  log.info(`Order ${order.id} has ${order.items.length} items`);
  return { ...order, status: 'processed' };
}

beforeEach(() => { jest.clearAllMocks(); });

test('valid order', () => {
  const order = { id: 1, items: ['sword', 'shield'] };
  const result = processOrder(order, logger);
  expect(result.status).toBe('processed');
  expect(logger.info).toHaveBeenCalledTimes(2);
  expect(logger.warn).not.toHaveBeenCalled();
});

test('empty order', () => {
  const order = { id: 2, items: [] };
  const result = processOrder(order, logger);
  expect(result).toBeNull();
  expect(logger.warn).toHaveBeenCalledWith('Empty order');
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
// Simulated logger module
const logger = {
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  debug: jest.fn(),
};

function processOrder(order, log) {
  log.info(`Processing order ${order.id}`);
  if (!order.items.length) { log.warn('Empty order'); return null; }
  log.info(`Order ${order.id} has ${order.items.length} items`);
  return { ...order, status: 'processed' };
}

beforeEach(() => { jest.clearAllMocks(); });

test('valid order', () => {
  const order = { id: 1, items: ['sword', 'shield'] };
  const result = processOrder(order, logger);
  // TODO: Assert that result.status equals 'processed' using .toBe().
  // TODO: Assert that logger.info was called exactly 2 times.
  // TODO: Assert that logger.warn was not called.
});

test('empty order', () => {
  const order = { id: 2, items: [] };
  const result = processOrder(order, logger);
  // TODO: Assert that result is null.
  // TODO: Assert that logger.warn was called with the expected arguments.
});
```
