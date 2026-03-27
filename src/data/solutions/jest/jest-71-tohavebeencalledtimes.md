# toHaveBeenCalledTimes

**Level:** 71
**ID:** `jest-71`
**XP:** 110
**Tags:** `toHaveBeenCalledTimes`, `mock`, `jest.fn`

## Objective

Use toHaveBeenCalledTimes(n) to verify exact call count.

## Story

The blacksmith must be called exactly twice — once to forge, once to temper.

## Hints
1. toHaveBeenCalledTimes(n) — mock was called exactly n times.
2. Works only on jest.fn() or jest.spyOn targets.
3. Use toHaveBeenCalled() if you only care it was called at least once.

## Solution

```javascript
test('forge called twice',()=>{const forge=jest.fn();forge('sword');forge('shield');expect(forge).toHaveBeenCalledTimes(2);});
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
test('forge called twice', () => {
  const forge = jest.fn();
  forge('sword');
  forge('shield');
  // TODO: Assert that forge was called exactly 2 times.
});
```
