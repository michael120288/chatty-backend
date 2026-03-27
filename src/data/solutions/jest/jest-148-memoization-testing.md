# Memoization Testing

**Level:** 148
**ID:** `jest-148`
**XP:** 130
**Tags:** `memoize`, `cache`, `jest.fn`

## Objective

Test a memoize function that caches results.

## Story

The oracle remembers previous answers to avoid recalculating. Test memoization.

## Hints
1. The underlying function should only be called once per unique input.
2. jest.fn tracks how many times it was called.
3. Cache hit = no call to expensive.

## Solution

```javascript
function memoize(fn){const cache={};return function(n){if(n in cache)return cache[n];cache[n]=fn(n);return cache[n];};}
test('memoize caches results',()=>{const expensive=jest.fn(n=>n*2);const memo=memoize(expensive);memo(5);memo(5);memo(5);expect(expensive).toHaveBeenCalledTimes(1);expect(memo(5)).toBe(10);});
```

## Explanation

Testing async data fetching patterns:

```
it('displays data after load', async () => {
  gameService.getLevels.mockResolvedValue(ALL_LEVELS);
  render(<GameHome />);
  // First check loading state
  expect(screen.getByText('Loading levels...')).toBeInTheDocument();
  // Then wait for data
  await waitFor(() =>
    expect(screen.getByText('Jest Unit Testing')).toBeInTheDocument()
  );
});
```

## Starter Code

```javascript
function memoize(fn) {
  const cache = {};
  return function (n) {
    if (n in cache) return cache[n];
    cache[n] = fn(n);
    return cache[n];
  };
}

test('memoize caches results', () => {
  const expensive = jest.fn(n => n * 2);
  const memo = memoize(expensive);

  memo(5);
  memo(5);
  memo(5);

  // TODO: Assert that expensive was called exactly 1 times.
  // TODO: Assert that memo(5 equals 10 using .toBe().
});
```
