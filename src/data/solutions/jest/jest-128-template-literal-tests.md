# Template Literal Tests

**Level:** 128
**ID:** `jest-128`
**XP:** 100
**Tags:** `template literal`, `string`, `toMatch`

## Objective

Test a function that builds strings with template literals.

## Story

The herald formats proclamations with template literals. Test the output.

## Hints
1. toBe checks exact string equality.
2. toMatch checks substring containment.
3. Template literals interpolate ${} expressions.

## Solution

```javascript
const proclaim=(h,d)=>`${h} has ${d}!`;
test('proclaim victory',()=>{expect(proclaim('Alice','slain the dragon')).toBe('Alice has slain the dragon!');});
test('toMatch substring',()=>{expect(proclaim('Bob','found gold')).toMatch('found gold');});
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
const proclaim = (hero, deed) => `${hero} has ${deed}!`;

test('proclaim victory', () => {
  // TODO: Assert that proclaim('Alice', 'slain the dragon' equals 'Alice has slain the dragon!' using .toBe().
});

test('toMatch substring', () => {
  // TODO: Assert that proclaim('Bob', 'found gold' matches the expected pattern using .toMatch().
});
```
