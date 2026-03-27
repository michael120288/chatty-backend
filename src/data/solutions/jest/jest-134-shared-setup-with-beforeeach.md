# Shared Setup with beforeEach

**Level:** 134
**ID:** `jest-134`
**XP:** 110
**Tags:** `beforeEach`, `setup`, `class`

## Objective

Use beforeEach to initialise fresh state for each test.

## Story

Each battle starts fresh. Use beforeEach to create a new hero instance.

## Hints
1. beforeEach runs before every test in the describe/file.
2. Declare the variable outside beforeEach so tests can access it.
3. Each test gets a fresh hero — no state leakage.

## Solution

```javascript
class Hero{constructor(){this.hp=100;this.kills=0;}fight(){this.kills++;this.hp-=10;}}
let hero;
beforeEach(()=>{hero=new Hero();});
test('starts healthy',()=>{expect(hero.hp).toBe(100);});
test('one fight',()=>{hero.fight();expect(hero.kills).toBe(1);expect(hero.hp).toBe(90);});
```

## Explanation

Testing navigation with `MemoryRouter` from `react-router-dom`:

```
import { MemoryRouter } from 'react-router-dom';

render(
  <MemoryRouter initialEntries={['/app/game/level-01']}>
    <Routes>
      <Route path="/app/game/:levelId" element={<Game />} />
    </Routes>
  </MemoryRouter>
);
```

## Starter Code

```javascript
class Hero {
  constructor() { this.hp = 100; this.kills = 0; }
  fight() { this.kills++; this.hp -= 10; }
}

let hero;
beforeEach(() => {
  hero = new Hero();
});

test('starts healthy', () => {
  // TODO: Assert that hero.hp equals 100 using .toBe().
});

test('one fight', () => {
  hero.fight();
  // TODO: Assert that hero.kills equals 1 using .toBe().
  // TODO: Assert that hero.hp equals 90 using .toBe().
});
```
