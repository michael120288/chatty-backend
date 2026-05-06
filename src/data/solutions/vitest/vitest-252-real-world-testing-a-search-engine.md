# Real-World: testing a search engine

**Level:** 252
**ID:** `vitest-252`
**XP:** 300
**Tags:** `integration`, `patterns`

## Objective

Complete the starter code using Real-World: testing a search engine so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Real-World: testing a search engine to implement the missing assertions and make everything pass.

## Hints
1. Section 16: Real-World Patterns

## Solution

```javascript
import { test, expect } from 'vitest';

class SearchIndex {
  private index = new Map<string, Set<number>>();
  private docs = new Map<number, { id: number; text: string }>();

  add(id: number, text: string): void {
    this.docs.set(id, { id, text });
    const words = text.toLowerCase().split(/\W+/).filter(Boolean);
    words.forEach(word => {
      if (!this.index.has(word)) this.index.set(word, new Set());
      this.index.get(word)!.add(id);
    });
  }

  search(query: string): Array<{ id: number; text: string }> {
    const terms = query.toLowerCase().split(/\W+/).filter(Boolean);
    if (!terms.length) return [];
    const sets = terms.map(t => this.index.get(t) || new Set<number>());
    const intersection = sets.reduce((acc, s) => new Set([...acc].filter(x => s.has(x))));
    return Array.from(intersection).map(id => this.docs.get(id)!).filter(Boolean);
  }
}

test('SearchIndex finds exact matches', () => {
  const idx = new SearchIndex();
  idx.add(1, 'Vitest is a fast testing framework');
  idx.add(2, 'Jest is a testing framework by Facebook');
  idx.add(3, 'Playwright automates browsers');

  const results = idx.search('testing framework');
  expect(results).toHaveLength(2);
  expect(results.map(r => r.id)).toEqual(expect.arrayContaining([1, 2]));
});

test('SearchIndex returns empty for no match', () => {
  const idx = new SearchIndex();
  idx.add(1, 'Hello world');
  expect(idx.search('vitest')).toHaveLength(0);
});
```

## Explanation

`Real` lets you complete the starter code using Real-World: testing a search engine so all tests run and pass with exit code 0. Use it in your tests to verify the expected behavior.

## Starter Code

```javascript
import { test, expect } from 'vitest';

class SearchIndex {
  private index = new Map<string, Set<number>>();
  private docs = new Map<number, { id: number; text: string }>();

  add(id: number, text: string): void {
    this.docs.set(id, { id, text });
    const words = text.toLowerCase().split(/\W+/).filter(Boolean);
    words.forEach(word => {
      if (!this.index.has(word)) this.index.set(word, new Set());
      this.index.get(word)!.add(id);
    });
  }

  search(query: string): Array<{ id: number; text: string }> {
    const terms = query.toLowerCase().split(/\W+/).filter(Boolean);
    if (!terms.length) return [];
    const sets = terms.map(t => this.index.get(t) || new Set<number>());
    const intersection = sets.reduce((acc, s) => new Set([...acc].filter(x => s.has(x))));
    return Array.from(intersection).map(id => this.docs.get(id)!).filter(Boolean);
  }
}

test('SearchIndex finds exact matches', () => {
  const idx = new SearchIndex();
  idx.add(1, 'Vitest is a fast testing framework');
  idx.add(2, 'Jest is a testing framework by Facebook');
  idx.add(3, 'Playwright automates browsers');

  const results = idx.search('testing framework');
  // TODO: add assertion using Real-World: testing a search engine
  // TODO: add assertion using Real-World: testing a search engine
});

test('SearchIndex returns empty for no match', () => {
  const idx = new SearchIndex();
  idx.add(1, 'Hello world');
  // TODO: add assertion using Real-World: testing a search engine
});
```
