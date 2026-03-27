# Strategy Pattern

**Level:** 172
**ID:** `jest-172`
**XP:** 130
**Tags:** `strategy`, `pattern`, `jest.fn`

## Objective

Test a strategy pattern where the algorithm is injected.

## Story

Different heroes use different damage strategies. Test the strategy pattern.

## Hints
1. Strategy is a function — inject it as a parameter.
2. Test each strategy in isolation.
3. Mock strategy verifies the function was called with the right target.

## Solution

```javascript
function attackWith(strategy,target){return strategy(target);}
const swordAttack=t=>`${t} hit for 50 dmg`;const magicAttack=t=>`${t} blasted for 80 dmg`;
test('sword strategy',()=>{expect(attackWith(swordAttack,'Goblin')).toBe('Goblin hit for 50 dmg');});
test('magic strategy',()=>{expect(attackWith(magicAttack,'Dragon')).toBe('Dragon blasted for 80 dmg');});
test('mock strategy',()=>{const m=jest.fn().mockReturnValue('custom attack');attackWith(m,'Boss');expect(m).toHaveBeenCalledWith('Boss');});
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
function attackWith(strategy, target) {
  return strategy(target);
}

const swordAttack = target => `${target} hit for 50 dmg`;
const magicAttack = target => `${target} blasted for 80 dmg`;

test('sword strategy', () => {
  // TODO: Assert that attackWith(swordAttack, 'Goblin' equals 'Goblin hit for 50 dmg' using .toBe().
});

test('magic strategy', () => {
  // TODO: Assert that attackWith(magicAttack, 'Dragon' equals 'Dragon blasted for 80 dmg' using .toBe().
});

test('mock strategy', () => {
  const mockStrategy = jest.fn().mockReturnValue('custom attack');
  attackWith(mockStrategy, 'Boss');
  // TODO: Assert that mockStrategy was called with the expected arguments.
});
```
