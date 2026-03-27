# Functional Lens Testing

**Level:** 219
**ID:** `jest-219`
**XP:** 130
**Tags:** `lens`, `functional`, `immutable`

## Objective

Test functional lens operations: get, set, and over (update).

## Story

Lenses provide composable getters and setters for nested state. Test them.

## Hints
1. get extracts the value.
2. set returns a new object with the value replaced (immutable).
3. over applies a function to the current value.

## Solution

```javascript
const lens=(getter,setter)=>({get:obj=>getter(obj),set:(val,obj)=>setter(val,obj),over:(fn,obj)=>setter(fn(getter(obj)),obj)});
const hpLens=lens(h=>h.hp,(val,h)=>({...h,hp:val}));
test('lens get',()=>{const hero={name:'Aria',hp:75};expect(hpLens.get(hero)).toBe(75);});
test('lens set',()=>{const hero={name:'Aria',hp:75};const u=hpLens.set(100,hero);expect(u.hp).toBe(100);expect(hero.hp).toBe(75);});
test('lens over — apply fn',()=>{const hero={name:'Aria',hp:75};const h=hpLens.over(hp=>Math.min(hp+20,100),hero);expect(h.hp).toBe(95);});
```

## Explanation

Testing React context consumers:

```
const wrapper = ({ children }) => (
  <GameContext.Provider value={{ solutions: {}, setSolution: jest.fn() }}>
    {children}
  </GameContext.Provider>
);
const { result } = renderHook(() => useGame(), { wrapper });
expect(result.current.solutions).toEqual({});
```

## Starter Code

```javascript
const lens = (getter, setter) => ({
  get: obj => getter(obj),
  set: (val, obj) => setter(val, obj),
  over: (fn, obj) => setter(fn(getter(obj)), obj),
});

const hpLens = lens(hero => hero.hp, (val, hero) => ({ ...hero, hp: val }));

test('lens get', () => {
  const hero = { name: 'Aria', hp: 75 };
  // TODO: Assert that hpLens.get(hero equals 75 using .toBe().
});

test('lens set', () => {
  const hero = { name: 'Aria', hp: 75 };
  const updated = hpLens.set(100, hero);
  // TODO: Assert that updated.hp equals 100 using .toBe().
  // TODO: Assert that hero.hp equals 75 using .toBe().
});

test('lens over — apply fn', () => {
  const hero = { name: 'Aria', hp: 75 };
  const healed = hpLens.over(hp => Math.min(hp + 20, 100), hero);
  // TODO: Assert that healed.hp equals 95 using .toBe().
});
```
