# Pipeline Integration Test

**Level:** 193
**ID:** `jest-193`
**XP:** 130
**Tags:** `pipeline`, `integration`, `mock`

## Objective

Test a multi-step data pipeline with mocks at the persistence layer.

## Story

Data flows through transform, validate, save. Test the pipeline end to end.

## Hints
1. transform normalises: trim name, parse level as Number.
2. validate throws for empty name.
3. store.save receives the transformed hero.

## Solution

```javascript
function transform(r){return{name:r.name.trim(),level:Number(r.level)};}
function validate(h){if(!h.name)throw new Error('Empty name');return h;}
async function pipeline(raw,store){const h=validate(transform(raw));return store.save(h);}
test('full pipeline',async()=>{const store={save:jest.fn().mockImplementation(async h=>({id:99,...h}))};const r=await pipeline({name:'  Aria  ',level:'5'},store);expect(r).toEqual({id:99,name:'Aria',level:5});expect(store.save).toHaveBeenCalledWith({name:'Aria',level:5});});
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
function transform(raw) {
  return { name: raw.name.trim(), level: Number(raw.level) };
}

function validate(hero) {
  if (!hero.name) throw new Error('Empty name');
  return hero;
}

async function pipeline(raw, store) {
  const hero = validate(transform(raw));
  return store.save(hero);
}

test('full pipeline', async () => {
  const store = { save: jest.fn().mockImplementation(async h => ({ id: 99, ...h })) };
  const result = await pipeline({ name: '  Aria  ', level: '5' }, store);
  // TODO: Assert that result deeply equals the expected value using .toEqual().
  // TODO: Assert that store.save was called with the expected arguments.
});
```
