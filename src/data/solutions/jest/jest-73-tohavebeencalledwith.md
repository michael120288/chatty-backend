# toHaveBeenCalledWith

**Level:** 73
**ID:** `jest-73`
**XP:** 110
**Tags:** `toHaveBeenCalledWith`, `mock`

## Objective

Use toHaveBeenCalledWith() to assert arguments passed to a mock.

## Story

The messenger was sent — but did they carry the right letter?

## Hints
1. toHaveBeenCalledWith(...args) — checks at least one call matches args.
2. Use toHaveBeenLastCalledWith for the most recent call specifically.
3. Partial matchers like expect.objectContaining work inside.

## Solution

```javascript
test('messenger args',()=>{const send=jest.fn();send('king','urgent');expect(send).toHaveBeenCalledWith('king','urgent');});
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
test('messenger args', () => {
  const send = jest.fn();
  send('king', 'urgent');
  // TODO: Assert that send was called with the expected arguments.
});
```
