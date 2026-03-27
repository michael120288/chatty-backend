# Immutable Updates

**Level:** 195
**ID:** `jest-195`
**XP:** 120
**Tags:** `immutable`, `spread`, `pure function`

## Objective

Test functions that return new objects instead of mutating.

## Story

The dungeon state is immutable. Each update returns a new object.

## Hints
1. Spread creates a shallow copy — original is untouched.
2. Immutability is the Redux pattern.
3. Always assert that the original was NOT modified.

## Solution

```javascript
function addXP(h,n){return{...h,xp:h.xp+n};}
function levelUp(h){return{...h,level:h.level+1,xp:0};}
test('add XP does not mutate',()=>{const h={name:'Aria',level:1,xp:0};const u=addXP(h,50);expect(u.xp).toBe(50);expect(h.xp).toBe(0);});
test('level up',()=>{const h={name:'Aria',level:1,xp:100};const l=levelUp(h);expect(l.level).toBe(2);expect(l.xp).toBe(0);expect(h.level).toBe(1);});
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
function addXP(hero, amount) {
  return { ...hero, xp: hero.xp + amount };
}

function levelUp(hero) {
  return { ...hero, level: hero.level + 1, xp: 0 };
}

test('add XP does not mutate', () => {
  const hero = { name: 'Aria', level: 1, xp: 0 };
  const updated = addXP(hero, 50);
  // TODO: Assert that updated.xp equals 50 using .toBe().
  // TODO: Assert that hero.xp equals 0 using .toBe().
});

test('level up', () => {
  const hero = { name: 'Aria', level: 1, xp: 100 };
  const leveled = levelUp(hero);
  // TODO: Assert that leveled.level equals 2 using .toBe().
  // TODO: Assert that leveled.xp equals 0 using .toBe().
  // TODO: Assert that hero.level equals 1 using .toBe().
});
```
