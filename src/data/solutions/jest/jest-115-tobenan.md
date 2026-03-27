# toBeNaN

**Level:** 115
**ID:** `jest-115`
**XP:** 100
**Tags:** `toBeNaN`, `numbers`

## Objective

Use toBeNaN() to assert a value is NaN.

## Story

Dividing by zero yields NaN. The calculator must identify this dangerous result.

## Hints
1. toBeNaN() checks Number.isNaN(value).
2. 0/0 in JavaScript is NaN.
3. Note: 1/0 is Infinity, not NaN.

## Solution

```javascript
function divide(a,b){return a/b;}
test('divide by zero is NaN',()=>{expect(divide(0,0)).toBeNaN();});
test('valid division',()=>{expect(divide(10,2)).toBe(5);});
```

## Explanation

Testing error boundaries and error states:

```
it('shows error when API fails', async () => {
  jest.spyOn(api, 'fetchLevels').mockRejectedValue(new Error('Network error'));
  render(<GameHome />);
  await waitFor(() =>
    expect(screen.getByText(/Failed to load.*Network error/)).toBeInTheDocument()
  );
});
```

## Starter Code

```javascript
function divide(a, b) {
  return a / b;
}

test('divide by zero is NaN', () => {
  // TODO: Assert that divide(0, 0 is NaN.
});

test('valid division', () => {
  // TODO: Assert that divide(10, 2 equals 5 using .toBe().
});
```
