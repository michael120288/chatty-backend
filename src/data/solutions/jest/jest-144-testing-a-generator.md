# Testing a Generator

**Level:** 144
**ID:** `jest-144`
**XP:** 130
**Tags:** `generator`, `iterator`

## Objective

Test a generator function by iterating its values.

## Story

The dungeon produces rooms one by one using a generator. Test each yielded value.

## Hints
1. gen.next() returns { value, done }.
2. done is false until the generator is exhausted.
3. Call next() once per yield.

## Solution

```javascript
function* dungeonRooms(){yield'entrance';yield'hallway';yield'boss room';}
test('dungeon rooms',()=>{const gen=dungeonRooms();expect(gen.next().value).toBe('entrance');expect(gen.next().value).toBe('hallway');expect(gen.next().value).toBe('boss room');expect(gen.next().done).toBe(true);});
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
function* dungeonRooms() {
  yield 'entrance';
  yield 'hallway';
  yield 'boss room';
}

test('dungeon rooms', () => {
  const gen = dungeonRooms();
  // TODO: Assert that gen.next( equals 'entrance' using .toBe().
  // TODO: Assert that gen.next( equals 'hallway' using .toBe().
  // TODO: Assert that gen.next( equals 'boss room' using .toBe().
  // TODO: Assert that gen.next( equals true using .toBe().
});
```
