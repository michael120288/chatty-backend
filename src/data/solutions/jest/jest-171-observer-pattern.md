# Observer Pattern

**Level:** 171
**ID:** `jest-171`
**XP:** 130
**Tags:** `observer`, `pub/sub`, `jest.fn`

## Objective

Test a simple pub/sub observer implementation.

## Story

The dungeon notifies all subscribers when an event fires. Test the observer pattern.

## Hints
1. Both handlers receive the same data.
2. Use jest.fn() for each subscriber.
3. toHaveBeenCalledWith checks the argument.

## Solution

```javascript
class EventBus{constructor(){this._handlers={};}subscribe(e,fn){this._handlers[e]=this._handlers[e]||[];this._handlers[e].push(fn);}publish(e,d){(this._handlers[e]||[]).forEach(fn=>fn(d));}}
test('observer receives event',()=>{const bus=new EventBus();const h=jest.fn();bus.subscribe('quest',h);bus.publish('quest',{id:1});expect(h).toHaveBeenCalledWith({id:1});});
test('multiple subscribers',()=>{const bus=new EventBus();const h1=jest.fn();const h2=jest.fn();bus.subscribe('quest',h1);bus.subscribe('quest',h2);bus.publish('quest','start');expect(h1).toHaveBeenCalledWith('start');expect(h2).toHaveBeenCalledWith('start');});
```

## Explanation

Testing with `screen.queryBy*` (doesn't throw when element is missing):

```
// getBy* — throws if not found (use for elements that MUST be present)
screen.getByText('Welcome');

// queryBy* — returns null if not found (use for elements that might be absent)
expect(screen.queryByText('Error')).not.toBeInTheDocument();

// findBy* — returns promise, waits for element (use for async appearance)
const el = await screen.findByText('Loaded!');
```

## Starter Code

```javascript
class EventBus {
  constructor() { this._handlers = {}; }
  subscribe(event, fn) {
    this._handlers[event] = this._handlers[event] || [];
    this._handlers[event].push(fn);
  }
  publish(event, data) {
    (this._handlers[event] || []).forEach(fn => fn(data));
  }
}

test('observer receives event', () => {
  const bus = new EventBus();
  const handler = jest.fn();
  bus.subscribe('quest', handler);
  bus.publish('quest', { id: 1 });
  // TODO: Assert that handler was called with the expected arguments.
});

test('multiple subscribers', () => {
  const bus = new EventBus();
  const h1 = jest.fn();
  const h2 = jest.fn();
  bus.subscribe('quest', h1);
  bus.subscribe('quest', h2);
  bus.publish('quest', 'start');
  // TODO: Assert that h1 was called with the expected arguments.
  // TODO: Assert that h2 was called with the expected arguments.
});
```
