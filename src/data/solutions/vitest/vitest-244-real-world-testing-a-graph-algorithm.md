# Real-World: testing a graph algorithm

**Level:** 244
**ID:** `vitest-244`
**XP:** 280
**Tags:** `integration`, `patterns`

## Objective

Complete the starter code using Real-World: testing a graph algorithm so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Real-World: testing a graph algorithm to implement the missing assertions and make everything pass.

## Hints
1. Section 16: Real-World Patterns

## Solution

```javascript
import { test, expect } from 'vitest';

function bfs(graph: Record<string, string[]>, start: string, end: string): string[] | null {
  if (start === end) return [start];
  const visited = new Set<string>([start]);
  const queue: Array<string[]> = [[start]];

  while (queue.length) {
    const path = queue.shift()!;
    const node = path[path.length - 1];
    for (const neighbor of (graph[node] || [])) {
      if (visited.has(neighbor)) continue;
      const newPath = [...path, neighbor];
      if (neighbor === end) return newPath;
      visited.add(neighbor);
      queue.push(newPath);
    }
  }
  return null;
}

const graph = {
  A: ['B', 'C'],
  B: ['D', 'E'],
  C: ['F'],
  D: [],
  E: ['F'],
  F: [],
};

test('BFS finds shortest path', () => {
  expect(bfs(graph, 'A', 'F')).toEqual(['A', 'C', 'F']);
  expect(bfs(graph, 'A', 'D')).toEqual(['A', 'B', 'D']);
});

test('BFS returns null when no path exists', () => {
  expect(bfs(graph, 'D', 'A')).toBeNull();
  expect(bfs(graph, 'F', 'B')).toBeNull();
});

test('BFS handles same start and end', () => {
  expect(bfs(graph, 'A', 'A')).toEqual(['A']);
});
```

## Explanation

`Real` Test a breadth-first search implementation.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function bfs(graph: Record<string, string[]>, start: string, end: string): string[] | null {
  if (start === end) return [start];
  const visited = new Set<string>([start]);
  const queue: Array<string[]> = [[start]];

  while (queue.length) {
    const path = queue.shift()!;
    const node = path[path.length - 1];
    for (const neighbor of (graph[node] || [])) {
      if (visited.has(neighbor)) continue;
      const newPath = [...path, neighbor];
      if (neighbor === end) return newPath;
      visited.add(neighbor);
      queue.push(newPath);
    }
  }
  return null;
}

const graph = {
  A: ['B', 'C'],
  B: ['D', 'E'],
  C: ['F'],
  D: [],
  E: ['F'],
  F: [],
};

test('BFS finds shortest path', () => {
  // TODO: add assertion using Real-World: testing a graph algorithm
  // TODO: add assertion using Real-World: testing a graph algorithm
});

test('BFS returns null when no path exists', () => {
  // TODO: add assertion using Real-World: testing a graph algorithm
  // TODO: add assertion using Real-World: testing a graph algorithm
});

test('BFS handles same start and end', () => {
  // TODO: add assertion using Real-World: testing a graph algorithm
});
```
