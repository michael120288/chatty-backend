# toMatchObject Partial

**Level:** 113
**ID:** `jest-113`
**XP:** 110
**Tags:** `toMatchObject`, `partial`

## Objective

Use toMatchObject() to partially match an object.

## Story

The quest report has many fields. Only verify the critical ones with toMatchObject.

## Hints
1. toMatchObject only checks the specified keys.
2. Extra keys in the received object are ignored.
3. Useful when you only care about a subset of properties.

## Solution

```javascript
const r={id:42,status:'complete',reward:500,completedAt:'2024-01-15',hero:'Alice'};
test('report has key fields',()=>{expect(r).toMatchObject({status:'complete',reward:500});});
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
const report = {
  id: 42,
  status: 'complete',
  reward: 500,
  completedAt: '2024-01-15',
  hero: 'Alice',
};

test('report has key fields', () => {
  // TODO: Assert that report matches the expected object shape using .toMatchObject().
});
```
