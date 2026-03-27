# Boss: Mock Mastery Gauntlet

**Level:** 250
**ID:** `jest-250`
**XP:** 300
**Tags:** `boss`, `mock`, `spyOn`, `async`, `error`, `gauntlet`

## Objective

Combine jest.fn(), spyOn, mockImplementation, mock.calls, and async mocks.

## Story

250 levels conquered. The Mock Mastery Gauntlet — every mock technique in one battle.

## Hints
1. Success: info called twice (before and after), error never called.
2. Failure: info once (before), error once, then throws.
3. gateway.process receives the amount and default currency.

## Solution

```javascript
class PaymentService {
  constructor(gateway, logger) {
    this.gateway = gateway;
    this.logger = logger;
  }
  async charge(amount, currency = 'USD') {
    this.logger.info(`Charging ${amount} ${currency}`);
    const result = await this.gateway.process({ amount, currency });
    if (!result.success) {
      this.logger.error(`Charge failed: ${result.error}`);
      throw new Error(result.error);
    }
    this.logger.info(`Charge succeeded: ${result.txId}`);
    return result.txId;
  }
}

test('successful charge', async () => {
  const gateway = {
    process: jest.fn().mockResolvedValue({ success: true, txId: 'TX123' }),
  };
  const logger = { info: jest.fn(), error: jest.fn() };
  const svc = new PaymentService(gateway, logger);

  const txId = await svc.charge(100);
  expect(txId).toBe('TX123');
  expect(gateway.process).toHaveBeenCalledWith({ amount: 100, currency: 'USD' });
  expect(logger.info).toHaveBeenCalledTimes(2);
  expect(logger.error).not.toHaveBeenCalled();
});

test('failed charge', async () => {
  const gateway = {
    process: jest.fn().mockResolvedValue({ success: false, error: 'Declined' }),
  };
  const logger = { info: jest.fn(), error: jest.fn() };
  const svc = new PaymentService(gateway, logger);
  await expect(svc.charge(50)).rejects.toThrow('Declined');
  expect(logger.error).toHaveBeenCalledWith('Charge failed: Declined');
  expect(logger.info).toHaveBeenCalledTimes(1); // only the initial log
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
class PaymentService {
  constructor(gateway, logger) {
    this.gateway = gateway;
    this.logger = logger;
  }
  async charge(amount, currency = 'USD') {
    this.logger.info(`Charging ${amount} ${currency}`);
    const result = await this.gateway.process({ amount, currency });
    if (!result.success) {
      this.logger.error(`Charge failed: ${result.error}`);
      throw new Error(result.error);
    }
    this.logger.info(`Charge succeeded: ${result.txId}`);
    return result.txId;
  }
}

test('successful charge', async () => {
  const gateway = {
    process: jest.fn().mockResolvedValue({ success: true, txId: 'TX123' }),
  };
  const logger = { info: jest.fn(), error: jest.fn() };
  const svc = new PaymentService(gateway, logger);

  const txId = await svc.charge(100);

  // TODO: Assert that txId equals 'TX123' using .toBe().
  // TODO: Assert that gateway.process was called with the expected arguments.
  // TODO: Assert that logger.info was called exactly 2 times.
  // TODO: Assert that logger.error was not called.
});

test('failed charge', async () => {
  const gateway = {
    process: jest.fn().mockResolvedValue({ success: false, error: 'Declined' }),
  };
  const logger = { info: jest.fn(), error: jest.fn() };
  const svc = new PaymentService(gateway, logger);

  // TODO: Assert that the function throws the expected error.
  // TODO: Assert that logger.error was called with the expected arguments.
  // TODO: Assert that logger.info was called exactly 1 times.
});
```
