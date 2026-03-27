# Service Layer Pattern

**Level:** 179
**ID:** `jest-179`
**XP:** 140
**Tags:** `service`, `pattern`, `mock`, `async`

## Objective

Test a service class with multiple mocked dependencies.

## Story

The hero service orchestrates repository and notifications. Test the full service.

## Hints
1. expect.objectContaining ignores dynamic id from Date.now().
2. Both repo and notifier are mocked.
3. Verify the hero name and that both dependencies were called.

## Solution

```javascript
class HeroService{constructor(repo,n){this.repo=repo;this.notifier=n;}async createHero(data){const hero={id:Date.now(),...data};await this.repo.save(hero);await this.notifier.notify(`Hero ${hero.name} created`);return hero;}}
test('createHero',async()=>{const repo={save:jest.fn().mockResolvedValue(undefined)};const notifier={notify:jest.fn().mockResolvedValue(undefined)};const service=new HeroService(repo,notifier);const hero=await service.createHero({name:'Aria',hp:100});expect(hero.name).toBe('Aria');expect(repo.save).toHaveBeenCalledWith(expect.objectContaining({name:'Aria'}));expect(notifier.notify).toHaveBeenCalledWith('Hero Aria created');});
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
class HeroService {
  constructor(repo, notifier) {
    this.repo = repo;
    this.notifier = notifier;
  }
  async createHero(data) {
    const hero = { id: Date.now(), ...data };
    await this.repo.save(hero);
    await this.notifier.notify(`Hero ${hero.name} created`);
    return hero;
  }
}

test('createHero', async () => {
  const repo = { save: jest.fn().mockResolvedValue(undefined) };
  const notifier = { notify: jest.fn().mockResolvedValue(undefined) };
  const service = new HeroService(repo, notifier);

  const hero = await service.createHero({ name: 'Aria', hp: 100 });

  // TODO: Assert that hero.name equals 'Aria' using .toBe().
  // TODO: Assert that repo.save was called with the expected arguments.
  // TODO: Assert that notifier.notify was called with the expected arguments.
});
```
