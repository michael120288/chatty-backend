# Testing every and some

**Level:** 123
**ID:** `jest-123`
**XP:** 110
**Tags:** `every`, `some`, `arrays`

## Objective

Test functions using .every() and .some().

## Story

The guild checks if all heroes are ready, or if any hero is injured.

## Hints
1. every returns true only if ALL elements pass the predicate.
2. some returns true if AT LEAST ONE element passes.
3. Test both true and false cases for full coverage.

## Solution

```javascript
const allReady=h=>h.every(x=>x.hp>0);const anyInjured=h=>h.some(x=>x.hp<50);
test('all ready',()=>{expect(allReady([{hp:100},{hp:80}])).toBe(true);});
test('not all ready',()=>{expect(allReady([{hp:100},{hp:0}])).toBe(false);});
test('someone injured',()=>{expect(anyInjured([{hp:100},{hp:20}])).toBe(true);});
```

## Explanation

Testing loading states:

```
it('shows loading spinner while data fetches', () => {
  gameService.getLevels.mockReturnValue(new Promise(() => {})); // never resolves
  render(<GameHome />);
  expect(screen.getByText('Loading levels...')).toBeInTheDocument();
});

it('hides spinner once data loads', async () => {
  render(<GameHome />);
  await waitFor(() =>
    expect(screen.queryByText('Loading levels...')).not.toBeInTheDocument()
  );
});
```

## Starter Code

```javascript
const allReady = heroes => heroes.every(h => h.hp > 0);
const anyInjured = heroes => heroes.some(h => h.hp < 50);

test('all ready', () => {
  // TODO: Assert that allReady([{ hp: 100 }, { hp: 80 }] equals true using .toBe().
});

test('not all ready', () => {
  // TODO: Assert that allReady([{ hp: 100 }, { hp: 0 }] equals false using .toBe().
});

test('someone injured', () => {
  // TODO: Assert that anyInjured([{ hp: 100 }, { hp: 20 }] equals true using .toBe().
});
```
