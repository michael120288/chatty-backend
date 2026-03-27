# Testing find and findIndex

**Level:** 122
**ID:** `jest-122`
**XP:** 110
**Tags:** `find`, `findIndex`, `arrays`

## Objective

Test functions using .find() and .findIndex().

## Story

The archivist searches scrolls by title. Test find and findIndex.

## Hints
1. find returns the element or undefined.
2. findIndex returns -1 when not found.
3. toEqual for the found object, toBe for the index.

## Solution

```javascript
const scrolls=[{id:1,title:'Fire'},{id:2,title:'Ice'},{id:3,title:'Thunder'}];
const findScroll=t=>scrolls.find(s=>s.title===t);const findIndex=t=>scrolls.findIndex(s=>s.title===t);
test('find scroll',()=>{expect(findScroll('Ice')).toEqual({id:2,title:'Ice'});});
test('find index',()=>{expect(findIndex('Thunder')).toBe(2);});
test('not found',()=>{expect(findScroll('Wind')).toBeUndefined();});
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
const scrolls = [
  { id: 1, title: 'Fire' },
  { id: 2, title: 'Ice' },
  { id: 3, title: 'Thunder' },
];

const findScroll = (title) => scrolls.find(s => s.title === title);
const findIndex = (title) => scrolls.findIndex(s => s.title === title);

test('find scroll', () => {
  // TODO: Assert that findScroll('Ice' deeply equals the expected value using .toEqual().
});

test('find index', () => {
  // TODO: Assert that findIndex('Thunder' equals 2 using .toBe().
});

test('not found', () => {
  // TODO: Assert that findScroll('Wind' is undefined.
});
```
