# Factory Functions

**Level:** 194
**ID:** `jest-194`
**XP:** 120
**Tags:** `factory`, `defaults`, `destructuring`

## Objective

Test a factory function with required and optional fields.

## Story

The hero factory creates heroes with sensible defaults. Test factory variations.

## Hints
1. Destructuring with defaults handles optional fields.
2. toEqual for full object comparison.
3. No name throws — test with toThrow.

## Solution

```javascript
function heroFactory({name,hp=100,mp=50,role='warrior'}={}){if(!name)throw new Error('Name required');return{name,hp,mp,role};}
test('full hero',()=>{expect(heroFactory({name:'Aria',hp:80,mp:60,role:'mage'})).toEqual({name:'Aria',hp:80,mp:60,role:'mage'});});
test('default fields',()=>{expect(heroFactory({name:'Bob'})).toEqual({name:'Bob',hp:100,mp:50,role:'warrior'});});
test('no name throws',()=>{expect(()=>heroFactory()).toThrow('Name required');});
```

## Explanation

Testing hook state with `mockReturnValue` for different scenarios:

```
it('shows 100% progress when all completed', async () => {
  useProgress.mockReturnValue({
    ...defaultProgress,
    completedLevels: JEST_LEVELS.map(l => l.id),
  });
  render(<GameHome />);
  await waitFor(() => expect(screen.getByText('Jest Unit Testing')).toBeInTheDocument());
  const fill = screen.getByText('Jest Unit Testing').closest('a').querySelector('.fill');
  expect(fill).toHaveStyle({ width: '100%' });
});
```

## Starter Code

```javascript
function heroFactory({ name, hp = 100, mp = 50, role = 'warrior' } = {}) {
  if (!name) throw new Error('Name required');
  return { name, hp, mp, role };
}

test('full hero', () => {
  // TODO: Assert that heroFactory() returns an object that deeply equals the expected shape using .toEqual().
});

test('default fields', () => {
  // TODO: Assert that heroFactory() fills in default values for hp, mp, and role using .toEqual().
});

test('no name throws', () => {
  // TODO: Assert that the function throws the expected error using .toThrow().
});```
