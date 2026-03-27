# Cleanup with afterEach

**Level:** 135
**ID:** `jest-135`
**XP:** 110
**Tags:** `afterEach`, `cleanup`

## Objective

Use afterEach to clean up resources after each test.

## Story

After each battle, the arena must be cleared. Use afterEach for cleanup.

## Hints
1. afterEach runs after every test.
2. It guarantees cleanup regardless of test success/failure.
3. Order: beforeEach → test → afterEach.

## Solution

```javascript
const arena={active:false,events:[]};
beforeEach(()=>{arena.active=true;});
afterEach(()=>{arena.active=false;arena.events=[];});
test('arena is active',()=>{expect(arena.active).toBe(true);});
test('log an event',()=>{arena.events.push('hero entered');expect(arena.events).toHaveLength(1);});
test('arena resets between tests',()=>{expect(arena.events).toHaveLength(0);});
```

## Explanation

Testing navigation with `MemoryRouter` from `react-router-dom`:

```
import { MemoryRouter } from 'react-router-dom';

render(
  <MemoryRouter initialEntries={['/app/game/level-01']}>
    <Routes>
      <Route path="/app/game/:levelId" element={<Game />} />
    </Routes>
  </MemoryRouter>
);
```

## Starter Code

```javascript
const arena = { active: false, events: [] };

beforeEach(() => {
  arena.active = true;
});

afterEach(() => {
  arena.active = false;
  arena.events = [];
});

test('arena is active', () => {
  // TODO: Assert that arena.active equals true using .toBe().
});

test('log an event', () => {
  arena.events.push('hero entered');
  // TODO: Assert that arena.events has length 1.
});

test('arena resets between tests', () => {
  // TODO: Assert that arena.events has length 0.
});
```
