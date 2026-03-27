# Object Properties

**Level:** 15
**ID:** `jest-15`
**XP:** 100
**Tags:** `toHaveProperty`, `objects`, `nested`

## Objective

Use toHaveProperty to check object keys and nested paths.

## Story

The wizard's spellbook must contain specific chapters. Use toHaveProperty.

## Hints
1. toHaveProperty(key) — checks key exists.
2. toHaveProperty(key, value) — checks key and value.
3. Use dot notation for nested paths: 'author.name'.

## Solution

```javascript
const spellbook={title:'Arcane Arts',chapters:12,author:{name:'Merlin',age:500}};
test('spellbook has title',()=>{expect(spellbook).toHaveProperty('title');});
test('title is Arcane Arts',()=>{expect(spellbook).toHaveProperty('title','Arcane Arts');});
test('nested author name',()=>{expect(spellbook).toHaveProperty('author.name','Merlin');});
```

## Explanation

`expect(fn).toThrow()` asserts that a function throws an error when called. Wrap the call in an arrow function:

```
expect(() => {
  throw new Error('Oops');
}).toThrow('Oops');

expect(() => JSON.parse('invalid')).toThrow(SyntaxError);
```

Never call the function directly — `expect(fn()).toThrow()` would throw before Jest can catch it.

## Starter Code

```javascript
const spellbook = {
  title: 'Arcane Arts',
  chapters: 12,
  author: { name: 'Merlin', age: 500 }
};

test('spellbook has title', () => {
  // TODO: Assert that spellbook has the expected property using .toHaveProperty('title').
});

test('title is Arcane Arts', () => {
  // TODO: Assert that spellbook has the expected property using .toHaveProperty('title', 'Arcane Arts').
});

test('nested author name', () => {
  // TODO: Assert that spellbook has the expected property using .toHaveProperty('author.name', 'Merlin').
});
```
