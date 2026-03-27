# Repository Pattern

**Level:** 178
**ID:** `jest-178`
**XP:** 140
**Tags:** `repository`, `pattern`, `mock`, `async`

## Objective

Test a repository class with an injected mock data store.

## Story

The hero repository abstracts data storage. Test the repository with a mock data source.

## Hints
1. Inject the mock store via constructor (dependency injection).
2. mockResolvedValue for async store operations.
3. Verify both the return value and the store call.

## Solution

```javascript
class HeroRepository{constructor(s){this._store=s;}async findById(id){return this._store.get(id);}async save(h){return this._store.set(h.id,h);}}
test('findById',async()=>{const store={get:jest.fn().mockResolvedValue({id:1,name:'Aria'}),set:jest.fn()};const repo=new HeroRepository(store);const h=await repo.findById(1);expect(h).toEqual({id:1,name:'Aria'});expect(store.get).toHaveBeenCalledWith(1);});
test('save',async()=>{const store={get:jest.fn(),set:jest.fn().mockResolvedValue(undefined)};const repo=new HeroRepository(store);await repo.save({id:2,name:'Bob'});expect(store.set).toHaveBeenCalledWith(2,{id:2,name:'Bob'});});
```

## Explanation

Testing cleanup and mock restoration between tests:

```
describe('MyComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks();          // clear call history
    useMyHook.mockReturnValue(defaultState);
  });

  afterEach(() => {
    jest.restoreAllMocks();        // restore spied methods
  });
});
```

`jest.clearAllMocks()` — clears call counts and instances
`jest.resetAllMocks()` — also removes implementations
`jest.restoreAllMocks()` — restores spies to originals

## Starter Code

```javascript
class HeroRepository {
  constructor(store) { this._store = store; }
  async findById(id) { return this._store.get(id); }
  async save(hero) { return this._store.set(hero.id, hero); }
}

test('findById', async () => {
  const store = {
    get: jest.fn().mockResolvedValue({ id: 1, name: 'Aria' }),
    set: jest.fn(),
  };
  const repo = new HeroRepository(store);
  const hero = await repo.findById(1);
  // TODO: Assert that hero deeply equals the expected value using .toEqual().
  // TODO: Assert that store.get was called with the expected arguments.
});

test('save', async () => {
  const store = { get: jest.fn(), set: jest.fn().mockResolvedValue(undefined) };
  const repo = new HeroRepository(store);
  await repo.save({ id: 2, name: 'Bob' });
  // TODO: Assert that store.set was called with the expected arguments.
});
```
