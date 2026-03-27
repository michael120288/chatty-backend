# State Machine

**Level:** 177
**ID:** `jest-177`
**XP:** 140
**Tags:** `state machine`, `class`, `transitions`

## Objective

Test a simple state machine with allowed and rejected transitions.

## Story

The dungeon door has states: locked, closed, open. Test valid and invalid transitions.

## Hints
1. locked → closed (unlock), closed → open (open), open → closed (close).
2. Invalid transitions throw.
3. toThrow('message') checks error message substring.

## Solution

```javascript
class Door{constructor(){this.state='locked';}unlock(){if(this.state!=='locked')throw new Error('Not locked');this.state='closed';}open(){if(this.state!=='closed')throw new Error('Not closed');this.state='open';}close(){if(this.state!=='open')throw new Error('Not open');this.state='closed';}}
test('valid sequence',()=>{const d=new Door();d.unlock();d.open();expect(d.state).toBe('open');});
test('invalid transition',()=>{const d=new Door();expect(()=>d.open()).toThrow('Not closed');});
```

## Explanation

Testing cleanup and mock restoration between tests:

```
describe('MyComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks();          // clear call history
    useMyHook.mockReturnValue(defaultState);
  });

  afterEach(() => {
    jest.restoreAllMocks();        // restore spied methods
  });
});
```

`jest.clearAllMocks()` — clears call counts and instances
`jest.resetAllMocks()` — also removes implementations
`jest.restoreAllMocks()` — restores spies to originals

## Starter Code

```javascript
class Door {
  constructor() { this.state = 'locked'; }
  unlock() {
    if (this.state !== 'locked') throw new Error('Not locked');
    this.state = 'closed';
  }
  open() {
    if (this.state !== 'closed') throw new Error('Not closed');
    this.state = 'open';
  }
  close() {
    if (this.state !== 'open') throw new Error('Not open');
    this.state = 'closed';
  }
}

test('valid sequence', () => {
  const door = new Door();
  door.unlock();
  door.open();
  // TODO: Assert that door.state equals 'open' using .toBe().
});

test('invalid transition', () => {
  const door = new Door();
  // TODO: Assert that the function throws the expected error using .toThrow().
});
```
