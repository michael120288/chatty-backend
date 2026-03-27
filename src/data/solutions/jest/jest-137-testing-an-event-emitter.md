# Testing an Event Emitter

**Level:** 137
**ID:** `jest-137`
**XP:** 130
**Tags:** `event emitter`, `jest.fn`, `pattern`

## Objective

Test an event emitter pattern with jest.fn listeners.

## Story

The dungeon bell rings events. Test that listeners fire when events are emitted.

## Hints
1. Register a jest.fn as the listener.
2. emit calls the listener with arguments.
3. Verify both the call and the argument.

## Solution

```javascript
class Bell{constructor(){this._listeners={};}on(e,fn){this._listeners[e]=this._listeners[e]||[];this._listeners[e].push(fn);}emit(e,...a){(this._listeners[e]||[]).forEach(fn=>fn(...a));}}
test('bell rings',()=>{const b=new Bell();const ring=jest.fn();b.on('ring',ring);b.emit('ring','loud');expect(ring).toHaveBeenCalledWith('loud');expect(ring).toHaveBeenCalledTimes(1);});
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
class Bell {
  constructor() { this._listeners = {}; }
  on(event, fn) {
    this._listeners[event] = this._listeners[event] || [];
    this._listeners[event].push(fn);
  }
  emit(event, ...args) {
    (this._listeners[event] || []).forEach(fn => fn(...args));
  }
}

test('bell rings', () => {
  const bell = new Bell();
  const ring = jest.fn();
  bell.on('ring', ring);
  bell.emit('ring', 'loud');
  // TODO: Assert that ring was called with the expected arguments.
  // TODO: Assert that ring was called exactly 1 times.
});
```
