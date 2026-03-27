# Binary Search

**Level:** 202
**ID:** `jest-202`
**XP:** 130
**Tags:** `binary search`, `algorithm`, `test.each`

## Objective

Test a binary search implementation.

## Story

The dungeon index is sorted. Use binary search to find rooms fast.

## Hints
1. Binary search returns the index or -1.
2. Tests: found in middle, first, last; not found returns -1.
3. test.each parameterises all four cases.

## Solution

```javascript
function binarySearch(a,t){let lo=0,hi=a.length-1;while(lo<=hi){const mid=Math.floor((lo+hi)/2);if(a[mid]===t)return mid;if(a[mid]<t)lo=mid+1;else hi=mid-1;}return -1;}
const sorted=[1,3,5,7,9,11,13];
test.each([[7,3],[1,0],[13,6],[6,-1]])('search %i → index %i',(t,i)=>{expect(binarySearch(sorted,t)).toBe(i);});
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
function binarySearch(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}

const sorted = [1, 3, 5, 7, 9, 11, 13];

test.each([
  [7, 3],
  [1, 0],
  [13, 6],
  [6, -1],
])('search %i → index %i', (target, index) => {
  // TODO: Assert that binarySearch(sorted, target equals index using .toBe().
});
```
