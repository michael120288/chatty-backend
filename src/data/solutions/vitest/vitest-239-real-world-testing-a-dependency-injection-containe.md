# Real-World: testing a dependency injection container

**Level:** 239
**ID:** `vitest-239`
**XP:** 270
**Tags:** `integration`, `patterns`

## Objective

Complete the starter code using Real-World: testing a dependency injection container so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Real-World: testing a dependency injection container to implement the missing assertions and make everything pass.

## Hints
1. Section 16: Real-World Patterns

## Solution

```javascript
import { test, expect } from 'vitest';

class Container {
  private registry = new Map<string, () => any>();

  register<T>(token: string, factory: () => T): void {
    this.registry.set(token, factory);
  }

  resolve<T>(token: string): T {
    const factory = this.registry.get(token);
    if (!factory) throw new Error(\`No registration for token: \${token}\`);
    return factory();
  }
}

test('Container registers and resolves services', () => {
  const container = new Container();
  container.register('config', () => ({ db: 'test-db', port: 3000 }));
  container.register('logger', () => ({ log: (msg: string) => msg }));

  const config = container.resolve<{ db: string; port: number }>('config');
  expect(config.db).toBe('test-db');
  expect(config.port).toBe(3000);
});

test('Container resolves fresh instances each time', () => {
  const container = new Container();
  let count = 0;
  container.register('counter', () => ({ id: ++count }));
  expect(container.resolve<{ id: number }>('counter').id).toBe(1);
  expect(container.resolve<{ id: number }>('counter').id).toBe(2);
});

test('Container throws for unknown token', () => {
  const container = new Container();
  expect(() => container.resolve('unknown')).toThrow('No registration for token: unknown');
});
```

## Explanation

`Real` Test a simple IoC container with dependency resolution.

## Starter Code

```javascript
import { test, expect } from 'vitest';

class Container {
  private registry = new Map<string, () => any>();

  register<T>(token: string, factory: () => T): void {
    this.registry.set(token, factory);
  }

  resolve<T>(token: string): T {
    const factory = this.registry.get(token);
    if (!factory) throw new Error(\`No registration for token: \${token}\`);
    return factory();
  }
}

test('Container registers and resolves services', () => {
  const container = new Container();
  container.register('config', () => ({ db: 'test-db', port: 3000 }));
  container.register('logger', () => ({ log: (msg: string) => msg }));

  const config = container.resolve<{ db: string; port: number }>('config');
  // TODO: add assertion using Real-World: testing a dependency injection container
  // TODO: add assertion using Real-World: testing a dependency injection container
});

test('Container resolves fresh instances each time', () => {
  const container = new Container();
  let count = 0;
  container.register('counter', () => ({ id: ++count }));
  // TODO: add assertion using Real-World: testing a dependency injection container
  // TODO: add assertion using Real-World: testing a dependency injection container
});

test('Container throws for unknown token', () => {
  const container = new Container();
  // TODO: add assertion using Real-World: testing a dependency injection container
});
```
