# toStrictEqual vs toEqual

**Level:** 184
**ID:** `jest-184`
**XP:** 120
**Tags:** `toStrictEqual`, `toEqual`, `difference`

## Objective

Understand and test the difference between toEqual and toStrictEqual.

## Story

The archivist distinguishes objects with undefined properties from sparse objects.

## Hints
1. toEqual ignores object keys with undefined values and array holes.
2. toStrictEqual is stricter — checks structure exactly.
3. Use toStrictEqual when exact shape matters.

## Solution

```javascript
test('toEqual ignores undefined keys',()=>{const a={x:undefined};const b={};expect(a).toEqual(b);});
test('toStrictEqual does not ignore undefined keys',()=>{const a={x:undefined};const b={};expect(a).not.toStrictEqual(b);});
```

## Explanation

Testing text content and ARIA accessibility:

```
it('renders accessible heading', () => {
  render(<LevelHeader level={LEVEL} />);
  // Role-based query (most accessible)
  expect(screen.getByRole('heading', { name: 'The Selector Sage' })).toBeInTheDocument();
  // Text content
  expect(screen.getByText('+150 XP')).toBeInTheDocument();
});
```

## Starter Code

```javascript
test('toEqual ignores undefined keys', () => {
  const a = { x: undefined };
  const b = {};
  // TODO: Assert that a deeply equals the expected value using .toEqual().
});

test('toStrictEqual does not ignore undefined keys', () => {
  const a = { x: undefined };
  const b = {};
  // TODO: Assert that a does not strictly equal the expected value using .not.toStrictEqual().
});
```
