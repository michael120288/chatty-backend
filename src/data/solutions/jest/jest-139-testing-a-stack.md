# Testing a Stack

**Level:** 139
**ID:** `jest-139`
**XP:** 120
**Tags:** `stack`, `class`, `LIFO`

## Objective

Test a Stack class with push, pop, and isEmpty.

## Story

The dungeon stores moves in a LIFO stack. Test push, pop, and isEmpty.

## Hints
1. LIFO: last in, first out — move2 pops before move1.
2. isEmpty getter returns a boolean.
3. peek does not remove the top item.

## Solution

```javascript
class Stack{constructor(){this._items=[];}push(i){this._items.push(i);}pop(){return this._items.pop();}peek(){return this._items[this._items.length-1];}get isEmpty(){return this._items.length===0;}}
let stack;
beforeEach(()=>{stack=new Stack();});
test('empty initially',()=>{expect(stack.isEmpty).toBe(true);});
test('push and pop LIFO',()=>{stack.push('move1');stack.push('move2');expect(stack.pop()).toBe('move2');});
test('peek top',()=>{stack.push('spell');expect(stack.peek()).toBe('spell');expect(stack.isEmpty).toBe(false);});
```

## Explanation

Testing `<Link>` components in React Router:

```
render(<LevelHeader level={LEVEL} />);
const link = screen.getByText(/← Back to Track/).closest('a');
expect(link).toHaveAttribute('href', '/app/game/track/cypress-ui');
```

`closest('a')` traverses up the DOM tree to find the nearest ancestor `<a>` tag — useful when the text is inside a child span.

## Starter Code

```javascript
class Stack {
  constructor() { this._items = []; }
  push(item) { this._items.push(item); }
  pop() { return this._items.pop(); }
  peek() { return this._items[this._items.length - 1]; }
  get isEmpty() { return this._items.length === 0; }
}

let stack;
beforeEach(() => { stack = new Stack(); });

test('empty initially', () => {
  // TODO: Assert that stack.isEmpty equals true using .toBe().
});

test('push and pop LIFO', () => {
  stack.push('move1');
  stack.push('move2');
  // TODO: Assert that stack.pop( equals 'move2' using .toBe().
});

test('peek top', () => {
  stack.push('spell');
  // TODO: Assert that stack.peek( equals 'spell' using .toBe().
  // TODO: Assert that stack.isEmpty equals false using .toBe().
});
```
