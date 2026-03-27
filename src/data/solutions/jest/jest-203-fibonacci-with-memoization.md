# Fibonacci with Memoization

**Level:** 203
**ID:** `jest-203`
**XP:** 130
**Tags:** `fibonacci`, `memoize`, `algorithm`

## Objective

Test a memoized Fibonacci function for correctness and efficiency.

## Story

The dungeon spiral follows the Fibonacci sequence. Test the memoized version.

## Hints
1. Fibonacci: 0,1,1,2,3,5,8,13,21,34,55...
2. fib(5)=5, fib(10)=55, fib(15)=610.
3. makeFib creates a fresh cache per call.

## Solution

```javascript
function makeFib(){const cache={};return function fib(n){if(n<=1)return n;if(n in cache)return cache[n];cache[n]=fib(n-1)+fib(n-2);return cache[n];};}
const fib=makeFib();
test.each([[0,0],[1,1],[5,5],[10,55],[15,610]])('fib(%i) = %i',(n,e)=>{expect(fib(n)).toBe(e);});
```

## Explanation

Testing React form interactions:

```
it('updates state on input change', async () => {
  render(<SearchForm />);
  const input = screen.getByRole('textbox', { name: /search/i });
  await userEvent.type(input, 'fireball');
  expect(input).toHaveValue('fireball');
});
```

## Starter Code

```javascript
function makeFib() {
  const cache = {};
  return function fib(n) {
    if (n <= 1) return n;
    if (n in cache) return cache[n];
    cache[n] = fib(n - 1) + fib(n - 2);
    return cache[n];
  };
}

const fib = makeFib();

test.each([
  [0, 0], [1, 1], [5, 5], [10, 55], [15, 610]
])('fib(%i) = %i', (n, expected) => {
  // TODO: Assert that fib(n equals expected using .toBe().
});
```
