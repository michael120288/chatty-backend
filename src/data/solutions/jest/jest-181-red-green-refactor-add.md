# Red-Green-Refactor: Add

**Level:** 181
**ID:** `jest-181`
**XP:** 110
**Tags:** `TDD`, `basics`

## Objective

Write the test first, then implement to make it pass.

## Story

Start with a failing test, make it pass, then verify. Classic TDD.

## Hints
1. Red: write test before code.
2. Green: implement the simplest code to pass.
3. Refactor: clean up without breaking tests.

## Solution

```javascript
function add(a,b){return a+b;}
test('add two numbers',()=>{expect(add(2,3)).toBe(5);expect(add(-1,1)).toBe(0);expect(add(0,0)).toBe(0);});
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
// The function is NOT implemented yet — write the test first
function add(a, b) {
  return a + b; // implement this
}

test('add two numbers', () => {
  // TODO: Assert that add(2, 3 equals 5 using .toBe().
  // TODO: Assert that add(-1, 1 equals 0 using .toBe().
  // TODO: Assert that add(0, 0 equals 0 using .toBe().
});
```
