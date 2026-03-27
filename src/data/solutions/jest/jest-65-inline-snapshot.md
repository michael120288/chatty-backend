# Inline Snapshot

**Level:** 65
**ID:** `jest-65`
**XP:** 120
**Tags:** `toMatchInlineSnapshot`, `snapshot`

## Objective

Use toMatchInlineSnapshot() with the expected string inline.

## Story

The scribe wants the expected value written right in the scroll. Use inline snapshots.

## Hints
1. toMatchInlineSnapshot(`"OK"`) — value goes directly in the test file.
2. Jest auto-fills the argument on first run if you leave it empty.
3. Backtick template literal wraps the expected serialised string.

## Solution

```javascript
function status(c){return c===200?'OK':'Error';}
test('status inline snapshot',()=>{expect(status(200)).toMatchInlineSnapshot(`"OK"`);});
```

## Explanation

Snapshot testing captures the rendered output of a component and stores it in a `.snap` file.

```
import { render } from '@testing-library/react';
it('renders correctly', () => {
  const { container } = render(<Button label="Click me" />);
  expect(container).toMatchSnapshot();
});
```

On first run, Jest creates the snapshot. On subsequent runs, it compares. Update with `jest --updateSnapshot`.

## Starter Code

```javascript
function status(code) {
  return code === 200 ? 'OK' : 'Error';
}

test('status inline snapshot', () => {
  // TODO: Assert that status(200 matches the inline snapshot.
});
```
