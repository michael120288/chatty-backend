# mockResolvedValue

**Level:** 29
**ID:** `jest-29`
**XP:** 150
**Tags:** `mockResolvedValue`, `async`, `jest.fn`

## Objective

Use mockResolvedValue to make a mock return a resolved Promise.

## Story

The async scout always reports success. Use mockResolvedValue for async mocks.

## Hints
1. fetchQuest.mockResolvedValue(data) — wraps data in Promise.resolve().
2. Equivalent to mockReturnValue(Promise.resolve(data)).
3. Use mockResolvedValueOnce for single-call async mocks.

## Solution

```javascript
const fetchQuest=jest.fn().mockResolvedValue({title:'Dragon Slayer',reward:500});
test('fetchQuest resolves with quest data',async()=>{const q=await fetchQuest();expect(q.title).toBe('Dragon Slayer');expect(q.reward).toBe(500);});
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
const fetchQuest = jest.fn();

// TODO: make fetchQuest resolve with { title: 'Dragon Slayer', reward: 500 }

test('fetchQuest resolves with quest data', async () => {
  const quest = await fetchQuest();
  expect(quest.title).toBe('Dragon Slayer');
  expect(quest.reward).toBe(500);
});
```
