# Middleware Chain

**Level:** 216
**ID:** `jest-216`
**XP:** 130
**Tags:** `middleware`, `compose`, `chain`

## Objective

Test a compose-style middleware chain.

## Story

The dungeon request passes through a chain of middlewares. Test the pipeline.

## Hints
1. Middlewares execute like a stack: in order forward, reverse on the way back.
2. next() passes control to the next middleware.
3. toEqual for exact array order.

## Solution

```javascript
function compose(...mws){return function(ctx,next){let index=-1;function dispatch(i){if(i<=index)throw new Error('next() called multiple times');index=i;const fn=mws[i]||next;if(!fn)return;fn(ctx,()=>dispatch(i+1));}dispatch(0);}}
test('middleware chain executes in order',()=>{const log=[];const mw1=(ctx,next)=>{log.push('mw1 in');next();log.push('mw1 out');};const mw2=(ctx,next)=>{log.push('mw2 in');next();log.push('mw2 out');};const handler=compose(mw1,mw2);handler({},(()=>log.push('final')));expect(log).toEqual(['mw1 in','mw2 in','final','mw2 out','mw1 out']);});
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
function compose(...middlewares) {
  return function (context, next) {
    let index = -1;
    function dispatch(i) {
      if (i <= index) throw new Error('next() called multiple times');
      index = i;
      const fn = middlewares[i] || next;
      if (!fn) return;
      fn(context, () => dispatch(i + 1));
    }
    dispatch(0);
  };
}

test('middleware chain executes in order', () => {
  const log = [];
  const mw1 = (ctx, next) => { log.push('mw1 in'); next(); log.push('mw1 out'); };
  const mw2 = (ctx, next) => { log.push('mw2 in'); next(); log.push('mw2 out'); };
  const handler = compose(mw1, mw2);
  handler({}, () => log.push('final'));
  // TODO: Assert that log deeply equals the expected value using .toEqual().
});
```
