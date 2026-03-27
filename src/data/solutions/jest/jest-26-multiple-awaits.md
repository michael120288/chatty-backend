# Multiple Awaits

**Level:** 26
**ID:** `jest-26`
**XP:** 150
**Tags:** `async`, `await`, `sequential`

## Objective

Write an async test that awaits multiple Promises in sequence.

## Story

The quest has multiple async checkpoints. Await each one in sequence.

## Hints
1. const s1 = await step1(); const s2 = await step2(s1); ...
2. Each await waits for the previous to complete.
3. Assert the final result with expect(s3).toBe(...)

## Solution

```javascript
async function step1(){return'enter dungeon';}
async function step2(p){return p+' → slay dragon';}
async function step3(p){return p+' → claim treasure';}
test('full quest completes',async()=>{const s1=await step1();const s2=await step2(s1);const s3=await step3(s2);expect(s3).toBe('enter dungeon → slay dragon → claim treasure');});
```

## Explanation

`jest.mock('moduleName')` replaces an entire module with auto-mocked or custom implementations.

```
jest.mock('../services/api');
import { fetchUser } from '../services/api';
fetchUser.mockResolvedValue({ id: 1, name: 'Aria' });

it('loads user', async () => {
  const user = await fetchUser(1);
  expect(user.name).toBe('Aria');
});
```

The mock is hoisted automatically to the top of the file — it applies before any imports.

## Starter Code

```javascript
async function step1() { return 'enter dungeon'; }
async function step2(prev) { return prev + ' → slay dragon'; }
async function step3(prev) { return prev + ' → claim treasure'; }

test('full quest completes', async () => {
  // TODO: chain await step1(), step2(), step3() and assert final message
  // Final message should be: 'enter dungeon → slay dragon → claim treasure'
});
```
