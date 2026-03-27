# Proxy Testing

**Level:** 159
**ID:** `jest-159`
**XP:** 130
**Tags:** `Proxy`, `pattern`

## Objective

Test a Proxy that logs property access via get trap.

## Story

The dungeon uses a Proxy to track property access. Test the tracking.

## Hints
1. Proxy get trap fires on every property access.
2. Access hero.name then hero.hp to trigger the trap.
3. toEqual compares the log array.

## Solution

```javascript
function makeTracked(t,l){return new Proxy(t,{get(o,k){l.push(k);return o[k];}});}
test('tracks access',()=>{const log=[];const hero=makeTracked({name:'Aria',hp:100},log);const _=hero.name;const __=hero.hp;expect(log).toEqual(['name','hp']);});
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
function makeTracked(target, accessLog) {
  return new Proxy(target, {
    get(obj, key) {
      accessLog.push(key);
      return obj[key];
    }
  });
}

test('tracks access', () => {
  const log = [];
  const hero = makeTracked({ name: 'Aria', hp: 100 }, log);
  const _ = hero.name;
  const __ = hero.hp;
  // TODO: Assert that log deeply equals the expected value using .toEqual().
});
```
