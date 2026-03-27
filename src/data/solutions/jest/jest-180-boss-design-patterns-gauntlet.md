# Boss: Design Patterns Gauntlet

**Level:** 180
**ID:** `jest-180`
**XP:** 250
**Tags:** `boss`, `observer`, `repository`, `service`, `mock`

## Objective

Wire together observer, repository, and service patterns with full mock coverage.

## Story

180 levels. The design patterns gauntlet — combine observer, repository, and service.

## Hints
1. Wire: store mock → repo → service + emitter.
2. createdHandler is a jest.fn subscribed to the emitter.
3. expect.objectContaining ignores the id field.

## Solution

```javascript
class Emitter{constructor(){this._h={};}on(e,fn){this._h[e]=fn;}emit(e,d){if(this._h[e])this._h[e](d);}}
class QuestRepo{constructor(s){this._store=s;}async save(q){return this._store.set(q.id,q);}async find(id){return this._store.get(id);}}
class QuestService{constructor(repo,emitter){this.repo=repo;this.emitter=emitter;}async create(data){const quest={id:1,...data};await this.repo.save(quest);this.emitter.emit('quest:created',quest);return quest;}}
test('full quest creation flow',async()=>{const store={set:jest.fn().mockResolvedValue(undefined),get:jest.fn()};const emitter=new Emitter();const createdHandler=jest.fn();emitter.on('quest:created',createdHandler);const repo=new QuestRepo(store);const service=new QuestService(repo,emitter);const quest=await service.create({name:'Dragon Hunt'});expect(quest.name).toBe('Dragon Hunt');expect(store.set).toHaveBeenCalledWith(1,expect.objectContaining({name:'Dragon Hunt'}));expect(createdHandler).toHaveBeenCalledWith(expect.objectContaining({name:'Dragon Hunt'}));});
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
class Emitter {
  constructor() { this._h = {}; }
  on(e, fn) { this._h[e] = fn; }
  emit(e, d) { if (this._h[e]) this._h[e](d); }
}

class QuestRepo {
  constructor(store) { this._store = store; }
  async save(q) { return this._store.set(q.id, q); }
  async find(id) { return this._store.get(id); }
}

class QuestService {
  constructor(repo, emitter) { this.repo = repo; this.emitter = emitter; }
  async create(data) {
    const quest = { id: 1, ...data };
    await this.repo.save(quest);
    this.emitter.emit('quest:created', quest);
    return quest;
  }
}

test('full quest creation flow', async () => {
  const store = { set: jest.fn().mockResolvedValue(undefined), get: jest.fn() };
  const emitter = new Emitter();
  const createdHandler = jest.fn();
  emitter.on('quest:created', createdHandler);

  const repo = new QuestRepo(store);
  const service = new QuestService(repo, emitter);

  const quest = await service.create({ name: 'Dragon Hunt' });

  // TODO: Assert that quest.name equals 'Dragon Hunt' using .toBe().
  // TODO: Assert that store.set was called with the expected arguments.
  // TODO: Assert that createdHandler was called with the expected arguments.
});
```
