# Builder Pattern

**Level:** 173
**ID:** `jest-173`
**XP:** 130
**Tags:** `builder`, `pattern`, `chaining`

## Objective

Test a builder pattern that chains methods.

## Story

The spell builder constructs complex spells step by step. Test the builder.

## Hints
1. Each builder method returns this for chaining.
2. build() returns a copy of the internal object.
3. toEqual for deep object comparison.

## Solution

```javascript
class SpellBuilder{constructor(){this._spell={name:'',power:0,element:'fire'};}name(n){this._spell.name=n;return this;}power(p){this._spell.power=p;return this;}element(e){this._spell.element=e;return this;}build(){return{...this._spell};}}
test('build a spell',()=>{const s=new SpellBuilder().name('Inferno').power(100).element('fire').build();expect(s).toEqual({name:'Inferno',power:100,element:'fire'});});
test('default element',()=>{const s=new SpellBuilder().name('Zap').power(50).build();expect(s.element).toBe('fire');});
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
class SpellBuilder {
  constructor() { this._spell = { name: '', power: 0, element: 'fire' }; }
  name(n) { this._spell.name = n; return this; }
  power(p) { this._spell.power = p; return this; }
  element(e) { this._spell.element = e; return this; }
  build() { return { ...this._spell }; }
}

test('build a spell', () => {
  const spell = new SpellBuilder()
    .name('Inferno')
    .power(100)
    .element('fire')
    .build();
  // TODO: Assert that spell deeply equals the expected value using .toEqual().
});

test('default element', () => {
  const spell = new SpellBuilder().name('Zap').power(50).build();
  // TODO: Assert that spell.element equals 'fire' using .toBe().
});
```
