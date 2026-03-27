# Boss: The Parameterised Gauntlet

**Level:** 100
**ID:** `jest-100`
**XP:** 200
**Tags:** `test.each`, `async`, `boss`, `parameterised`

## Objective

Write parameterised async tests combining numeric and string matchers.

## Story

A hundred challenges survived. Now combine test.each, matchers, and async in one battle.

## Hints
1. Async test.each functions just add async before the callback.
2. %i formats integers, %s formats strings in test names.
3. Combine multiple expects per test for thorough coverage.

## Solution

```javascript
async function fetchHero(id){const h=[{id:1,name:'Alice',hp:100},{id:2,name:'Bob',hp:80}];return h.find(x=>x.id===id)||null;}
test.each([[1,'Alice',100],[2,'Bob',80]])('hero %i: %s with %i HP',async(id,name,hp)=>{const h=await fetchHero(id);expect(h).not.toBeNull();expect(h.name).toBe(name);expect(h.hp).toBe(hp);expect(h.hp).toBeGreaterThan(0);});
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
async function fetchHero(id) {
  const heroes = [
    { id: 1, name: 'Alice', hp: 100 },
    { id: 2, name: 'Bob', hp: 80 },
  ];
  return heroes.find(h => h.id === id) || null;
}

test.each([
  [1, 'Alice', 100],
  [2, 'Bob', 80],
])('hero %i: %s with %i HP', async (id, name, hp) => {
  const hero = await fetchHero(id);
  // TODO: Assert that hero is not null.
  // TODO: Assert that hero.name equals name using .toBe().
  // TODO: Assert that hero.hp equals hp using .toBe().
  // TODO: Assert that hero.hp is greater than 0.
});
```
