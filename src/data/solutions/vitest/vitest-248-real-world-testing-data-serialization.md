# Real-World: testing data serialization

**Level:** 248
**ID:** `vitest-248`
**XP:** 270
**Tags:** `integration`, `patterns`

## Objective

Complete the starter code using Real-World: testing data serialization so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Real-World: testing data serialization to implement the missing assertions and make everything pass.

## Hints
1. Section 16: Real-World Patterns

## Solution

```javascript
import { test, expect } from 'vitest';

class Serializer<T> {
  serialize(data: T): string { return JSON.stringify(data); }
  deserialize(str: string): T { return JSON.parse(str); }
  roundTrip(data: T): T { return this.deserialize(this.serialize(data)); }
}

interface Post { id: number; title: string; tags: string[]; author: { name: string; id: number }; }

test('serialize and deserialize a Post', () => {
  const serializer = new Serializer<Post>();
  const post: Post = {
    id: 1,
    title: 'Hello Vitest',
    tags: ['testing', 'javascript'],
    author: { name: 'Alice', id: 42 },
  };

  const serialized = serializer.serialize(post);
  expect(typeof serialized).toBe('string');

  const deserialized = serializer.deserialize(serialized);
  expect(deserialized).toEqual(post);
  expect(deserialized.author.name).toBe('Alice');
  expect(deserialized.tags).toContain('testing');
});

test('roundTrip preserves complex data', () => {
  const serializer = new Serializer<unknown>();
  const complex = {
    nested: { a: { b: { c: [1, 2, 3] } } },
    nullValue: null,
    booleans: [true, false],
    numbers: [0, -1, 3.14, 1e10],
  };
  expect(serializer.roundTrip(complex)).toEqual(complex);
});
```

## Explanation

`Real` Test serialization and deserialization of complex data.

## Starter Code

```javascript
import { test, expect } from 'vitest';

class Serializer<T> {
  serialize(data: T): string { return JSON.stringify(data); }
  deserialize(str: string): T { return JSON.parse(str); }

  roundTrip(data: T): T { return this.deserialize(this.serialize(data)); }
}

interface Post { id: number; title: string; tags: string[]; author: { name: string; id: number }; }

test('serialize and deserialize a Post', () => {
  const serializer = new Serializer<Post>();
  const post: Post = {
    id: 1,
    title: 'Hello Vitest',
    tags: ['testing', 'javascript'],
    author: { name: 'Alice', id: 42 },
  };

  const serialized = serializer.serialize(post);
  // TODO: add assertion using Real-World: testing data serialization

  const deserialized = serializer.deserialize(serialized);
  // TODO: add assertion using Real-World: testing data serialization
  // TODO: add assertion using Real-World: testing data serialization
  // TODO: add assertion using Real-World: testing data serialization
});

test('roundTrip preserves complex data', () => {
  const serializer = new Serializer<unknown>();
  const complex = {
    nested: { a: { b: { c: [1, 2, 3] } } },
    nullValue: null,
    booleans: [true, false],
    numbers: [0, -1, 3.14, 1e10],
  };
  // TODO: add assertion using Real-World: testing data serialization
});
```
