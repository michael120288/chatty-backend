# mockRejectedValue

**Level:** 30
**ID:** `jest-30`
**XP:** 150
**Tags:** `mockRejectedValue`, `async`, `errors`

## Objective

Use mockRejectedValue to make a mock return a rejected Promise.

## Story

The failing API always throws. Mock the rejection to test error handling.

## Hints
1. fetchVault.mockRejectedValue(new Error(...)) — wraps in Promise.reject().
2. Test with await expect(fn()).rejects.toThrow(...).
3. Use mockRejectedValueOnce for single-call rejection.

## Solution

```javascript
const fetchVault=jest.fn().mockRejectedValue(new Error('vault locked'));
test('fetchVault rejects',async()=>{await expect(fetchVault()).rejects.toThrow('vault locked');});
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
const fetchVault = jest.fn();

// TODO: make fetchVault reject with new Error('vault locked')

test('fetchVault rejects', async () => {
  await expect(fetchVault()).rejects.toThrow('vault locked');
});
```
