# Real-World: testing file-like operations

**Level:** 243
**ID:** `vitest-243`
**XP:** 270
**Tags:** `files`, `integration`

## Objective

Complete the starter code using Real-World: testing file-like operations so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Real-World: testing file-like operations to implement the missing assertions and make everything pass.

## Hints
1. Section 16: Real-World Patterns

## Solution

```javascript
import { test, expect } from 'vitest';

class InMemoryFs {
  private files = new Map<string, string>();

  write(path: string, content: string): void {
    this.files.set(path, content);
  }

  read(path: string): string {
    if (!this.files.has(path)) throw new Error(\`File not found: \${path}\`);
    return this.files.get(path)!;
  }

  exists(path: string): boolean { return this.files.has(path); }
  delete(path: string): boolean { return this.files.delete(path); }

  list(dir = '/'): string[] {
    return Array.from(this.files.keys())
      .filter(p => p.startsWith(dir === '/' ? '/' : dir + '/'));
  }

  size(path: string): number { return this.read(path).length; }
}

test('InMemoryFs write and read', () => {
  const fs = new InMemoryFs();
  fs.write('/config.json', '{"key":"value"}');
  expect(fs.read('/config.json')).toBe('{"key":"value"}');
  expect(fs.exists('/config.json')).toBe(true);
  expect(fs.exists('/other.txt')).toBe(false);
});

test('InMemoryFs throws for missing files', () => {
  const fs = new InMemoryFs();
  expect(() => fs.read('/missing.txt')).toThrow('File not found');
});

test('InMemoryFs delete and size', () => {
  const fs = new InMemoryFs();
  fs.write('/a.txt', 'hello');
  expect(fs.size('/a.txt')).toBe(5);
  expect(fs.delete('/a.txt')).toBe(true);
  expect(fs.exists('/a.txt')).toBe(false);
});
```

## Explanation

`Real` Test an in-memory file system simulation.

## Starter Code

```javascript
import { test, expect } from 'vitest';

class InMemoryFs {
  private files = new Map<string, string>();

  write(path: string, content: string): void {
    this.files.set(path, content);
  }

  read(path: string): string {
    if (!this.files.has(path)) throw new Error(\`File not found: \${path}\`);
    return this.files.get(path)!;
  }

  exists(path: string): boolean { return this.files.has(path); }
  delete(path: string): boolean { return this.files.delete(path); }

  list(dir = '/'): string[] {
    return Array.from(this.files.keys())
      .filter(p => p.startsWith(dir === '/' ? '/' : dir + '/'));
  }

  size(path: string): number { return this.read(path).length; }
}

test('InMemoryFs write and read', () => {
  const fs = new InMemoryFs();
  fs.write('/config.json', '{"key":"value"}');
  // TODO: add assertion using Real-World: testing file-like operations
  // TODO: add assertion using Real-World: testing file-like operations
  // TODO: add assertion using Real-World: testing file-like operations
});

test('InMemoryFs throws for missing files', () => {
  const fs = new InMemoryFs();
  // TODO: add assertion using Real-World: testing file-like operations
});

test('InMemoryFs delete and size', () => {
  const fs = new InMemoryFs();
  fs.write('/a.txt', 'hello');
  // TODO: add assertion using Real-World: testing file-like operations
  // TODO: add assertion using Real-World: testing file-like operations
  // TODO: add assertion using Real-World: testing file-like operations
});
```
