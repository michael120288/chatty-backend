# Recursive Data Testing

**Level:** 207
**ID:** `jest-207`
**XP:** 130
**Tags:** `recursive`, `tree`, `data structure`

## Objective

Test a recursive function that traverses nested objects.

## Story

The dungeon has nested categories. Test a recursive category tree.

## Hints
1. Recursive reduce counts all descendants.
2. Root(1) + a(1) + a1(1) + b(1) = 4.
3. Leaf: 1 + 0 (no children) = 1.

## Solution

```javascript
function countNodes(t){if(!t)return 0;return 1+(t.children||[]).reduce((s,c)=>s+countNodes(c),0);}
const tree={name:'root',children:[{name:'a',children:[{name:'a1',children:[]}]},{name:'b',children:[]}]};
test('count nodes',()=>{expect(countNodes(tree)).toBe(4);});
test('leaf node',()=>{expect(countNodes({name:'leaf',children:[]})).toBe(1);});
```

## Explanation

Testing multi-step user flows:

```
it('completes the full registration flow', async () => {
  render(<RegistrationFlow />);
  await userEvent.type(screen.getByLabelText('Username'), 'aria');
  await userEvent.type(screen.getByLabelText('Password'), 'secret123');
  await userEvent.click(screen.getByRole('button', { name: 'Create Account' }));
  await waitFor(() =>
    expect(screen.getByText('Account created!')).toBeInTheDocument()
  );
});
```

## Starter Code

```javascript
function countNodes(tree) {
  if (!tree) return 0;
  return 1 + (tree.children || []).reduce((sum, child) => sum + countNodes(child), 0);
}

const tree = {
  name: 'root',
  children: [
    { name: 'a', children: [{ name: 'a1', children: [] }] },
    { name: 'b', children: [] },
  ],
};

test('count nodes', () => {
  // TODO: Assert that countNodes(tree equals 4 using .toBe().
});

test('leaf node', () => {
  // TODO: Assert that countNodes({ name: 'leaf', children: [] } equals 1 using .toBe().
});
```
