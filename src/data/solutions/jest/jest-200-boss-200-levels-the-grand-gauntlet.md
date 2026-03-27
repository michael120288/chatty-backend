# Boss: 200 Levels — The Grand Gauntlet

**Level:** 200
**ID:** `jest-200`
**XP:** 300
**Tags:** `boss`, `factory`, `immutable`, `async`, `test.each`, `mock`

## Objective

Combine TDD, mocks, async, factories, immutable updates, and parameterised tests.

## Story

Two hundred levels complete. The Grand Gauntlet demands all your skills.

## Hints
1. makeHero uses spread for defaults.
2. awardXP is immutable — returns new objects.
3. test.each parameterises the level-up scenarios.

## Solution

```javascript
function makeHero(o={}){return{name:'Hero',hp:100,xp:0,level:1,...o};}
async function awardXP(hero,amount,logger){logger.log(`Awarding ${amount} XP to ${hero.name}`);const u={...hero,xp:hero.xp+amount};if(u.xp>=100)return{...u,level:u.level+1,xp:u.xp-100};return u;}
test.each([[{xp:0},100,2,0],[{xp:50},60,2,10],[{xp:0},50,1,50]])('awardXP: starting xp=%j, award=%i → level=%i, remaining=%i',async(init,award,level,remaining)=>{const logger={log:jest.fn()};const hero=makeHero(init);const result=await awardXP(hero,award,logger);expect(result.level).toBe(level);expect(result.xp).toBe(remaining);expect(logger.log).toHaveBeenCalledWith(`Awarding ${award} XP to Hero`);});
```

## Explanation

Testing number formatting and computed values:

```
it('shows correct total XP', async () => {
  const totalXP = JEST_LEVELS.reduce((sum, l) => sum + l.xpReward, 0); // 390
  render(<GameHome />);
  await waitFor(() => expect(screen.getByText('Jest Unit Testing')).toBeInTheDocument());
  expect(screen.getByText(`${totalXP.toLocaleString()} XP`)).toBeInTheDocument();
});
```

## Starter Code

```javascript
// Hero factory
function makeHero(overrides = {}) {
  return { name: 'Hero', hp: 100, xp: 0, level: 1, ...overrides };
}

// XP service
async function awardXP(hero, amount, logger) {
  logger.log(`Awarding ${amount} XP to ${hero.name}`);
  const updated = { ...hero, xp: hero.xp + amount };
  if (updated.xp >= 100) return { ...updated, level: updated.level + 1, xp: updated.xp - 100 };
  return updated;
}

// Parameterised level-up tests
test.each([
  [{ xp: 0 }, 100, 2, 0],
  [{ xp: 50 }, 60, 2, 10],
  [{ xp: 0 }, 50, 1, 50],
])('awardXP: starting xp=%j, award=%i → level=%i, remaining=%i', async (init, award, level, remaining) => {
  const logger = { log: jest.fn() };
  const hero = makeHero(init);
  const result = await awardXP(hero, award, logger);
  // TODO: Assert that result.level equals level using .toBe().
  // TODO: Assert that result.xp equals remaining using .toBe().
  // TODO: Assert that logger.log was called with the expected arguments.
});
```
