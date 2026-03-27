# async/await with multiple calls

**Level:** 161
**ID:** `jest-161`
**XP:** 120
**Tags:** `async/await`, `chain`

## Objective

Test a function that chains multiple async/await calls.

## Story

The dungeon makes three async calls in sequence. Test the chain.

## Hints
1. await each Promise in sequence.
2. Access nested properties directly.
3. toContain works on arrays and strings.

## Solution

```javascript
async function fetchInventory(id){const hero=await Promise.resolve({id,name:'Aria'});const items=await Promise.resolve(['sword','shield']);return{hero,items};}
test('full inventory',async()=>{const r=await fetchInventory(1);expect(r.hero.name).toBe('Aria');expect(r.items).toContain('sword');expect(r.items).toHaveLength(2);});
```

## Explanation

Testing components with mocked child components:

```
jest.mock('../components/XPBar', () => ({
  XPBar: () => <div data-testid="xp-bar" />
}));

it('renders XPBar component', () => {
  render(<GameHome />);
  expect(screen.getByTestId('xp-bar')).toBeInTheDocument();
});
```

Mocking child components isolates the component under test and avoids cascading failures.

## Starter Code

```javascript
async function fetchInventory(heroId) {
  const hero = await Promise.resolve({ id: heroId, name: 'Aria' });
  const items = await Promise.resolve(['sword', 'shield']);
  return { hero, items };
}

test('full inventory', async () => {
  const result = await fetchInventory(1);
  // TODO: Assert that result.hero.name equals 'Aria' using .toBe().
  // TODO: Assert that result.items contains 'sword'.
  // TODO: Assert that result.items has length 2.
});
```
