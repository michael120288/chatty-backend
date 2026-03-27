# Cache Aside Pattern

**Level:** 213
**ID:** `jest-213`
**XP:** 130
**Tags:** `cache-aside`, `pattern`, `mock`, `async`

## Objective

Test a cache-aside pattern with mock cache and database.

## Story

The dungeon cache serves hot data. On miss, fetch from DB and populate cache.

## Hints
1. Cache hit: db is never called.
2. Cache miss: db is called and result is stored in cache.
3. cache.set should only be called on a miss.

## Solution

```javascript
async function getHeroWithCache(id,cache,db){const c=await cache.get(id);if(c)return c;const hero=await db.findById(id);if(hero)await cache.set(id,hero);return hero;}
test('cache hit',async()=>{const cache={get:jest.fn().mockResolvedValue({id:1,name:'Aria'}),set:jest.fn()};const db={findById:jest.fn()};const h=await getHeroWithCache(1,cache,db);expect(h.name).toBe('Aria');expect(db.findById).not.toHaveBeenCalled();});
test('cache miss — fetches from db',async()=>{const cache={get:jest.fn().mockResolvedValue(null),set:jest.fn()};const db={findById:jest.fn().mockResolvedValue({id:2,name:'Bob'})};const h=await getHeroWithCache(2,cache,db);expect(h.name).toBe('Bob');expect(db.findById).toHaveBeenCalledWith(2);expect(cache.set).toHaveBeenCalledWith(2,{id:2,name:'Bob'});});
```

## Explanation

Testing component integration with services:

```
it('calls service with correct args on submit', async () => {
  const mockSubmit = jest.fn().mockResolvedValue({ passed: true });
  render(<CodeSubmitter onSubmit={mockSubmit} levelId="level-01" />);
  await userEvent.click(screen.getByRole('button', { name: 'Run Code' }));
  expect(mockSubmit).toHaveBeenCalledWith('level-01', expect.any(String));
});
```

## Starter Code

```javascript
async function getHeroWithCache(id, cache, db) {
  const cached = await cache.get(id);
  if (cached) return cached;
  const hero = await db.findById(id);
  if (hero) await cache.set(id, hero);
  return hero;
}

test('cache hit', async () => {
  const cache = { get: jest.fn().mockResolvedValue({ id: 1, name: 'Aria' }), set: jest.fn() };
  const db = { findById: jest.fn() };
  const hero = await getHeroWithCache(1, cache, db);
  // TODO: Assert that hero.name equals 'Aria' using .toBe().
  // TODO: Assert that db.findById was not called.
});

test('cache miss — fetches from db', async () => {
  const cache = { get: jest.fn().mockResolvedValue(null), set: jest.fn() };
  const db = { findById: jest.fn().mockResolvedValue({ id: 2, name: 'Bob' }) };
  const hero = await getHeroWithCache(2, cache, db);
  // TODO: Assert that hero.name equals 'Bob' using .toBe().
  // TODO: Assert that db.findById was called with the expected arguments.
  // TODO: Assert that cache.set was called with the expected arguments.
});
```
