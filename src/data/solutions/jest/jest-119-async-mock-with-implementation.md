# Async Mock with Implementation

**Level:** 119
**ID:** `jest-119`
**XP:** 130
**Tags:** `mockImplementation`, `async`, `mock`

## Objective

Use mockImplementation with an async function.

## Story

The dungeon database is async. Mock it with a custom async implementation.

## Hints
1. mockImplementation takes a function (sync or async) as the mock body.
2. For async mocks, the function can be async or return a Promise.
3. mockResolvedValue is shorthand for async returning a value.

## Solution

```javascript
function Database(){this.findHero=async(id)=>{throw new Error('Not implemented');};}
async function getHeroName(db,id){const h=await db.findHero(id);return h.name;}
test('get hero name',async()=>{const db=new Database();db.findHero=jest.fn().mockImplementation(async(id)=>({id,name:'Aria'}));const name=await getHeroName(db,1);expect(name).toBe('Aria');expect(db.findHero).toHaveBeenCalledWith(1);});
```

## Explanation

`jest.mock` with `__mocks__` folder: place a file at `__mocks__/moduleName.js` to auto-mock across all tests.

```
// __mocks__/@services/api/game/game.service.js
export const gameService = {
  getLevels: jest.fn(),
  getLevel: jest.fn(),
};
```

In tests: `jest.mock('@services/api/game/game.service')` will use your manual mock automatically.

## Starter Code

```javascript
function Database() {
  this.findHero = async (id) => { throw new Error('Not implemented'); };
}

async function getHeroName(db, id) {
  const hero = await db.findHero(id);
  return hero.name;
}

test('get hero name', async () => {
  const db = new Database();
  db.findHero = jest.fn().mockImplementation(async (id) => ({ id, name: 'Aria' }));

  const name = await getHeroName(db, 1);
  // TODO: Assert that name equals 'Aria' using .toBe().
  // TODO: Assert that db.findHero was called with the expected arguments.
});
```
