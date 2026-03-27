# Matching Thrown Error Object

**Level:** 187
**ID:** `jest-187`
**XP:** 120
**Tags:** `custom error`, `try/catch`, `properties`

## Objective

Use try/catch to assert properties on a thrown error object.

## Story

The dungeon error carries a code property. Assert the full error shape.

## Hints
1. Catch the error and assert its properties directly.
2. expect.assertions(2) ensures both assertions run.
3. Custom properties (code) are accessible on the caught error.

## Solution

```javascript
class AppError extends Error{constructor(m,c){super(m);this.code=c;}}
function fail(){throw new AppError('Quest failed',404);}
test('error has code',()=>{expect.assertions(2);try{fail();}catch(e){expect(e.message).toBe('Quest failed');expect(e.code).toBe(404);}});
```

## Explanation

Testing with `within` for scoped queries:

```
import { within } from '@testing-library/react';

const card = screen.getByText('Jest Unit Testing').closest('.track-card');
const { getByText } = within(card);
expect(getByText('3 Levels')).toBeInTheDocument();
expect(getByText('0 / 3 complete')).toBeInTheDocument();
```

`within(element)` scopes all queries to that element — useful for testing repeated patterns like cards.

## Starter Code

```javascript
class AppError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

function fail() {
  throw new AppError('Quest failed', 404);
}

test('error has code', () => {
  expect.assertions(2);
  try {
    fail();
  } catch (e) {
    // TODO: Assert that e.message equals 'Quest failed' using .toBe().
    // TODO: Assert that e.code equals 404 using .toBe().
  }
});
```
