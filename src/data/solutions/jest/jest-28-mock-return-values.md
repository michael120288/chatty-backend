# Mock Return Values

**Level:** 28
**ID:** `jest-28`
**XP:** 150
**Tags:** `mockReturnValue`, `jest.fn`, `return`

## Objective

Use mockReturnValue to set a fixed return value.

## Story

The dice roller always returns what you program. Use mockReturnValue for consistent results.

## Hints
1. rollDice.mockReturnValue(6) — sets the default return value.
2. Every call returns 6 until changed.
3. mockReturnValueOnce for one-time values.

## Solution

```javascript
const rollDice=jest.fn().mockReturnValue(6);
test('dice always rolls 6',()=>{expect(rollDice()).toBe(6);expect(rollDice()).toBe(6);expect(rollDice()).toBe(6);});
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
const rollDice = jest.fn();

// TODO: make rollDice always return 6

test('dice always rolls 6', () => {
  expect(rollDice()).toBe(6);
  expect(rollDice()).toBe(6);
  expect(rollDice()).toBe(6);
});
```
