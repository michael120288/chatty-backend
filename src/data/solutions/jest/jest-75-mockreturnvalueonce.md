# mockReturnValueOnce

**Level:** 75
**ID:** `jest-75`
**XP:** 120
**Tags:** `mockReturnValueOnce`, `mock`

## Objective

Use mockReturnValueOnce() to set different return values per call.

## Story

The dice rolls differently each time — first a 6, then a 1. Control sequential returns.

## Hints
1. mockReturnValueOnce sets a one-shot return value.
2. Multiple calls chain in order.
3. After one-shots are exhausted, falls back to mockReturnValue default.

## Solution

```javascript
test('dice rolls',()=>{const roll=jest.fn();roll.mockReturnValueOnce(6);roll.mockReturnValueOnce(1);expect(roll()).toBe(6);expect(roll()).toBe(1);});
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
test('dice rolls', () => {
  const roll = jest.fn();
  roll.mockReturnValueOnce(6);
  roll.mockReturnValueOnce(1);
  // TODO: Assert that roll() equals 6 using .toBe().
  // TODO: Assert that roll() equals 1 using .toBe().
});
```
