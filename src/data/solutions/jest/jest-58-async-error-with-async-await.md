# Async Error with async/await

**Level:** 58
**ID:** `jest-58`
**XP:** 150
**Tags:** `async`, `errors`, `try-catch`

## Objective

Use try/catch in an async test to handle rejected promises.

## Story

The vault API rejects bad keys asynchronously. Catch the async error.

## Hints
1. Option 1: await expect(openVault('bad')).rejects.toThrow('invalid key')
2. Option 2: try { await openVault('bad') } catch(e) { expect(e.message).toContain('invalid key') }
3. Always pair with expect.assertions(1) when using try/catch.

## Solution

```javascript
async function openVault(k){if(k!=='golden-key')throw new Error(`invalid key: ${k}`);return'vault open';}
test('wrong key',async()=>{await expect(openVault('silver-key')).rejects.toThrow('invalid key: silver-key');});
test('correct key',async()=>{const r=await openVault('golden-key');expect(r).toBe('vault open');});
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
async function openVault(key) {
  if (key !== 'golden-key') {
    throw new Error(`invalid key: ${key}`);
  }
  return 'vault open';
}

test('wrong key throws async error', async () => {
  // TODO: use try/catch or .rejects.toThrow to assert the error
  // expect error message to contain 'invalid key: silver-key'
});

test('correct key opens vault', async () => {
  // TODO: const result = await openVault('golden-key')
  // TODO: Assert that result equals 'vault open' using .toBe().
});
```
