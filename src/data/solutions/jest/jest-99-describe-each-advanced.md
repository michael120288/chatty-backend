# describe.each Advanced

**Level:** 99
**ID:** `jest-99`
**XP:** 120
**Tags:** `describe.each`, `parameterised`

## Objective

Use describe.each to parameterise an entire describe block.

## Story

Each hero class has a set of tests. Run the same describe block for all classes.

## Hints
1. describe.each creates one describe block per row.
2. %s formats the name in the describe label.
3. Each row's values are passed as arguments to the callback.

## Solution

```javascript
describe.each([['Warrior',100,'sword'],['Mage',60,'staff']])('%s hero',(name,hp,weapon)=>{test('has positive HP',()=>{expect(hp).toBeGreaterThan(0);});test('has a weapon',()=>{expect(weapon).toBeTruthy();});});
```

## Explanation

Testing component props:

```
render(<LevelHeader level={{ id: 'cy-05', order: 5, title: 'The Selector Sage', ... }} />);
expect(screen.getByRole('heading', { name: 'The Selector Sage' })).toBeInTheDocument();
expect(screen.getByText('Level 5')).toBeInTheDocument();
expect(screen.getByText('+150 XP')).toBeInTheDocument();
```

Pass different prop values to test edge cases (empty arrays, boundary numbers, etc.).

## Starter Code

```javascript
describe.each([
  ['Warrior', 100, 'sword'],
  ['Mage', 60, 'staff'],
])('%s hero', (name, hp, weapon) => {
  test('has positive HP', () => {
    // TODO: Assert that hp is greater than 0.
  });

  test('has a weapon', () => {
    // TODO: Assert that weapon is truthy.
  });
});
```
