# test.todo

**Level:** 42
**ID:** `jest-42`
**XP:** 100
**Tags:** `test.todo`, `planning`, `tests`

## Objective

Use test.todo to mark tests that need to be written.

## Story

The treasure map shows unexplored zones. Mark them with todo for future expeditions.

## Hints
1. test.todo('description') — appears in output as a reminder.
2. No callback allowed — only the description string.
3. Useful for planning tests alongside implementation.

## Solution

```javascript
function findTreasure(map){return map.xMark||null;}
test('finds treasure at X mark',()=>{const map={xMark:'cave entrance'};expect(findTreasure(map)).toBe('cave entrance');});
test.todo('returns null when no X mark');
test.todo('handles empty map object');
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
function findTreasure(map) {
  return map.xMark || null;
}

test('finds treasure at X mark', () => {
  const map = { xMark: 'cave entrance' };
  expect(findTreasure(map)).toBe('cave entrance');
});

// TODO tests to write later:
test.todo('returns null when no X mark');
test.todo('handles empty map object');
```
