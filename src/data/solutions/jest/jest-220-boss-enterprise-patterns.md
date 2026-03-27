# Boss: Enterprise Patterns

**Level:** 220
**ID:** `jest-220`
**XP:** 300
**Tags:** `boss`, `circuit breaker`, `cache`, `async`, `mock`

## Objective

Combine circuit breaker, retry, and cache-aside with full spy coverage.

## Story

220 levels. The enterprise gauntlet — circuit breaker, retry, cache-aside together.

## Hints
1. Cache hit: neither db nor cb is called.
2. Cache miss: cb wraps the db call; result is cached.
3. Transparent CB: mockImplementation(fn => fn()) passes through.

## Solution

```javascript
async function fetchWithResilience(id,cache,db,cb){const c=await cache.get(id);if(c)return c;const hero=await cb(async()=>db.findById(id));await cache.set(id,hero);return hero;}
test('cache hit bypasses circuit breaker',async()=>{const cache={get:jest.fn().mockResolvedValue({id:1,name:'Aria'}),set:jest.fn()};const db={findById:jest.fn()};const cb=jest.fn();const hero=await fetchWithResilience(1,cache,db,cb);expect(hero.name).toBe('Aria');expect(db.findById).not.toHaveBeenCalled();expect(cb).not.toHaveBeenCalled();});
test('cache miss goes through circuit breaker',async()=>{const cache={get:jest.fn().mockResolvedValue(null),set:jest.fn()};const db={findById:jest.fn().mockResolvedValue({id:2,name:'Bob'})};const cb=jest.fn().mockImplementation(fn=>fn());const hero=await fetchWithResilience(2,cache,db,cb);expect(hero.name).toBe('Bob');expect(cb).toHaveBeenCalledTimes(1);expect(cache.set).toHaveBeenCalledWith(2,{id:2,name:'Bob'});});
```

## Explanation

Testing React context consumers:

```
const wrapper = ({ children }) => (
  <GameContext.Provider value={{ solutions: {}, setSolution: jest.fn() }}>
    {children}
  </GameContext.Provider>
);
const { result } = renderHook(() => useGame(), { wrapper });
expect(result.current.solutions).toEqual({});
```

## Starter Code

```javascript
async function fetchWithResilience(id, cache, db, cb) {
  const cached = await cache.get(id);
  if (cached) return cached;
  const hero = await cb(async () => db.findById(id));
  await cache.set(id, hero);
  return hero;
}

test('cache hit bypasses circuit breaker', async () => {
  const cache = { get: jest.fn().mockResolvedValue({ id: 1, name: 'Aria' }), set: jest.fn() };
  const db = { findById: jest.fn() };
  const cb = jest.fn();
  const hero = await fetchWithResilience(1, cache, db, cb);
  // TODO: Assert that hero.name equals 'Aria' using .toBe().
  // TODO: Assert that db.findById was not called.
  // TODO: Assert that cb was not called.
});

test('cache miss goes through circuit breaker', async () => {
  const cache = { get: jest.fn().mockResolvedValue(null), set: jest.fn() };
  const db = { findById: jest.fn().mockResolvedValue({ id: 2, name: 'Bob' }) };
  const cb = jest.fn().mockImplementation(fn => fn()); // transparent CB
  const hero = await fetchWithResilience(2, cache, db, cb);
  // TODO: Assert that hero.name equals 'Bob' using .toBe().
  // TODO: Assert that cb was called exactly 1 times.
  // TODO: Assert that cache.set was called with the expected arguments.
});
```
