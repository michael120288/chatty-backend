# Spy on console.log

**Level:** 142
**ID:** `jest-142`
**XP:** 120
**Tags:** `spyOn`, `console.log`, `spy`

## Objective

Use jest.spyOn on console.log to assert logged messages.

## Story

The dungeon logger prints messages. Spy on console.log to verify output.

## Hints
1. Spy on console.log with mockImplementation to suppress output.
2. Then assert the spy was called with the right string.
3. Always restore after to avoid affecting other tests.

## Solution

```javascript
function logDungeon(msg){console.log(`[DUNGEON] ${msg}`);}
test('logs dungeon message',()=>{const spy=jest.spyOn(console,'log').mockImplementation(()=>{});logDungeon('hero entered');expect(spy).toHaveBeenCalledWith('[DUNGEON] hero entered');spy.mockRestore();});
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
function logDungeon(msg) {
  console.log(`[DUNGEON] ${msg}`);
}

test('logs dungeon message', () => {
  const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
  logDungeon('hero entered');
  // TODO: Assert that spy was called with the expected arguments.
  spy.mockRestore();
});
```
