# beforeAll and afterAll

**Level:** 39
**ID:** `jest-39`
**XP:** 150
**Tags:** `beforeAll`, `afterAll`, `setup`

## Objective

Use beforeAll to set up once before all tests and afterAll to clean up.

## Story

The expedition takes time to prepare and debrief. Use beforeAll/afterAll for one-time setup.

## Hints
1. beforeAll runs once before all tests in the scope.
2. afterAll runs once after all tests in the scope.
3. Use for expensive setup like DB connections (unlike beforeEach).

## Solution

```javascript
let expedition;
beforeAll(()=>{expedition={launched:true,crew:['Alice','Bob']};});
afterAll(()=>{expedition=null;});
test('expedition launched',()=>{expect(expedition.launched).toBe(true);});
test('crew count',()=>{expect(expedition.crew).toHaveLength(2);});
```

## Explanation

`beforeEach` / `afterEach` run setup and teardown around each test. `beforeAll` / `afterAll` run once for the entire `describe` block.

```
describe('UserService', () => {
  let service;

  beforeEach(() => {
    service = new UserService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('creates a user', () => {
    expect(service.create('Aria')).toBeDefined();
  });
});
```

## Starter Code

```javascript
let expedition;

beforeAll(() => {
  // TODO: expedition = { launched: true, crew: ['Alice', 'Bob'] }
});

afterAll(() => {
  // TODO: expedition = null
});

test('expedition launched', () => {
  expect(expedition.launched).toBe(true);
});

test('crew count', () => {
  expect(expedition.crew).toHaveLength(2);
});
```
