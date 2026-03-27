# test.each with Tagged Template

**Level:** 98
**ID:** `jest-98`
**XP:** 120
**Tags:** `test.each`, `template literal`, `parameterised`

## Objective

Use test.each with tagged template literal syntax.

## Story

The spell tome lists names and damages in a readable table. Use tagged template test.each.

## Hints
1. Tagged template syntax: test.each`col1 | col2\n ${val1} | ${val2}`.
2. Column names become object keys in the test function.
3. $column in the test name is replaced with the value.

## Solution

```javascript
test.each`
  spell          | damage
  ${'fireball'}  | ${50}
  ${'ice shard'} | ${30}
  ${'thunder'}   | ${70}
`('$spell deals $damage damage',({spell,damage})=>{expect(damage).toBeGreaterThan(0);expect(spell).toBeTruthy();});
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
test.each`
  spell          | damage
  ${'fireball'}  | ${50}
  ${'ice shard'} | ${30}
  ${'thunder'}   | ${70}
`('$spell deals $damage damage', ({ spell, damage }) => {
  // TODO: Assert that damage is greater than 0.
  // TODO: Assert that spell is truthy.
});
```
