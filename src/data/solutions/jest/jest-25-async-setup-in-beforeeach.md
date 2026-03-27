# Async Setup in beforeEach

**Level:** 25
**ID:** `jest-25`
**XP:** 150
**Tags:** `beforeEach`, `async`, `setup`

## Objective

Use async beforeEach to await setup before each test.

## Story

Each battle requires async preparation — loading the arena. Use async beforeEach.

## Hints
1. Mark beforeEach as async and use await inside it.
2. Jest waits for the promise to resolve before running tests.
3. This pattern is common for DB connections or API calls in tests.

## Solution

```javascript
let arena;
async function loadArena(){return Promise.resolve({name:'Fire Pit',ready:true});}
beforeEach(async()=>{arena=await loadArena();});
test('arena is ready',()=>{expect(arena.ready).toBe(true);});
test('arena name is Fire Pit',()=>{expect(arena.name).toBe('Fire Pit');});
```

## Explanation

`jest.spyOn(object, 'methodName')` wraps an existing method to track calls while keeping the original implementation.

```
const spy = jest.spyOn(console, 'log');
console.log('hello');
expect(spy).toHaveBeenCalledWith('hello');
spy.mockRestore(); // restore original
```

Use `spy.mockImplementation(fn)` to change the behaviour, or `spy.mockReturnValue(val)` to stub the return.

## Starter Code

```javascript
let arena;

async function loadArena() {
  return Promise.resolve({ name: 'Fire Pit', ready: true });
}

beforeEach(async () => {
  // TODO: arena = await loadArena()
});

test('arena is ready', () => {
  expect(arena.ready).toBe(true);
});

test('arena name is Fire Pit', () => {
  expect(arena.name).toBe('Fire Pit');
});
```
