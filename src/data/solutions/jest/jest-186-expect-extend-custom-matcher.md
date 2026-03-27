# expect.extend Custom Matcher

**Level:** 186
**ID:** `jest-186`
**XP:** 140
**Tags:** `expect.extend`, `custom matcher`

## Objective

Use expect.extend to add a custom matcher.

## Story

The guild needs a custom isHealthy matcher. Extend Jest with it.

## Hints
1. expect.extend adds custom matchers globally.
2. Return { pass, message } from the matcher function.
3. message() is called when the assertion fails.

## Solution

```javascript
expect.extend({toBeHealthy(r){const pass=r.hp>0&&r.hp<=100;return{pass,message:()=>pass?`Expected hero NOT healthy hp=${r.hp}`:`Expected hero healthy hp=${r.hp}`};}});
test('healthy hero',()=>{expect({hp:75}).toBeHealthy();});
test('dead hero is not healthy',()=>{expect({hp:0}).not.toBeHealthy();});
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
expect.extend({
  toBeHealthy(received) {
    const pass = received.hp > 0 && received.hp <= 100;
    return {
      pass,
      message: () => pass
        ? `Expected hero to NOT be healthy but got hp=${received.hp}`
        : `Expected hero to be healthy but got hp=${received.hp}`,
    };
  },
});

test('healthy hero', () => {
  // TODO: Assert the expected outcome using expect({ hp: 75 }).
});

test('dead hero is not healthy', () => {
  // TODO: Assert the expected outcome using expect({ hp: 0 }).
});
```
