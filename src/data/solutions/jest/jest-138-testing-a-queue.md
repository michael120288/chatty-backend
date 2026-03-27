# Testing a Queue

**Level:** 138
**ID:** `jest-138`
**XP:** 120
**Tags:** `queue`, `class`, `data structure`

## Objective

Test a Queue class with enqueue, dequeue, and peek methods.

## Story

The dungeon uses a FIFO queue for scheduling hero turns. Test enqueue and dequeue.

## Hints
1. beforeEach creates a fresh queue for each test.
2. FIFO: first in, first out — Alice dequeues before Bob.
3. peek does not remove the item.

## Solution

```javascript
class Queue{constructor(){this._items=[];}enqueue(i){this._items.push(i);}dequeue(){return this._items.shift();}peek(){return this._items[0];}get size(){return this._items.length;}}
let q;
beforeEach(()=>{q=new Queue();});
test('enqueue and size',()=>{q.enqueue('Alice');q.enqueue('Bob');expect(q.size).toBe(2);});
test('dequeue FIFO',()=>{q.enqueue('Alice');q.enqueue('Bob');expect(q.dequeue()).toBe('Alice');expect(q.size).toBe(1);});
test('peek',()=>{q.enqueue('Carol');expect(q.peek()).toBe('Carol');expect(q.size).toBe(1);});
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
class Queue {
  constructor() { this._items = []; }
  enqueue(item) { this._items.push(item); }
  dequeue() { return this._items.shift(); }
  peek() { return this._items[0]; }
  get size() { return this._items.length; }
}

let q;
beforeEach(() => { q = new Queue(); });

test('enqueue and size', () => {
  q.enqueue('Alice');
  q.enqueue('Bob');
  // TODO: Assert that q.size equals 2 using .toBe().
});

test('dequeue FIFO', () => {
  q.enqueue('Alice');
  q.enqueue('Bob');
  // TODO: Assert that q.dequeue( equals 'Alice' using .toBe().
  // TODO: Assert that q.size equals 1 using .toBe().
});

test('peek', () => {
  q.enqueue('Carol');
  // TODO: Assert that q.peek( equals 'Carol' using .toBe().
  // TODO: Assert that q.size equals 1 using .toBe().
});
```
