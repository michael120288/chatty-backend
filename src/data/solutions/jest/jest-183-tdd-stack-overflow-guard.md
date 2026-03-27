# TDD: Stack Overflow Guard

**Level:** 183
**ID:** `jest-183`
**XP:** 120
**Tags:** `TDD`, `recursion`, `RangeError`

## Objective

Test a recursive function with a depth limit.

## Story

The recursion guard stops infinite loops. Test-drive the safeguard.

## Hints
1. Spread recursion builds array from n to 1.
2. depth > 10 triggers RangeError before stack overflow.
3. toThrow(RangeError) checks the error class.

## Solution

```javascript
function countdown(n,depth=0){if(depth>10)throw new RangeError('Too deep');if(n<=0)return[];return[n,...countdown(n-1,depth+1)];}
test('countdown 3',()=>{expect(countdown(3)).toEqual([3,2,1]);});
test('overflow guard',()=>{expect(()=>countdown(100)).toThrow(RangeError);});
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
function countdown(n, depth = 0) {
  if (depth > 10) throw new RangeError('Too deep');
  if (n <= 0) return [];
  return [n, ...countdown(n - 1, depth + 1)];
}

test('countdown 3', () => {
  // TODO: Assert that countdown(3 deeply equals the expected value using .toEqual().
});

test('overflow guard', () => {
  // TODO: Assert that the function throws the expected error using .toThrow().
});
```
