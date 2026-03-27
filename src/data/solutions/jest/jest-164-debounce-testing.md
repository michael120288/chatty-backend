# Debounce Testing

**Level:** 164
**ID:** `jest-164`
**XP:** 130
**Tags:** `debounce`, `fake timers`, `jest.fn`

## Objective

Test a debounce function using fake timers.

## Story

The dungeon input is debounced — only the last call within the window fires.

## Hints
1. Each debounced call resets the timer.
2. Only the last 'c' call fires after 200ms.
3. advanceTimersByTime triggers the pending timer.

## Solution

```javascript
jest.useFakeTimers();
function debounce(fn,delay){let timer;return function(...args){clearTimeout(timer);timer=setTimeout(()=>fn(...args),delay);};}
test('debounce — only last call fires',()=>{const fn=jest.fn();const debounced=debounce(fn,200);debounced('a');debounced('b');debounced('c');expect(fn).not.toHaveBeenCalled();jest.advanceTimersByTime(200);expect(fn).toHaveBeenCalledTimes(1);expect(fn).toHaveBeenCalledWith('c');});
```

## Explanation

Testing components with mocked child components:

```
jest.mock('../components/XPBar', () => ({
  XPBar: () => <div data-testid="xp-bar" />
}));

it('renders XPBar component', () => {
  render(<GameHome />);
  expect(screen.getByTestId('xp-bar')).toBeInTheDocument();
});
```

Mocking child components isolates the component under test and avoids cascading failures.

## Starter Code

```javascript
jest.useFakeTimers();

function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

test('debounce — only last call fires', () => {
  const fn = jest.fn();
  const debounced = debounce(fn, 200);

  debounced('a');
  debounced('b');
  debounced('c');
  // not fired yet
  expect(fn).not.toHaveBeenCalled();

  jest.advanceTimersByTime(200);
  // TODO: Assert that fn was called exactly 1 times.
  // TODO: Assert that fn was called with the expected arguments.
});
```
