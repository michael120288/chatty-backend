# beforeAll / afterAll Once

**Level:** 136
**ID:** `jest-136`
**XP:** 120
**Tags:** `beforeAll`, `afterAll`, `setup`

## Objective

Use beforeAll and afterAll for one-time setup and teardown.

## Story

The dungeon door opens once and closes once. Use beforeAll/afterAll for one-time setup.

## Hints
1. beforeAll runs once before ALL tests in the block.
2. afterAll runs once after ALL tests complete.
3. Unlike beforeEach, shared state persists between tests here.

## Solution

```javascript
let db;
beforeAll(()=>{db={connected:true,records:['hero1','hero2']};});
afterAll(()=>{db.connected=false;});
test('db connected',()=>{expect(db.connected).toBe(true);});
test('db has records',()=>{expect(db.records).toHaveLength(2);});
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
let db;

beforeAll(() => {
  db = { connected: true, records: ['hero1', 'hero2'] };
});

afterAll(() => {
  db.connected = false;
});

test('db connected', () => {
  // TODO: Assert that db.connected equals true using .toBe().
});

test('db has records', () => {
  // TODO: Assert that db.records has length 2.
});
```
