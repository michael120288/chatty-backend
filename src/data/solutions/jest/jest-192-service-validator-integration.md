# Service + Validator Integration

**Level:** 192
**ID:** `jest-192`
**XP:** 130
**Tags:** `integration`, `validator`, `service`, `mock`

## Objective

Test a service that calls a validator and repository together.

## Story

The hero registration service validates before saving. Test the integration.

## Hints
1. validate() throws synchronously, so rejects.toThrow works on the async wrapper.
2. repo.save should not be called if validation fails.
3. Combine sync validation with async persistence.

## Solution

```javascript
function validate(h){if(!h.name)throw new Error('Name required');if(h.level<1)throw new Error('Level must be at least 1');return true;}
async function registerHero(h,repo){validate(h);return repo.save(h);}
test('register valid hero',async()=>{const repo={save:jest.fn().mockResolvedValue({id:1,name:'Aria'})};const r=await registerHero({name:'Aria',level:5},repo);expect(r).toEqual({id:1,name:'Aria'});expect(repo.save).toHaveBeenCalledTimes(1);});
test('invalid hero throws',async()=>{const repo={save:jest.fn()};await expect(registerHero({name:'',level:1},repo)).rejects.toThrow('Name required');expect(repo.save).not.toHaveBeenCalled();});
```

## Explanation

Testing hook state with `mockReturnValue` for different scenarios:

```
it('shows 100% progress when all completed', async () => {
  useProgress.mockReturnValue({
    ...defaultProgress,
    completedLevels: JEST_LEVELS.map(l => l.id),
  });
  render(<GameHome />);
  await waitFor(() => expect(screen.getByText('Jest Unit Testing')).toBeInTheDocument());
  const fill = screen.getByText('Jest Unit Testing').closest('a').querySelector('.fill');
  expect(fill).toHaveStyle({ width: '100%' });
});
```

## Starter Code

```javascript
function validate(hero) {
  if (!hero.name) throw new Error('Name required');
  if (hero.level < 1) throw new Error('Level must be at least 1');
  return true;
}

async function registerHero(hero, repo) {
  validate(hero);
  return repo.save(hero);
}

test('register valid hero', async () => {
  const repo = { save: jest.fn().mockResolvedValue({ id: 1, name: 'Aria' }) };
  const result = await registerHero({ name: 'Aria', level: 5 }, repo);
  // TODO: Assert that result deeply equals the expected value using .toEqual().
  // TODO: Assert that repo.save was called exactly 1 times.
});

test('invalid hero throws', async () => {
  const repo = { save: jest.fn() };
  // TODO: Assert that the function throws the expected error.
  // TODO: Assert that repo.save was not called.
});
```
