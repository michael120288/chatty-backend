# test.skip

**Level:** 41
**ID:** `jest-41`
**XP:** 100
**Tags:** `test.skip`, `skip`, `xtest`

## Objective

Use test.skip to skip a test and keep it in the file.

## Story

The broken bridge must be skipped for now. Mark tests to skip without deleting them.

## Hints
1. test.skip() or xtest() — marks the test as skipped (shown in output).
2. The skipped test will not run but appears in the report.
3. Use .only to run only specific tests during debugging.

## Solution

```javascript
function crossBridge(){throw new Error('bridge under repair');}
test.skip('bridge can be crossed',()=>{expect(crossBridge()).toBe('crossed');});
test('bridge exists',()=>{expect(typeof crossBridge).toBe('function');});
```

## Explanation

`expect(value).toMatchObject(partial)` checks that an object **contains** the expected subset — extra properties are ignored.

```
const user = { id: 1, name: 'Aria', role: 'Mage', level: 99 };
expect(user).toMatchObject({ name: 'Aria', role: 'Mage' }); // passes
```

`toMatchSnapshot()` captures the value on first run and compares on subsequent runs.

## Starter Code

```javascript
function crossBridge() {
  throw new Error('bridge under repair');
}

// This test is expected to fail — skip it for now
test.skip('bridge can be crossed', () => {
  expect(crossBridge()).toBe('crossed');
});

test('bridge exists', () => {
  // TODO: Assert that typeof crossBridge equals 'function' using .toBe().
});
```
