# Branch Coverage

**Level:** 101
**ID:** `jest-101`
**XP:** 110
**Tags:** `coverage`, `branch`, `if/else`

## Objective

Write tests for both branches of an if/else.

## Story

Every path through the enchanted gate must be tested — true and false branches.

## Hints
1. Branch coverage means testing every if/else path.
2. Write one test per distinct return path.
3. This achieves 100% branch coverage for classify().

## Solution

```javascript
function classify(s){if(s>=90)return'A';if(s>=80)return'B';return'C';}
test('classify A',()=>{expect(classify(95)).toBe('A');});
test('classify B',()=>{expect(classify(85)).toBe('B');});
test('classify C',()=>{expect(classify(70)).toBe('C');});
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
function classify(score) {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  return 'C';
}

test('classify A', () => {
  // TODO: Assert that classify(95 equals 'A' using .toBe().
});

test('classify B', () => {
  // TODO: Assert that classify(85 equals 'B' using .toBe().
});

test('classify C', () => {
  // TODO: Assert that classify(70 equals 'C' using .toBe().
});
```
