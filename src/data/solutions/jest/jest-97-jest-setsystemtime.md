# jest.setSystemTime

**Level:** 97
**ID:** `jest-97`
**XP:** 120
**Tags:** `jest.setSystemTime`, `fake timers`, `Date`

## Objective

Use jest.setSystemTime() to control Date.now() and new Date().

## Story

The dungeon clock must be frozen at midnight for the ritual.

## Hints
1. jest.setSystemTime(date) fixes the clock at that moment.
2. new Date() and Date.now() both use the frozen time.
3. Must call jest.useFakeTimers() first.

## Solution

```javascript
jest.useFakeTimers();
test('frozen clock',()=>{const m=new Date('2024-01-01T00:00:00Z');jest.setSystemTime(m);expect(new Date().toISOString()).toBe('2024-01-01T00:00:00.000Z');expect(Date.now()).toBe(m.getTime());});
```

## Explanation

Testing component props:

```
render(<LevelHeader level={{ id: 'cy-05', order: 5, title: 'The Selector Sage', ... }} />);
expect(screen.getByRole('heading', { name: 'The Selector Sage' })).toBeInTheDocument();
expect(screen.getByText('Level 5')).toBeInTheDocument();
expect(screen.getByText('+150 XP')).toBeInTheDocument();
```

Pass different prop values to test edge cases (empty arrays, boundary numbers, etc.).

## Starter Code

```javascript
jest.useFakeTimers();

test('frozen clock', () => {
  const midnight = new Date('2024-01-01T00:00:00Z');
  jest.setSystemTime(midnight);
  // TODO: Assert that new Date() equals '2024-01-01T00:00:00.000Z' using .toBe().
  // TODO: Assert that Date.now( equals midnight.getTime() using .toBe().
});
```
