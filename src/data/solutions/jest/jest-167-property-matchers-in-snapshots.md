# Property Matchers in Snapshots

**Level:** 167
**ID:** `jest-167`
**XP:** 120
**Tags:** `toMatchSnapshot`, `property matchers`, `dynamic fields`

## Objective

Use property matchers in toMatchSnapshot to ignore dynamic fields.

## Story

The dungeon log has a timestamp that changes every run. Snapshot with property matchers.

## Hints
1. Property matchers override specific keys in snapshot comparison.
2. expect.any(String) matches any string value.
3. The message field is still snapshotted exactly.

## Solution

```javascript
function createEntry(msg){return{message:msg,createdAt:new Date().toISOString(),id:Math.random()};}
test('entry snapshot with matchers',()=>{const e=createEntry('hero entered');expect(e).toMatchSnapshot({createdAt:expect.any(String),id:expect.any(Number)});});
```

## Explanation

Testing that filtered data renders correctly:

```
it('only counts jest- IDs toward jest completion', async () => {
  useProgress.mockReturnValue({
    ...defaultProgress,
    completedLevels: ['level-01', 'cy-01', 'jest-01'], // only jest-01 is jest
  });
  render(<GameHome />);
  await waitFor(() => expect(screen.getByText('Jest Unit Testing')).toBeInTheDocument());
  expect(screen.getByText(`1 / ${JEST_LEVELS.length} complete`)).toBeInTheDocument();
});
```

## Starter Code

```javascript
function createEntry(msg) {
  return { message: msg, createdAt: new Date().toISOString(), id: Math.random() };
}

test('entry snapshot with matchers', () => {
  const entry = createEntry('hero entered');
  expect(entry).toMatchSnapshot({
    // TODO: createdAt: expect.any(String),
    // TODO: id: expect.any(Number),
  });
});
```
