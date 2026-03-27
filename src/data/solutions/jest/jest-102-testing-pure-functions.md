# Testing Pure Functions

**Level:** 102
**ID:** `jest-102`
**XP:** 100
**Tags:** `pure functions`, `basics`

## Objective

Write tests for three pure utility functions.

## Story

Pure functions are the easiest to test — same input, same output, no side effects.

## Hints
1. Pure functions: no side effects, deterministic output.
2. Each test should have a clear input → expected output.
3. Group pure util tests with describe for organisation.

## Solution

```javascript
const add=(a,b)=>a+b;const square=n=>n*n;const capitalize=s=>s.charAt(0).toUpperCase()+s.slice(1);
test('add',()=>{expect(add(2,3)).toBe(5);});
test('square',()=>{expect(square(4)).toBe(16);});
test('capitalize',()=>{expect(capitalize('hello')).toBe('Hello');});
```

## Explanation

Testing Redux-connected components with `@reduxjs/toolkit`:

```
import { render } from '../../test-utils'; // custom render with store
render(<GameHome />, { preloadedState: { game: { levels: [], loading: false } } });
expect(screen.getByText('Loading levels...')).not.toBeInTheDocument();
```

Wrap renders with a custom `render` that provides a real Redux store — avoids brittle mocking.

## Starter Code

```javascript
const add = (a, b) => a + b;
const square = n => n * n;
const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1);

test('add', () => {
  // TODO: Assert that add(2, 3 equals 5 using .toBe().
});

test('square', () => {
  // TODO: Assert that square(4 equals 16 using .toBe().
});

test('capitalize', () => {
  // TODO: Assert that capitalize('hello' equals 'Hello' using .toBe().
});
```
