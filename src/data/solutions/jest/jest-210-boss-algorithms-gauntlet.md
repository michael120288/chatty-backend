# Boss: Algorithms Gauntlet

**Level:** 210
**ID:** `jest-210`
**XP:** 300
**Tags:** `boss`, `LRU`, `binary search`, `mock`, `cache`

## Objective

Combine LRU cache, binary search, and mock logging in one suite.

## Story

210 levels complete. The algorithms gauntlet — data structures, memoization, and mocks.

## Hints
1. First search(5) is a miss — binary search runs.
2. Second search(5) is a hit — returns cached result.
3. Verify both logger.miss and logger.hit call counts.

## Solution

```javascript
class SearchCache{constructor(c,l){this._lru=new Map();this._cap=c;this._log=l;}search(a,t){if(this._lru.has(t)){this._log.hit(t);return this._lru.get(t);}let lo=0,hi=a.length-1,result=-1;while(lo<=hi){const mid=Math.floor((lo+hi)/2);if(a[mid]===t){result=mid;break;}if(a[mid]<t)lo=mid+1;else hi=mid-1;}this._log.miss(t);if(this._lru.size>=this._cap)this._lru.delete(this._lru.keys().next().value);this._lru.set(t,result);return result;}}
test('cache miss then hit',()=>{const logger={hit:jest.fn(),miss:jest.fn()};const sc=new SearchCache(2,logger);const arr=[1,3,5,7,9];const r1=sc.search(arr,5);const r2=sc.search(arr,5);expect(r1).toBe(2);expect(r2).toBe(2);expect(logger.miss).toHaveBeenCalledTimes(1);expect(logger.hit).toHaveBeenCalledTimes(1);});
```

## Explanation

Testing multi-step user flows:

```
it('completes the full registration flow', async () => {
  render(<RegistrationFlow />);
  await userEvent.type(screen.getByLabelText('Username'), 'aria');
  await userEvent.type(screen.getByLabelText('Password'), 'secret123');
  await userEvent.click(screen.getByRole('button', { name: 'Create Account' }));
  await waitFor(() =>
    expect(screen.getByText('Account created!')).toBeInTheDocument()
  );
});
```

## Starter Code

```javascript
class SearchCache {
  constructor(capacity, logger) {
    this._lru = new Map();
    this._cap = capacity;
    this._log = logger;
  }
  search(sortedArr, target) {
    if (this._lru.has(target)) {
      this._log.hit(target);
      return this._lru.get(target);
    }
    let lo = 0, hi = sortedArr.length - 1;
    let result = -1;
    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      if (sortedArr[mid] === target) { result = mid; break; }
      if (sortedArr[mid] < target) lo = mid + 1;
      else hi = mid - 1;
    }
    this._log.miss(target);
    if (this._lru.size >= this._cap) this._lru.delete(this._lru.keys().next().value);
    this._lru.set(target, result);
    return result;
  }
}

test('cache miss then hit', () => {
  const logger = { hit: jest.fn(), miss: jest.fn() };
  const sc = new SearchCache(2, logger);
  const arr = [1, 3, 5, 7, 9];

  const r1 = sc.search(arr, 5); // miss
  const r2 = sc.search(arr, 5); // hit

  // TODO: Assert that r1 equals 2 using .toBe().
  // TODO: Assert that r2 equals 2 using .toBe().
  // TODO: Assert that logger.miss was called exactly 1 times.
  // TODO: Assert that logger.hit was called exactly 1 times.
});
```
