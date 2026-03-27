# Pagination Logic

**Level:** 199
**ID:** `jest-199`
**XP:** 120
**Tags:** `pagination`, `slice`, `arrays`

## Objective

Test a pagination function that slices an array.

## Story

The dungeon library paginates scrolls. Test the paginate utility.

## Hints
1. start = (page-1) * size.
2. slice(start, start+size) handles partial last pages.
3. Test pages 1, 2, and the final partial page.

## Solution

```javascript
function paginate(i,p,s){const st=(p-1)*s;return i.slice(st,st+s);}
const items=[1,2,3,4,5,6,7,8,9,10];
test('page 1',()=>{expect(paginate(items,1,3)).toEqual([1,2,3]);});
test('page 2',()=>{expect(paginate(items,2,3)).toEqual([4,5,6]);});
test('last partial page',()=>{expect(paginate(items,4,3)).toEqual([10]);});
```

## Explanation

Testing number formatting and computed values:

```
it('shows correct total XP', async () => {
  const totalXP = JEST_LEVELS.reduce((sum, l) => sum + l.xpReward, 0); // 390
  render(<GameHome />);
  await waitFor(() => expect(screen.getByText('Jest Unit Testing')).toBeInTheDocument());
  expect(screen.getByText(`${totalXP.toLocaleString()} XP`)).toBeInTheDocument();
});
```

## Starter Code

```javascript
function paginate(items, page, size) {
  const start = (page - 1) * size;
  return items.slice(start, start + size);
}

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

test('page 1', () => {
  // TODO: Assert that paginate(items, 1, 3 deeply equals the expected value using .toEqual().
});

test('page 2', () => {
  // TODO: Assert that paginate(items, 2, 3 deeply equals the expected value using .toEqual().
});

test('last partial page', () => {
  // TODO: Assert that paginate(items, 4, 3 deeply equals the expected value using .toEqual().
});
```
