# Boss: Full Mock Suite

**Level:** 120
**ID:** `jest-120`
**XP:** 200
**Tags:** `boss`, `mock`, `async`, `spy`, `rejects`

## Objective

Combine spies, mock implementations, call assertions, and async in one suite.

## Story

A century of tests completed. The mock master challenge awaits.

## Hints
1. mockResolvedValue for happy path, null for not-found path.
2. rejects.toThrow checks both rejection and message.
3. Verify all side effects: db called, logger called.

## Solution

```javascript
class HeroService{constructor(db,logger){this.db=db;this.logger=logger;}async getHero(id){this.logger.log(`Fetching hero ${id}`);const h=await this.db.findById(id);if(!h)throw new Error('Hero not found');return h;}}
test('getHero success',async()=>{const db={findById:jest.fn().mockResolvedValue({id:1,name:'Aria'})};const logger={log:jest.fn()};const s=new HeroService(db,logger);const h=await s.getHero(1);expect(h).toEqual({id:1,name:'Aria'});expect(db.findById).toHaveBeenCalledWith(1);expect(logger.log).toHaveBeenCalledWith('Fetching hero 1');});
test('getHero not found',async()=>{const db={findById:jest.fn().mockResolvedValue(null)};const logger={log:jest.fn()};const s=new HeroService(db,logger);await expect(s.getHero(99)).rejects.toThrow('Hero not found');});
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
class HeroService {
  constructor(db, logger) {
    this.db = db;
    this.logger = logger;
  }
  async getHero(id) {
    this.logger.log(`Fetching hero ${id}`);
    const hero = await this.db.findById(id);
    if (!hero) throw new Error('Hero not found');
    return hero;
  }
}

test('getHero success', async () => {
  const db = { findById: jest.fn().mockResolvedValue({ id: 1, name: 'Aria' }) };
  const logger = { log: jest.fn() };
  const service = new HeroService(db, logger);

  const hero = await service.getHero(1);

  // TODO: Assert that hero deeply equals the expected value using .toEqual().
  // TODO: Assert that db.findById was called with the expected arguments.
  // TODO: Assert that logger.log was called with the expected arguments.
});

test('getHero not found', async () => {
  const db = { findById: jest.fn().mockResolvedValue(null) };
  const logger = { log: jest.fn() };
  const service = new HeroService(db, logger);

  // TODO: Assert that the function throws the expected error.
});
```
