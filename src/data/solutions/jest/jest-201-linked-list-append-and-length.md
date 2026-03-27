# Linked List — append and length

**Level:** 201
**ID:** `jest-201`
**XP:** 130
**Tags:** `linked list`, `data structure`

## Objective

Test a singly linked list with append and size.

## Story

The dungeon chain of rooms forms a linked list. Test append and length.

## Hints
1. append traverses to the end before adding.
2. head.next.val accesses the second node.
3. size is tracked internally.

## Solution

```javascript
class Node{constructor(v){this.val=v;this.next=null;}}
class LinkedList{constructor(){this.head=null;this._size=0;}append(v){const n=new Node(v);if(!this.head){this.head=n;}else{let c=this.head;while(c.next)c=c.next;c.next=n;}this._size++;}get size(){return this._size;}}
let list;
beforeEach(()=>{list=new LinkedList();});
test('empty list',()=>{expect(list.size).toBe(0);expect(list.head).toBeNull();});
test('append items',()=>{list.append(1);list.append(2);list.append(3);expect(list.size).toBe(3);expect(list.head.val).toBe(1);expect(list.head.next.val).toBe(2);});
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
class Node { constructor(val) { this.val = val; this.next = null; } }

class LinkedList {
  constructor() { this.head = null; this._size = 0; }
  append(val) {
    const node = new Node(val);
    if (!this.head) { this.head = node; }
    else { let cur = this.head; while (cur.next) cur = cur.next; cur.next = node; }
    this._size++;
  }
  get size() { return this._size; }
}

let list;
beforeEach(() => { list = new LinkedList(); });

test('empty list', () => {
  // TODO: Assert that list.size equals 0 using .toBe().
  // TODO: Assert that list.head is null.
});

test('append items', () => {
  list.append(1); list.append(2); list.append(3);
  // TODO: Assert that list.size equals 3 using .toBe().
  // TODO: Assert that list.head.val equals 1 using .toBe().
  // TODO: Assert that list.head.next.val equals 2 using .toBe().
});
```
