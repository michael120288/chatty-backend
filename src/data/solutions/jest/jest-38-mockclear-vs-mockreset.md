# mockClear vs mockReset

**Level:** 38
**ID:** `jest-38`
**XP:** 150
**Tags:** `mockClear`, `mockReset`, `mocks`

## Objective

Demonstrate the difference between mockClear (clears calls) and mockReset (clears calls + implementation).

## Story

After each skirmish, clear the battle records. Know the difference between clearing and resetting.

## Hints
1. mockClear() — zeroes call count and instances, keeps implementation.
2. mockReset() — does everything mockClear does, plus removes implementation.
3. mockRestore() — restores original implementation (spyOn only).

## Solution

```javascript
const weapon=jest.fn().mockReturnValue('stab');
test('weapon works before clear',()=>{weapon();expect(weapon).toHaveBeenCalledTimes(1);expect(weapon()).toBe('stab');});
test('mockClear resets call count',()=>{weapon.mockClear();expect(weapon).toHaveBeenCalledTimes(0);expect(weapon()).toBe('stab');});
test('mockReset resets everything',()=>{weapon.mockReset();expect(weapon()).toBeUndefined();});
```

## Explanation

`beforeEach` / `afterEach` run setup and teardown around each test. `beforeAll` / `afterAll` run once for the entire `describe` block.

```
describe('UserService', () => {
  let service;

  beforeEach(() => {
    service = new UserService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('creates a user', () => {
    expect(service.create('Aria')).toBeDefined();
  });
});
```

## Starter Code

```javascript
const weapon = jest.fn().mockReturnValue('stab');

test('weapon works before clear', () => {
  weapon();
  expect(weapon).toHaveBeenCalledTimes(1);
  expect(weapon()).toBe('stab');
});

test('mockClear resets call count but keeps implementation', () => {
  weapon.mockClear();
  // TODO: Assert that weapon was called exactly 0 times.
  // TODO: Assert that weapon() equals 'stab' using .toBe().
});

test('mockReset resets everything', () => {
  weapon.mockReset();
  // TODO: Assert that weapon() is undefined.
});
```
