# Mock a Dependency Inline

**Level:** 117
**ID:** `jest-117`
**XP:** 130
**Tags:** `dependency injection`, `mock`, `jest.fn`

## Objective

Replace a dependency on an object with a jest.fn mock.

## Story

The shop depends on a price service. Replace it with a mock for isolated testing.

## Hints
1. Dependency injection makes mocking easy — pass the mock in the constructor.
2. jest.fn().mockReturnValue() creates a stub.
3. Verify both the return value AND that the mock was called correctly.

## Solution

```javascript
const priceService={getPrice:(i)=>i==='sword'?100:50};
function Shop(service){this.buy=(i)=>service.getPrice(i);}
test('shop uses mock price service',()=>{const ms={getPrice:jest.fn().mockReturnValue(999)};const shop=new Shop(ms);const price=shop.buy('sword');expect(price).toBe(999);expect(ms.getPrice).toHaveBeenCalledWith('sword');});
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
const priceService = {
  getPrice: (item) => item === 'sword' ? 100 : 50
};

function Shop(service) {
  this.buy = (item) => service.getPrice(item);
}

test('shop uses mock price service', () => {
  const mockService = { getPrice: jest.fn().mockReturnValue(999) };
  const shop = new Shop(mockService);
  const price = shop.buy('sword');
  // TODO: Assert that price equals 999 using .toBe().
  // TODO: Assert that mockService.getPrice was called with the expected arguments.
});
```
