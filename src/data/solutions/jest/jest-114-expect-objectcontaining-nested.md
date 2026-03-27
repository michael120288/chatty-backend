# expect.objectContaining Nested

**Level:** 114
**ID:** `jest-114`
**XP:** 120
**Tags:** `expect.objectContaining`, `nested`, `array`

## Objective

Use expect.objectContaining inside toEqual for array elements.

## Story

The hero's nested stats only need partial verification. Use objectContaining inside an array.

## Hints
1. expect.objectContaining works inside arrays.
2. It ignores extra keys on each element.
3. Combine with expect.arrayContaining for any-order matching.

## Solution

```javascript
const team=[{name:'Alice',stats:{hp:100,mp:50}},{name:'Bob',stats:{hp:80,mp:70}}];
test('team members partial match',()=>{expect(team).toEqual([expect.objectContaining({name:'Alice'}),expect.objectContaining({name:'Bob'})]);});
```

## Explanation

Testing error boundaries and error states:

```
it('shows error when API fails', async () => {
  jest.spyOn(api, 'fetchLevels').mockRejectedValue(new Error('Network error'));
  render(<GameHome />);
  await waitFor(() =>
    expect(screen.getByText(/Failed to load.*Network error/)).toBeInTheDocument()
  );
});
```

## Starter Code

```javascript
const team = [
  { name: 'Alice', stats: { hp: 100, mp: 50 } },
  { name: 'Bob', stats: { hp: 80, mp: 70 } },
];

test('team members partial match', () => {
  expect(team).toEqual([
    // TODO: expect.objectContaining({ name: 'Alice' }),
    // TODO: expect.objectContaining({ name: 'Bob' }),
  ]);
});
```
