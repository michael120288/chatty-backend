# Manual Mock Object

**Level:** 168
**ID:** `jest-168`
**XP:** 120
**Tags:** `manual mock`, `logger`, `jest.fn`

## Objective

Create and use a manual mock object in place of a real dependency.

## Story

The dungeon uses a logger module. Create a manual mock object for it.

## Hints
1. Create an object with jest.fn() for each method.
2. Verify which methods were called and with what arguments.
3. not.toHaveBeenCalled() for methods that should not fire.

## Solution

```javascript
const logger={info:jest.fn(),warn:jest.fn(),error:jest.fn()};
function processHero(hero){if(!hero.name){logger.error('Missing hero name');return null;}logger.info(`Processing ${hero.name}`);return hero;}
test('valid hero logs info',()=>{const r=processHero({name:'Aria'});expect(r).toEqual({name:'Aria'});expect(logger.info).toHaveBeenCalledWith('Processing Aria');expect(logger.error).not.toHaveBeenCalled();});
test('invalid hero logs error',()=>{processHero({});expect(logger.error).toHaveBeenCalledWith('Missing hero name');});
```

## Explanation

Testing that filtered data renders correctly:

```
it('only counts jest- IDs toward jest completion', async () => {
  useProgress.mockReturnValue({
    ...defaultProgress,
    completedLevels: ['level-01', 'cy-01', 'jest-01'], // only jest-01 is jest
  });
  render(<GameHome />);
  await waitFor(() => expect(screen.getByText('Jest Unit Testing')).toBeInTheDocument());
  expect(screen.getByText(`1 / ${JEST_LEVELS.length} complete`)).toBeInTheDocument();
});
```

## Starter Code

```javascript
// Real logger (imaginary):
// const logger = require('./logger');

// We simulate a manual mock:
const logger = {
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

function processHero(hero) {
  if (!hero.name) {
    logger.error('Missing hero name');
    return null;
  }
  logger.info(`Processing ${hero.name}`);
  return hero;
}

test('valid hero logs info', () => {
  const result = processHero({ name: 'Aria' });
  // TODO: Assert that result deeply equals the expected value using .toEqual().
  // TODO: Assert that logger.info was called with the expected arguments.
  // TODO: Assert that logger.error was not called.
});

test('invalid hero logs error', () => {
  processHero({});
  // TODO: Assert that logger.error was called with the expected arguments.
});
```
