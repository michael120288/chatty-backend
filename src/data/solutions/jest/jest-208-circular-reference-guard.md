# Circular Reference Guard

**Level:** 208
**ID:** `jest-208`
**XP:** 130
**Tags:** `DFS`, `cycle detection`, `graph`

## Objective

Test a DFS that detects circular references.

## Story

The dungeon hall graph could have cycles. Test the cycle detection guard.

## Hints
1. DFS with a visited Set detects if we revisit a node.
2. No cycle: A→B→C (stops).
3. Cycle: A→B→C→A (revisits A).

## Solution

```javascript
function hasCycle(g,n,v=new Set()){if(v.has(n))return true;v.add(n);for(const nb of g[n]||[]){if(hasCycle(g,nb,v))return true;}return false;}
test('no cycle',()=>{const g={A:['B'],B:['C'],C:[]};expect(hasCycle(g,'A')).toBe(false);});
test('has cycle',()=>{const g={A:['B'],B:['C'],C:['A']};expect(hasCycle(g,'A')).toBe(true);});
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
function hasCycle(graph, node, visited = new Set()) {
  if (visited.has(node)) return true;
  visited.add(node);
  for (const neighbour of graph[node] || []) {
    if (hasCycle(graph, neighbour, visited)) return true;
  }
  return false;
}

test('no cycle', () => {
  const graph = { A: ['B'], B: ['C'], C: [] };
  // TODO: Assert that hasCycle(graph, 'A' equals false using .toBe().
});

test('has cycle', () => {
  const graph = { A: ['B'], B: ['C'], C: ['A'] };
  // TODO: Assert that hasCycle(graph, 'A' equals true using .toBe().
});
```
