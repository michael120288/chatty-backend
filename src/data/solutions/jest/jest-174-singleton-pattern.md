# Singleton Pattern

**Level:** 174
**ID:** `jest-174`
**XP:** 120
**Tags:** `singleton`, `pattern`, `toBe`

## Objective

Test that a singleton returns the same instance every time.

## Story

The dungeon has only one treasure vault. Test the singleton returns the same instance.

## Hints
1. toBe checks reference equality — same object in memory.
2. Mutating the instance affects all references.
3. Static _instance persists across calls.

## Solution

```javascript
class Vault{constructor(){this.gold=0;}static getInstance(){if(!Vault._instance)Vault._instance=new Vault();return Vault._instance;}}
test('same instance',()=>{const v1=Vault.getInstance();const v2=Vault.getInstance();expect(v1).toBe(v2);});
test('shared state',()=>{const v=Vault.getInstance();v.gold=1000;expect(Vault.getInstance().gold).toBe(1000);});
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
class Vault {
  constructor() { this.gold = 0; }
  static getInstance() {
    if (!Vault._instance) Vault._instance = new Vault();
    return Vault._instance;
  }
}

test('same instance', () => {
  const v1 = Vault.getInstance();
  const v2 = Vault.getInstance();
  // TODO: Assert that v1 equals v2 using .toBe().
});

test('shared state', () => {
  const vault = Vault.getInstance();
  vault.gold = 1000;
  // TODO: Assert that Vault.getInstance( equals 1000 using .toBe().
});
```
