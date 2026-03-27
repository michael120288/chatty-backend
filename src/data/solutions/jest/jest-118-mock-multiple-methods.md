# Mock Multiple Methods

**Level:** 118
**ID:** `jest-118`
**XP:** 130
**Tags:** `mock`, `multiple methods`, `toEqual`

## Objective

Mock an object with multiple jest.fn methods and verify each.

## Story

The dungeon API has multiple endpoints. Mock all of them for a unit test.

## Hints
1. Mock objects can have multiple jest.fn properties.
2. Each mock records its own calls independently.
3. toEqual does deep comparison for returned objects.

## Solution

```javascript
function QuestManager(api){this.start=(id)=>api.startQuest(id);this.complete=(id)=>api.completeQuest(id);}
test('quest lifecycle',()=>{const api={startQuest:jest.fn().mockReturnValue({started:true}),completeQuest:jest.fn().mockReturnValue({reward:100})};const qm=new QuestManager(api);const s=qm.start(1);const c=qm.complete(1);expect(s).toEqual({started:true});expect(c).toEqual({reward:100});expect(api.startQuest).toHaveBeenCalledWith(1);expect(api.completeQuest).toHaveBeenCalledWith(1);});
```

## Explanation

`jest.mock` with `__mocks__` folder: place a file at `__mocks__/moduleName.js` to auto-mock across all tests.

```
// __mocks__/@services/api/game/game.service.js
export const gameService = {
  getLevels: jest.fn(),
  getLevel: jest.fn(),
};
```

In tests: `jest.mock('@services/api/game/game.service')` will use your manual mock automatically.

## Starter Code

```javascript
function QuestManager(api) {
  this.start = (id) => api.startQuest(id);
  this.complete = (id) => api.completeQuest(id);
}

test('quest lifecycle', () => {
  const api = {
    startQuest: jest.fn().mockReturnValue({ started: true }),
    completeQuest: jest.fn().mockReturnValue({ reward: 100 }),
  };
  const qm = new QuestManager(api);

  const started = qm.start(1);
  const completed = qm.complete(1);

  // TODO: Assert that started deeply equals the expected value using .toEqual().
  // TODO: Assert that completed deeply equals the expected value using .toEqual().
  // TODO: Assert that api.startQuest was called with the expected arguments.
  // TODO: Assert that api.completeQuest was called with the expected arguments.
});
```
