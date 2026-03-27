# Testing with Array.from Generator

**Level:** 145
**ID:** `jest-145`
**XP:** 130
**Tags:** `generator`, `Array.from`, `toEqual`

## Objective

Use Array.from to collect generator values and assert with toEqual.

## Story

Convert the entire generator sequence into an array for easy testing.

## Hints
1. Array.from iterates the generator fully.
2. toEqual does deep array comparison.
3. Spread syntax [...range(1,5)] also works.

## Solution

```javascript
function* range(s,e){for(let i=s;i<=e;i++)yield i;}
test('range 1 to 5',()=>{expect(Array.from(range(1,5))).toEqual([1,2,3,4,5]);});
test('range 3 to 6',()=>{expect(Array.from(range(3,6))).toEqual([3,4,5,6]);});
```

## Explanation

Testing conditional rendering based on props:

```
it('renders nothing for empty tags array', () => {
  render(<LevelHeader level={{ ...LEVEL, tags: [] }} />);
  expect(screen.queryByText('cy.get')).not.toBeInTheDocument();
});

it('renders all tags when provided', () => {
  render(<LevelHeader level={LEVEL} />);
  LEVEL.tags.forEach(tag => {
    expect(screen.getByText(tag)).toBeInTheDocument();
  });
});
```

## Starter Code

```javascript
function* range(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

test('range 1 to 5', () => {
  // TODO: Assert that Array.from(range(1, 5 deeply equals the expected value using .toEqual().
});

test('range 3 to 6', () => {
  // TODO: Assert that Array.from(range(3, 6 deeply equals the expected value using .toEqual().
});
```
