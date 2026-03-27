# Boss: Full Mock Architecture

**Level:** 255
**ID:** `jest-255`
**XP:** 300
**Tags:** `boss`, `mock`, `architecture`, `async`, `multi-layer`

## Objective

Test a multi-layer service with database, cache, logger, and event bus — all mocked.

## Story

255 levels. The ultimate mock architecture — a full service layer with injected mocks.

## Hints
1. register: all four deps are called.
2. get with cache hit: only cache.get and logger.debug are called.
3. expect.objectContaining handles the dynamic id from Date.now().

## Solution

```javascript
class HeroRegistry {
  constructor({ db, cache, logger, bus }) {
    this.db = db; this.cache = cache;
    this.logger = logger; this.bus = bus;
  }
  async register(heroData) {
    this.logger.info('Registering hero');
    const hero = { id: Date.now(), ...heroData, registered: true };
    await this.db.save(hero);
    await this.cache.set(hero.id, hero);
    this.bus.emit('hero:registered', hero);
    return hero;
  }
  async get(id) {
    const cached = await this.cache.get(id);
    if (cached) { this.logger.debug('cache hit'); return cached; }
    this.logger.debug('cache miss');
    return this.db.findById(id);
  }
}

test('register hero', async () => {
  const db = { save: jest.fn().mockResolvedValue(undefined), findById: jest.fn() };
  const cache = { set: jest.fn().mockResolvedValue(undefined), get: jest.fn() };
  const logger = { info: jest.fn(), debug: jest.fn() };
  const bus = { emit: jest.fn() };
  const registry = new HeroRegistry({ db, cache, logger, bus });

  const hero = await registry.register({ name: 'Aria' });
  expect(hero.name).toBe('Aria');
  expect(hero.registered).toBe(true);
  expect(db.save).toHaveBeenCalledWith(expect.objectContaining({ name: 'Aria' }));
  expect(cache.set).toHaveBeenCalledWith(hero.id, hero);
  expect(bus.emit).toHaveBeenCalledWith('hero:registered', expect.objectContaining({ name: 'Aria' }));
  expect(logger.info).toHaveBeenCalledWith('Registering hero');
});

test('get — cache hit', async () => {
  const db = { findById: jest.fn(), save: jest.fn() };
  const cache = { get: jest.fn().mockResolvedValue({ id: 1, name: 'Aria' }), set: jest.fn() };
  const logger = { info: jest.fn(), debug: jest.fn() };
  const bus = { emit: jest.fn() };
  const registry = new HeroRegistry({ db, cache, logger, bus });

  const hero = await registry.get(1);
  expect(hero.name).toBe('Aria');
  expect(db.findById).not.toHaveBeenCalled();
  expect(logger.debug).toHaveBeenCalledWith('cache hit');
});
```

## Explanation

Complex mock setups with implementation per call:

```
const mockFn = jest.fn()
  .mockReturnValueOnce('first')   // first call returns 'first'
  .mockReturnValueOnce('second')  // second call returns 'second'
  .mockReturnValue('default');    // all subsequent calls

expect(mockFn()).toBe('first');
expect(mockFn()).toBe('second');
expect(mockFn()).toBe('default');
```

## Starter Code

```javascript
class HeroRegistry {
  constructor({ db, cache, logger, bus }) {
    this.db = db; this.cache = cache;
    this.logger = logger; this.bus = bus;
  }
  async register(heroData) {
    this.logger.info('Registering hero');
    const hero = { id: Date.now(), ...heroData, registered: true };
    await this.db.save(hero);
    await this.cache.set(hero.id, hero);
    this.bus.emit('hero:registered', hero);
    return hero;
  }
  async get(id) {
    const cached = await this.cache.get(id);
    if (cached) { this.logger.debug('cache hit'); return cached; }
    this.logger.debug('cache miss');
    return this.db.findById(id);
  }
}

test('register hero', async () => {
  const db = { save: jest.fn().mockResolvedValue(undefined), findById: jest.fn() };
  const cache = { set: jest.fn().mockResolvedValue(undefined), get: jest.fn() };
  const logger = { info: jest.fn(), debug: jest.fn() };
  const bus = { emit: jest.fn() };
  const registry = new HeroRegistry({ db, cache, logger, bus });

  const hero = await registry.register({ name: 'Aria' });

  // TODO: Assert that hero.name equals 'Aria' using .toBe().
  // TODO: Assert that hero.registered equals true using .toBe().
  // TODO: Assert that db.save was called with the expected arguments.
  // TODO: Assert that cache.set was called with the expected arguments.
  // TODO: Assert that bus.emit was called with the expected arguments.
  // TODO: Assert that logger.info was called with the expected arguments.
});

test('get — cache hit', async () => {
  const db = { findById: jest.fn(), save: jest.fn() };
  const cache = { get: jest.fn().mockResolvedValue({ id: 1, name: 'Aria' }), set: jest.fn() };
  const logger = { info: jest.fn(), debug: jest.fn() };
  const bus = { emit: jest.fn() };
  const registry = new HeroRegistry({ db, cache, logger, bus });

  const hero = await registry.get(1);

  // TODO: Assert that hero.name equals 'Aria' using .toBe().
  // TODO: Assert that db.findById was not called.
  // TODO: Assert that logger.debug was called with the expected arguments.
});
```
