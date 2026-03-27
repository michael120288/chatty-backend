# Boss: Async + Mocks

**Level:** 62
**ID:** `jest-62`
**XP:** 200
**Tags:** `boss`, `async`, `spyOn`, `mockResolvedValue`

## Objective

Write an async test that uses a mocked async dependency.

## Story

The final dungeon combines async fetching with mocked dependencies. Conquer both.

## Hints
1. mockResolvedValue on a spy makes it return a resolved promise.
2. await the function under test.
3. The spy intercepts the DB call — getItemName gets the mocked data.

## Solution

```javascript
const inventoryApi={async getItem(id){return{id,name:'unknown'};}};
async function getItemName(id){const item=await inventoryApi.getItem(id);return item.name;}
test('getItemName mocked',async()=>{const spy=jest.spyOn(inventoryApi,'getItem').mockResolvedValue({id:1,name:'Excalibur'});const name=await getItemName(1);expect(name).toBe('Excalibur');expect(spy).toHaveBeenCalledWith(1);spy.mockRestore();});
```

## Explanation

Snapshot testing captures the rendered output of a component and stores it in a `.snap` file.

```
import { render } from '@testing-library/react';
it('renders correctly', () => {
  const { container } = render(<Button label="Click me" />);
  expect(container).toMatchSnapshot();
});
```

On first run, Jest creates the snapshot. On subsequent runs, it compares. Update with `jest --updateSnapshot`.

## Starter Code

```javascript
const inventoryApi = {
  async getItem(id) {
    // real implementation would hit a DB
    return { id, name: 'unknown' };
  }
};

async function getItemName(id) {
  const item = await inventoryApi.getItem(id);
  return item.name;
}

test('getItemName uses mocked API', async () => {
  const spy = jest.spyOn(inventoryApi, 'getItem')
    .mockResolvedValue({ id: 1, name: 'Excalibur' });

  // TODO: const name = await getItemName(1)
  // TODO: Assert that name equals 'Excalibur' using .toBe().
  // TODO: Assert that spy was called with the expected arguments.

  spy.mockRestore();
});
```
