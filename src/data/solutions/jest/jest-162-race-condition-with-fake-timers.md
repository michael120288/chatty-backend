# Race Condition with Fake Timers

**Level:** 162
**ID:** `jest-162`
**XP:** 130
**Tags:** `fake timers`, `race`, `async`

## Objective

Use fake timers to control async timing and test race outcomes.

## Story

Two async operations race. The faster one wins. Control timing with fake timers.

## Hints
1. advanceTimersByTime(200) fires the 100ms timeout but not 500ms.
2. The first resolve wins — Promise ignores subsequent resolves.
3. Use jest.useFakeTimers() before the test.

## Solution

```javascript
jest.useFakeTimers();
function race(a,b){return new Promise(resolve=>{setTimeout(()=>resolve('A'),a);setTimeout(()=>resolve('B'),b);});}
test('A wins when faster',async()=>{const p=race(100,500);jest.advanceTimersByTime(200);const r=await p;expect(r).toBe('A');});
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

function race(a, b) {
  return new Promise((resolve) => {
    setTimeout(() => resolve('A'), a);
    setTimeout(() => resolve('B'), b);
  });
}

test('A wins when faster', async () => {
  const promise = race(100, 500);
  jest.advanceTimersByTime(200);
  const result = await promise;
  // TODO: Assert that result equals 'A' using .toBe().
});
```
