# Decorator Pattern

**Level:** 175
**ID:** `jest-175`
**XP:** 130
**Tags:** `decorator`, `pattern`, `jest.fn`

## Objective

Test a function decorator that wraps existing behaviour.

## Story

Abilities can be stacked with decorators. Test the decorator adds behaviour.

## Hints
1. The decorator calls the original function unchanged.
2. logger.log is called before (with args) and after (with result).
3. toHaveBeenCalledTimes(2) verifies both log calls.

## Solution

```javascript
function withLogging(fn,logger){return function(...args){logger.log(`called with ${JSON.stringify(args)}`);const result=fn(...args);logger.log(`returned ${result}`);return result;};}
test('decorator logs calls and results',()=>{const logger={log:jest.fn()};const add=(a,b)=>a+b;const loggedAdd=withLogging(add,logger);const result=loggedAdd(3,4);expect(result).toBe(7);expect(logger.log).toHaveBeenCalledTimes(2);expect(logger.log).toHaveBeenCalledWith('called with [3,4]');expect(logger.log).toHaveBeenCalledWith('returned 7');});
```

## Explanation

Testing with `screen.queryBy*` (doesn't throw when element is missing):

```
// getBy* — throws if not found (use for elements that MUST be present)
screen.getByText('Welcome');

// queryBy* — returns null if not found (use for elements that might be absent)
expect(screen.queryByText('Error')).not.toBeInTheDocument();

// findBy* — returns promise, waits for element (use for async appearance)
const el = await screen.findByText('Loaded!');
```

## Starter Code

```javascript
function withLogging(fn, logger) {
  return function (...args) {
    logger.log(`called with ${JSON.stringify(args)}`);
    const result = fn(...args);
    logger.log(`returned ${result}`);
    return result;
  };
}

test('decorator logs calls and results', () => {
  const logger = { log: jest.fn() };
  const add = (a, b) => a + b;
  const loggedAdd = withLogging(add, logger);

  const result = loggedAdd(3, 4);
  // TODO: Assert that result equals 7 using .toBe().
  // TODO: Assert that logger.log was called exactly 2 times.
  // TODO: Assert that logger.log was called with the expected arguments.
});
```
