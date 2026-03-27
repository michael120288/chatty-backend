# expect.objectContaining()

**Level:** 54
**ID:** `jest-54`
**XP:** 150
**Tags:** `objectContaining`, `partial`, `matchers`

## Objective

Use expect.objectContaining() to do partial object matching inside assertions.

## Story

The hero's stats object has many fields. Only assert on the ones you care about.

## Hints
1. expect.objectContaining({...}) — passes if the object contains those keys with those values.
2. Extra keys in the received object are ignored.
3. Useful when objects have dynamic fields like timestamps.

## Solution

```javascript
function createHero(name){return{name,hp:100,mp:50,level:1,createdAt:new Date().toISOString()};}
test('hero has name and level',()=>{const h=createHero('Aragorn');expect(h).toEqual(expect.objectContaining({name:'Aragorn',level:1}));});
```

## Explanation

Timer mocks: `jest.useFakeTimers()` replaces `setTimeout`, `setInterval`, and `Date`.

```
jest.useFakeTimers();
const callback = jest.fn();
setTimeout(callback, 1000);

jest.advanceTimersByTime(999);
expect(callback).not.toHaveBeenCalled();

jest.advanceTimersByTime(1);
expect(callback).toHaveBeenCalledTimes(1);

jest.useRealTimers(); // restore after test
```

## Starter Code

```javascript
function createHero(name) {
  return {
    name,
    hp: 100,
    mp: 50,
    level: 1,
    createdAt: new Date().toISOString()
  };
}

test('hero has name and level', () => {
  const hero = createHero('Aragorn');
  // TODO: Assert that hero deeply equals the expected value using .toEqual().
});
```
