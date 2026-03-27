# Multiple Spies

**Level:** 60
**ID:** `jest-60`
**XP:** 200
**Tags:** `jest.spyOn`, `multiple-spies`, `mocks`

## Objective

Use multiple jest.spyOn calls in one test and assert on both.

## Story

Spy on both the king's messenger and his treasurer simultaneously.

## Hints
1. Create multiple spies independently for different methods.
2. Restore each spy after the test to avoid cross-test pollution.
3. Order of assertions does not matter.

## Solution

```javascript
const court={sendMessage(m){return`sent: ${m}`;},transferGold(a){return`transferred: ${a}`;}};
test('king issues orders',()=>{const ms=jest.spyOn(court,'sendMessage');const gs=jest.spyOn(court,'transferGold');court.sendMessage('prepare for war');court.transferGold(1000);expect(ms).toHaveBeenCalledWith('prepare for war');expect(gs).toHaveBeenCalledWith(1000);ms.mockRestore();gs.mockRestore();});
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
const court = {
  sendMessage(msg) { return `sent: ${msg}`; },
  transferGold(amount) { return `transferred: ${amount}`; }
};

test('king issues both orders', () => {
  const msgSpy = jest.spyOn(court, 'sendMessage');
  const goldSpy = jest.spyOn(court, 'transferGold');

  court.sendMessage('prepare for war');
  court.transferGold(1000);

  // TODO: Assert that msgSpy was called with the expected arguments.
  // TODO: Assert that goldSpy was called with the expected arguments.

  msgSpy.mockRestore();
  goldSpy.mockRestore();
});
```
