# jest.mock a Module

**Level:** 74
**ID:** `jest-74`
**XP:** 130
**Tags:** `jest.mock`, `module`, `mockReturnValue`

## Objective

Use jest.mock() to mock a module and control its return value.

## Story

The oracle speaks through a module. Mock the entire module to control its prophecy.

## Hints
1. jest.mock('./module') replaces module with auto-mock.
2. mockReturnValue controls what the mock returns.
3. In this exercise the mock is set up manually on an object.

## Solution

```javascript
const utils={getScore:()=>0};const m=jest.fn().mockReturnValue(99);utils.getScore=m;
test('mocked score',()=>{expect(utils.getScore()).toBe(99);expect(m).toHaveBeenCalledTimes(1);});
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
// utils.js is imaginary; we mock it below
const utils = { getScore: () => 0 };
const mockedGetScore = jest.fn().mockReturnValue(99);
utils.getScore = mockedGetScore;

test('mocked score', () => {
  // TODO: Assert that utils.getScore( equals 99 using .toBe().
  // TODO: Assert that mockedGetScore was called exactly 1 times.
});
```
