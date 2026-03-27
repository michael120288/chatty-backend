# Regex Matching Tests

**Level:** 127
**ID:** `jest-127`
**XP:** 110
**Tags:** `regex`, `string`, `validation`

## Objective

Test a function that validates a string with a regex.

## Story

The guard checks if hero IDs follow the pattern HERO-XXXX.

## Hints
1. Use toBe(true/false) for boolean regex test results.
2. Test valid, invalid prefix, and invalid length.
3. ^ and $ anchor the regex to the full string.

## Solution

```javascript
const isValidId=id=>/^HERO-\d{4}$/.test(id);
test('valid ID',()=>{expect(isValidId('HERO-1234')).toBe(true);});
test('invalid ID - wrong prefix',()=>{expect(isValidId('MAGE-1234')).toBe(false);});
test('invalid ID - too short',()=>{expect(isValidId('HERO-12')).toBe(false);});
```

## Explanation

Testing user events with `@testing-library/user-event` (more realistic than `fireEvent`):

```
import userEvent from '@testing-library/user-event';

it('calls resetProgress when confirmed', async () => {
  window.confirm = jest.fn().mockReturnValue(true);
  render(<GameHome />);
  await userEvent.click(screen.getByRole('button', { name: /Reset Progress/i }));
  expect(mockResetProgress).toHaveBeenCalledTimes(1);
});
```

## Starter Code

```javascript
const isValidId = id => /^HERO-\d{4}$/.test(id);

test('valid ID', () => {
  // TODO: Assert that isValidId('HERO-1234' equals true using .toBe().
});

test('invalid ID - wrong prefix', () => {
  // TODO: Assert that isValidId('MAGE-1234' equals false using .toBe().
});

test('invalid ID - too short', () => {
  // TODO: Assert that isValidId('HERO-12' equals false using .toBe().
});
```
