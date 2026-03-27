# Symbol as Key

**Level:** 158
**ID:** `jest-158`
**XP:** 120
**Tags:** `Symbol`, `object keys`

## Objective

Test that Symbol keys work as unique identifiers.

## Story

Secret dungeon metadata uses Symbol keys, hidden from normal inspection.

## Hints
1. Symbols are unique keys not enumerated by Object.keys.
2. Access with vault[SECRET] using the symbol reference.
3. Symbols provide private-ish object keys.

## Solution

```javascript
const SECRET=Symbol('secret');
function createVault(s){return{[SECRET]:s,visible:'nothing to see'};}
test('symbol key access',()=>{const v=createVault('dragon egg');expect(v[SECRET]).toBe('dragon egg');});
test('symbol not in Object.keys',()=>{const v=createVault('dragon egg');expect(Object.keys(v)).toEqual(['visible']);});
```

## Explanation

Testing progress bar styles/calculations:

```
it('progress bar reflects partial completion', async () => {
  useProgress.mockReturnValue({ ...defaultProgress, completedLevels: ['jest-01'] });
  render(<GameHome />);
  await waitFor(() => expect(screen.getByText('Jest Unit Testing')).toBeInTheDocument());
  const jestCard = screen.getByText('Jest Unit Testing').closest('a');
  const fill = jestCard.querySelector('.tc-progress-fill');
  const expected = `${(1 / JEST_LEVELS.length) * 100}%`;
  expect(fill).toHaveStyle({ width: expected });
});
```

## Starter Code

```javascript
const SECRET = Symbol('secret');

function createVault(secret) {
  return { [SECRET]: secret, visible: 'nothing to see' };
}

test('symbol key access', () => {
  const vault = createVault('dragon egg');
  // TODO: Assert that vault[SECRET] equals 'dragon egg' using .toBe().
});

test('symbol not in Object.keys', () => {
  const vault = createVault('dragon egg');
  // TODO: Assert that Object.keys(vault deeply equals the expected value using .toEqual().
});
```
