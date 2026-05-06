# Real-World: testing a logger with levels

**Level:** 237
**ID:** `vitest-237`
**XP:** 250
**Tags:** `logging`, `patterns`

## Objective

Complete the starter code using Real-World: testing a logger with levels so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Real-World: testing a logger with levels to implement the missing assertions and make everything pass.

## Hints
1. Section 16: Real-World Patterns

## Solution

```javascript
import { test, expect } from 'vitest';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LEVELS: Record<LogLevel, number> = { debug: 0, info: 1, warn: 2, error: 3 };

class Logger {
  private entries: Array<{ level: LogLevel; message: string; data?: any }> = [];
  constructor(private minLevel: LogLevel = 'info') {}

  private log(level: LogLevel, message: string, data?: any) {
    if (LEVELS[level] >= LEVELS[this.minLevel]) {
      this.entries.push({ level, message, data });
    }
  }

  debug(msg: string, data?: any) { this.log('debug', msg, data); }
  info(msg: string, data?: any) { this.log('info', msg, data); }
  warn(msg: string, data?: any) { this.log('warn', msg, data); }
  error(msg: string, data?: any) { this.log('error', msg, data); }

  getEntries() { return [...this.entries]; }
  getByLevel(level: LogLevel) { return this.entries.filter(e => e.level === level); }
}

test('Logger filters by minLevel', () => {
  const logger = new Logger('warn');
  logger.debug('debug msg');
  logger.info('info msg');
  logger.warn('warn msg');
  logger.error('error msg');
  expect(logger.getEntries()).toHaveLength(2);
  expect(logger.getByLevel('warn')).toHaveLength(1);
  expect(logger.getByLevel('error')).toHaveLength(1);
});

test('Logger stores structured data', () => {
  const logger = new Logger('debug');
  logger.info('User created', { userId: 1, name: 'Alice' });
  const entry = logger.getByLevel('info')[0];
  expect(entry.message).toBe('User created');
  expect(entry.data).toEqual({ userId: 1, name: 'Alice' });
});
```

## Explanation

`Real` Test a structured logger with log levels and filtering.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LEVELS: Record<LogLevel, number> = { debug: 0, info: 1, warn: 2, error: 3 };

class Logger {
  private entries: Array<{ level: LogLevel; message: string; data?: any }> = [];
  constructor(private minLevel: LogLevel = 'info') {}

  private log(level: LogLevel, message: string, data?: any) {
    if (LEVELS[level] >= LEVELS[this.minLevel]) {
      this.entries.push({ level, message, data });
    }
  }

  debug(msg: string, data?: any) { this.log('debug', msg, data); }
  info(msg: string, data?: any) { this.log('info', msg, data); }
  warn(msg: string, data?: any) { this.log('warn', msg, data); }
  error(msg: string, data?: any) { this.log('error', msg, data); }

  getEntries() { return [...this.entries]; }
  getByLevel(level: LogLevel) { return this.entries.filter(e => e.level === level); }
}

test('Logger filters by minLevel', () => {
  const logger = new Logger('warn');
  logger.debug('debug msg');
  logger.info('info msg');
  logger.warn('warn msg');
  logger.error('error msg');
  // TODO: add assertion using Real-World: testing a logger with levels
  // TODO: add assertion using Real-World: testing a logger with levels
  // TODO: add assertion using Real-World: testing a logger with levels
});

test('Logger stores structured data', () => {
  const logger = new Logger('debug');
  logger.info('User created', { userId: 1, name: 'Alice' });
  const entry = logger.getByLevel('info')[0];
  // TODO: add assertion using Real-World: testing a logger with levels
  // TODO: add assertion using Real-World: testing a logger with levels
});
```
