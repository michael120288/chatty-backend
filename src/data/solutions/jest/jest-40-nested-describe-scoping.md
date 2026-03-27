# Nested describe Scoping

**Level:** 40
**ID:** `jest-40`
**XP:** 150
**Tags:** `describe`, `scoping`, `beforeEach`

## Objective

Use nested describe blocks to scope beforeEach differently per group.

## Story

The palace has outer halls and inner chambers. Each scope has its own setup.

## Hints
1. Inner beforeEach runs AFTER outer beforeEach.
2. Outer beforeEach sets 'outer hall', then inner sets 'inner chamber'.
3. Test outside describe uses only the outer beforeEach.

## Solution

```javascript
let location;
beforeEach(()=>{location='outer hall';});
describe('inner chamber',()=>{beforeEach(()=>{location='inner chamber';});test('inside the chamber',()=>{expect(location).toBe('inner chamber');});});
test('outside in the hall',()=>{expect(location).toBe('outer hall');});
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
let location;

beforeEach(() => {
  location = 'outer hall';
});

describe('inner chamber', () => {
  beforeEach(() => {
    location = 'inner chamber';
  });

  test('inside the chamber', () => {
    // TODO: Assert that location equals 'inner chamber' using .toBe().
  });
});

test('outside in the hall', () => {
  // TODO: Assert that location equals 'outer hall' using .toBe().
});
```
