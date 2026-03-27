# Boss: Advanced Patterns

**Level:** 160
**ID:** `jest-160`
**XP:** 200
**Tags:** `boss`, `generator`, `closure`, `jest.fn`

## Objective

Combine a generator, memoization, and a jest.fn spy in one test suite.

## Story

160 levels mastered. The advanced patterns boss combines generators, closures, and mocks.

## Hints
1. ids() is an infinite generator — each call produces the next integer.
2. makeMemoCounter wraps it to track seen IDs.
3. jest.fn(counter) wraps counter to spy on its calls.

## Solution

```javascript
function* ids(){let n=1;while(true)yield n++;}
function makeMemoCounter(gen){const seen=new Set();return function(){const id=gen.next().value;const isNew=!seen.has(id);seen.add(id);return{id,isNew};};}
test('unique IDs',()=>{const counter=makeMemoCounter(ids());const spy=jest.fn(counter);const r1=spy();const r2=spy();expect(r1).toEqual({id:1,isNew:true});expect(r2).toEqual({id:2,isNew:true});expect(spy).toHaveBeenCalledTimes(2);});
```

## Explanation

Testing progress bar styles/calculations:

```
it('progress bar reflects partial completion', async () => {
  useProgress.mockReturnValue({ ...defaultProgress, completedLevels: ['jest-01'] });
  render(<GameHome />);
  await waitFor(() => expect(screen.getByText('Jest Unit Testing')).toBeInTheDocument());
  const jestCard = screen.getByText('Jest Unit Testing').closest('a');
  const fill = jestCard.querySelector('.tc-progress-fill');
  const expected = `${(1 / JEST_LEVELS.length) * 100}%`;
  expect(fill).toHaveStyle({ width: expected });
});
```

## Starter Code

```javascript
function* ids() {
  let n = 1;
  while (true) yield n++;
}

function makeMemoCounter(gen) {
  const seen = new Set();
  return function () {
    const id = gen.next().value;
    const isNew = !seen.has(id);
    seen.add(id);
    return { id, isNew };
  };
}

test('unique IDs', () => {
  const counter = makeMemoCounter(ids());
  const spy = jest.fn(counter);

  const r1 = spy();
  const r2 = spy();

  // TODO: Assert that r1 deeply equals the expected value using .toEqual().
  // TODO: Assert that r2 deeply equals the expected value using .toEqual().
  // TODO: Assert that spy was called exactly 2 times.
});
```
