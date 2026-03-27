# Spy on Prototype Method

**Level:** 141
**ID:** `jest-141`
**XP:** 130
**Tags:** `spyOn`, `prototype`, `class`

## Objective

Use jest.spyOn on a class prototype method.

## Story

Track calls to any instance of a class by spying on the prototype.

## Hints
1. Spy on Sword.prototype to intercept all instances.
2. mockRestore restores the original method.
3. Works for methods defined on the prototype chain.

## Solution

```javascript
class Sword{swing(){return'whoosh';}}
test('spy on swing',()=>{const spy=jest.spyOn(Sword.prototype,'swing');const s=new Sword();s.swing();expect(spy).toHaveBeenCalledTimes(1);spy.mockRestore();});
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
class Sword {
  swing() { return 'whoosh'; }
}

test('spy on swing', () => {
  const spy = jest.spyOn(Sword.prototype, 'swing');
  const s = new Sword();
  s.swing();
  // TODO: Assert that spy was called exactly 1 times.
  spy.mockRestore();
});
```
