# Testing a Cache

**Level:** 140
**ID:** `jest-140`
**XP:** 130
**Tags:** `cache`, `Map`, `class`

## Objective

Test a simple Map-based cache class.

## Story

The dungeon cache stores computed results. Test get, set, and has.

## Hints
1. Map.get returns the value or undefined.
2. Map.has returns a boolean.
3. toEqual for object values.

## Solution

```javascript
class Cache{constructor(){this._store=new Map();}set(k,v){this._store.set(k,v);}get(k){return this._store.get(k);}has(k){return this._store.has(k);}clear(){this._store.clear();}}
let cache;
beforeEach(()=>{cache=new Cache();});
test('set and get',()=>{cache.set('hero',{name:'Aria'});expect(cache.get('hero')).toEqual({name:'Aria'});});
test('has key',()=>{cache.set('spell','fire');expect(cache.has('spell')).toBe(true);expect(cache.has('missing')).toBe(false);});
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
class Cache {
  constructor() { this._store = new Map(); }
  set(key, value) { this._store.set(key, value); }
  get(key) { return this._store.get(key); }
  has(key) { return this._store.has(key); }
  clear() { this._store.clear(); }
}

let cache;
beforeEach(() => { cache = new Cache(); });

test('set and get', () => {
  cache.set('hero', { name: 'Aria' });
  // TODO: Assert that cache.get('hero' deeply equals the expected value using .toEqual().
});

test('has key', () => {
  cache.set('spell', 'fire');
  // TODO: Assert that cache.has('spell' equals true using .toBe().
  // TODO: Assert that cache.has('missing' equals false using .toBe().
});
```
