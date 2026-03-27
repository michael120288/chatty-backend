# Tree — BFS Traversal

**Level:** 205
**ID:** `jest-205`
**XP:** 140
**Tags:** `BFS`, `tree`, `algorithm`

## Objective

Test a BFS traversal that collects node values in order.

## Story

The dungeon is a tree of rooms. Traverse it breadth-first.

## Hints
1. BFS uses a queue — FIFO order.
2. Level 1: [1], Level 2: [2,3], Level 3: [4,5].
3. toEqual for array comparison.

## Solution

```javascript
function bfs(root){if(!root)return[];const result=[],queue=[root];while(queue.length){const node=queue.shift();result.push(node.val);if(node.left)queue.push(node.left);if(node.right)queue.push(node.right);}return result;}
const tree={val:1,left:{val:2,left:{val:4,left:null,right:null},right:null},right:{val:3,left:null,right:{val:5,left:null,right:null}}};
test('bfs order',()=>{expect(bfs(tree)).toEqual([1,2,3,4,5]);});
test('empty tree',()=>{expect(bfs(null)).toEqual([]);});
```

## Explanation

Testing React form interactions:

```
it('updates state on input change', async () => {
  render(<SearchForm />);
  const input = screen.getByRole('textbox', { name: /search/i });
  await userEvent.type(input, 'fireball');
  expect(input).toHaveValue('fireball');
});
```

## Starter Code

```javascript
function bfs(root) {
  if (!root) return [];
  const result = [], queue = [root];
  while (queue.length) {
    const node = queue.shift();
    result.push(node.val);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return result;
}

const tree = {
  val: 1,
  left: { val: 2, left: { val: 4, left: null, right: null }, right: null },
  right: { val: 3, left: null, right: { val: 5, left: null, right: null } },
};

test('bfs order', () => {
  // TODO: Assert that bfs(tree deeply equals the expected value using .toEqual().
});

test('empty tree', () => {
  // TODO: Assert that bfs(null deeply equals the expected value using .toEqual().
});
```
