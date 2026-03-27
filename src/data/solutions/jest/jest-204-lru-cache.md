# LRU Cache

**Level:** 204
**ID:** `jest-204`
**XP:** 140
**Tags:** `LRU`, `cache`, `Map`, `algorithm`

## Objective

Test an LRU cache implementation with get and set.

## Story

The dungeon caches only the most recent 3 rooms. Test LRU eviction.

## Hints
1. Map preserves insertion order — oldest is first.
2. get() moves the accessed key to the end (most recent).
3. set() evicts the first (least recently used) key when full.

## Solution

```javascript
class LRUCache{constructor(c){this._cap=c;this._cache=new Map();}get(k){if(!this._cache.has(k))return -1;const v=this._cache.get(k);this._cache.delete(k);this._cache.set(k,v);return v;}set(k,v){if(this._cache.has(k))this._cache.delete(k);else if(this._cache.size>=this._cap){this._cache.delete(this._cache.keys().next().value);}this._cache.set(k,v);}}
test('lru eviction',()=>{const lru=new LRUCache(2);lru.set(1,'a');lru.set(2,'b');lru.get(1);lru.set(3,'c');expect(lru.get(2)).toBe(-1);expect(lru.get(1)).toBe('a');expect(lru.get(3)).toBe('c');});
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
class LRUCache {
  constructor(capacity) {
    this._cap = capacity;
    this._cache = new Map();
  }
  get(key) {
    if (!this._cache.has(key)) return -1;
    const val = this._cache.get(key);
    this._cache.delete(key);
    this._cache.set(key, val);
    return val;
  }
  set(key, value) {
    if (this._cache.has(key)) this._cache.delete(key);
    else if (this._cache.size >= this._cap) {
      this._cache.delete(this._cache.keys().next().value);
    }
    this._cache.set(key, value);
  }
}

test('lru eviction', () => {
  const lru = new LRUCache(2);
  lru.set(1, 'a');
  lru.set(2, 'b');
  lru.get(1); // access 1, making 2 the LRU
  lru.set(3, 'c'); // evicts 2
  // TODO: Assert that lru.get(2 equals -1 using .toBe().
  // TODO: Assert that lru.get(1 equals 'a' using .toBe().
  // TODO: Assert that lru.get(3 equals 'c' using .toBe().
});
```
