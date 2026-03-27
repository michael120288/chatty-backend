# Pub/Sub with History

**Level:** 218
**ID:** `jest-218`
**XP:** 130
**Tags:** `pub/sub`, `history`, `event`, `mock`

## Objective

Test a pub/sub bus that replays event history to new subscribers.

## Story

The dungeon event bus replays missed events to new subscribers.

## Hints
1. Replaying sends past events to the new subscriber.
2. toHaveBeenCalledTimes(2) — both past events are replayed.
3. toHaveBeenCalledWith checks one specific call.

## Solution

```javascript
class HistoryBus{constructor(){this._subs={};this._history={};}publish(e,d){this._history[e]=this._history[e]||[];this._history[e].push(d);(this._subs[e]||[]).forEach(fn=>fn(d));}subscribe(e,fn,replay=false){this._subs[e]=this._subs[e]||[];this._subs[e].push(fn);if(replay)(this._history[e]||[]).forEach(fn);}}
test('replay on subscribe',()=>{const bus=new HistoryBus();bus.publish('hero',{name:'Alice'});bus.publish('hero',{name:'Bob'});const handler=jest.fn();bus.subscribe('hero',handler,true);expect(handler).toHaveBeenCalledTimes(2);expect(handler).toHaveBeenCalledWith({name:'Alice'});});
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
class HistoryBus {
  constructor() { this._subs = {}; this._history = {}; }
  publish(event, data) {
    this._history[event] = this._history[event] || [];
    this._history[event].push(data);
    (this._subs[event] || []).forEach(fn => fn(data));
  }
  subscribe(event, fn, replay = false) {
    this._subs[event] = this._subs[event] || [];
    this._subs[event].push(fn);
    if (replay) (this._history[event] || []).forEach(fn);
  }
}

test('replay on subscribe', () => {
  const bus = new HistoryBus();
  bus.publish('hero', { name: 'Alice' });
  bus.publish('hero', { name: 'Bob' });
  const handler = jest.fn();
  bus.subscribe('hero', handler, true);
  // TODO: Assert that handler was called exactly 2 times.
  // TODO: Assert that handler was called with the expected arguments.
});
```
