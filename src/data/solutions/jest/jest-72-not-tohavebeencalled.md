# not.toHaveBeenCalled

**Level:** 72
**ID:** `jest-72`
**XP:** 100
**Tags:** `not`, `toHaveBeenCalled`, `mock`

## Objective

Use .not.toHaveBeenCalled() to assert a mock was never invoked.

## Story

The alarm must never ring during a stealth mission.

## Hints
1. .not.toHaveBeenCalled() — mock was never called.
2. Useful for asserting side effects did NOT happen.
3. toHaveBeenCalledTimes(0) is equivalent.

## Solution

```javascript
test('alarm silent',()=>{const alarm=jest.fn();expect(alarm).not.toHaveBeenCalled();});
```

## Explanation

`screen.getByRole` finds elements by their ARIA role — the most accessible and resilient query:

```
screen.getByRole('button', { name: 'Submit' })   // <button>Submit</button>
screen.getByRole('heading', { name: 'Login' })   // <h1>Login</h1>
screen.getByRole('textbox', { name: 'Email' })   // <input aria-label="Email">
screen.getByRole('link', { name: 'Sign up' })    // <a>Sign up</a>
```

Prefer `getByRole` over `getByTestId` — it tests accessibility at the same time.

## Starter Code

```javascript
test('alarm silent', () => {
  const alarm = jest.fn();
  // alarm is never called here
  // TODO: Assert that alarm was not called.
});
```
