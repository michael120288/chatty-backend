# Spy on console.error

**Level:** 143
**ID:** `jest-143`
**XP:** 120
**Tags:** `spyOn`, `console.error`, `spy`

## Objective

Spy on console.error to assert error logging.

## Story

The dungeon warns about errors. Spy on console.error to verify warnings.

## Hints
1. Same pattern as console.log spy.
2. mockImplementation(() => {}) silences console output during tests.
3. Always restore after test.

## Solution

```javascript
function warnDungeon(e){console.error(`[ERROR] ${e}`);}
test('logs error',()=>{const spy=jest.spyOn(console,'error').mockImplementation(()=>{});warnDungeon('gate locked');expect(spy).toHaveBeenCalledWith('[ERROR] gate locked');spy.mockRestore();});
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
function warnDungeon(err) {
  console.error(`[ERROR] ${err}`);
}

test('logs error', () => {
  const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
  warnDungeon('gate locked');
  // TODO: Assert that spy was called with the expected arguments.
  spy.mockRestore();
});
```
