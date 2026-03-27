# Your First Snapshot

**Level:** 63
**ID:** `jest-63`
**XP:** 110
**Tags:** `toMatchSnapshot`, `snapshot`

## Objective

Use toMatchSnapshot() to capture and compare output.

## Story

The wizard wants to freeze time and compare past vs present. Snapshot testing saves the day.

## Hints
1. toMatchSnapshot() saves output on first run and compares on subsequent runs.
2. If snapshot changes intentionally, run jest --updateSnapshot.
3. Works with strings, objects, arrays.

## Solution

```javascript
function greet(n){return`Hello, ${n}!`;}
test('greet snapshot',()=>{expect(greet('World')).toMatchSnapshot();});
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
function greet(name) {
  return `Hello, ${name}!`;
}

test('greet snapshot', () => {
  // TODO: Assert that greet('World' matches the snapshot.
});
```
