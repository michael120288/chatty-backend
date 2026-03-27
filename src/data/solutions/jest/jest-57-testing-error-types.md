# Testing Error Types

**Level:** 57
**ID:** `jest-57`
**XP:** 150
**Tags:** `toThrow`, `TypeError`, `RangeError`

## Objective

Use toThrow with a specific Error class and message.

## Story

Different cursed artifacts throw different error types. Assert the exact error type.

## Hints
1. toThrow(TypeError) — checks instanceof TypeError.
2. toThrow(/pattern/) — checks message with regex.
3. Always wrap the call in () => to let Jest catch the throw.

## Solution

```javascript
function openArtifact(t){if(t==='cursed')throw new TypeError('type mismatch');if(t==='forbidden')throw new RangeError('out of range');return'safe';}
test('cursed TypeError',()=>{expect(()=>openArtifact('cursed')).toThrow(TypeError);});
test('forbidden RangeError',()=>{expect(()=>openArtifact('forbidden')).toThrow(RangeError);});
test('safe',()=>{expect(openArtifact('normal')).toBe('safe');});
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
function openArtifact(type) {
  if (type === 'cursed') throw new TypeError('type mismatch');
  if (type === 'forbidden') throw new RangeError('out of range');
  return 'safe';
}

test('cursed throws TypeError', () => {
  // TODO: Assert that the function throws the expected error using .toThrow().
});

test('forbidden throws RangeError with message', () => {
  // TODO: Assert that the function throws the expected error using .toThrow().
});

test('safe artifact returns safely', () => {
  // TODO: Assert that openArtifact('normal' equals 'safe' using .toBe().
});
```
