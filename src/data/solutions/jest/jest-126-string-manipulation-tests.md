# String Manipulation Tests

**Level:** 126
**ID:** `jest-126`
**XP:** 100
**Tags:** `string`, `trim`, `split`, `join`

## Objective

Test string methods: trim, split, join.

## Story

The scribe transforms hero names. Test trim, split, and join.

## Hints
1. trim() removes leading/trailing whitespace.
2. split(' ') splits on spaces.
3. join('.') joins array elements with dots.

## Solution

```javascript
const normalize=n=>n.trim().toLowerCase();const initials=n=>n.split(' ').map(w=>w[0]).join('.');
test('normalize',()=>{expect(normalize('  Alice  ')).toBe('alice');});
test('initials',()=>{expect(initials('Alice Bob Carol')).toBe('A.B.C');});
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
const normalize = name => name.trim().toLowerCase();
const initials = name => name.split(' ').map(w => w[0]).join('.');

test('normalize', () => {
  // TODO: Assert that normalize('  Alice  ' equals 'alice' using .toBe().
});

test('initials', () => {
  // TODO: Assert that initials('Alice Bob Carol' equals 'A.B.C' using .toBe().
});
```
