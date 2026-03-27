# TDD: FizzBuzz

**Level:** 182
**ID:** `jest-182`
**XP:** 120
**Tags:** `TDD`, `test.each`, `fizzbuzz`

## Objective

Test-drive a FizzBuzz implementation.

## Story

The dungeon oracle chants numbers with rules. Write tests to drive FizzBuzz.

## Hints
1. test.each runs the same assertion for each row.
2. 15 is divisible by both 3 and 5 — check it first.
3. String(n) converts the number to a string.

## Solution

```javascript
function fizzBuzz(n){if(n%15===0)return'FizzBuzz';if(n%3===0)return'Fizz';if(n%5===0)return'Buzz';return String(n);}
test.each([[1,'1'],[3,'Fizz'],[5,'Buzz'],[15,'FizzBuzz'],[7,'7']])('fizzBuzz(%i) = %s',(n,e)=>{expect(fizzBuzz(n)).toBe(e);});
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
function fizzBuzz(n) {
  if (n % 15 === 0) return 'FizzBuzz';
  if (n % 3 === 0) return 'Fizz';
  if (n % 5 === 0) return 'Buzz';
  return String(n);
}

test.each([
  [1, '1'], [3, 'Fizz'], [5, 'Buzz'], [15, 'FizzBuzz'], [7, '7']
])('fizzBuzz(%i) = %s', (n, expected) => {
  // TODO: Assert that fizzBuzz(n equals expected using .toBe().
});
```
