# HTTP Client Mock

**Level:** 211
**ID:** `jest-211`
**XP:** 130
**Tags:** `API client`, `HTTP`, `mock`, `async`

## Objective

Test an API client by mocking its http dependency.

## Story

The dungeon API client makes HTTP calls. Mock the HTTP layer.

## Hints
1. Inject http as a dependency for easy mocking.
2. mockResolvedValue wraps the response in a Promise.
3. Verify both the return value and the http call arguments.

## Solution

```javascript
function makeApiClient(http){return{async getHero(id){const r=await http.get(`/heroes/${id}`);return r.data;},async createHero(d){const r=await http.post('/heroes',d);return r.data;}};}
test('getHero',async()=>{const http={get:jest.fn().mockResolvedValue({data:{id:1,name:'Aria'}}),post:jest.fn()};const c=makeApiClient(http);const h=await c.getHero(1);expect(h).toEqual({id:1,name:'Aria'});expect(http.get).toHaveBeenCalledWith('/heroes/1');});
test('createHero',async()=>{const http={get:jest.fn(),post:jest.fn().mockResolvedValue({data:{id:2,name:'Bob'}})};const c=makeApiClient(http);const h=await c.createHero({name:'Bob'});expect(h).toEqual({id:2,name:'Bob'});expect(http.post).toHaveBeenCalledWith('/heroes',{name:'Bob'});});
```

## Explanation

Testing component integration with services:

```
it('calls service with correct args on submit', async () => {
  const mockSubmit = jest.fn().mockResolvedValue({ passed: true });
  render(<CodeSubmitter onSubmit={mockSubmit} levelId="level-01" />);
  await userEvent.click(screen.getByRole('button', { name: 'Run Code' }));
  expect(mockSubmit).toHaveBeenCalledWith('level-01', expect.any(String));
});
```

## Starter Code

```javascript
function makeApiClient(http) {
  return {
    async getHero(id) {
      const res = await http.get(`/heroes/${id}`);
      return res.data;
    },
    async createHero(data) {
      const res = await http.post('/heroes', data);
      return res.data;
    },
  };
}

test('getHero', async () => {
  const http = {
    get: jest.fn().mockResolvedValue({ data: { id: 1, name: 'Aria' } }),
    post: jest.fn(),
  };
  const client = makeApiClient(http);
  const hero = await client.getHero(1);
  // TODO: Assert that hero deeply equals the expected value using .toEqual().
  // TODO: Assert that http.get was called with the expected arguments.
});

test('createHero', async () => {
  const http = {
    get: jest.fn(),
    post: jest.fn().mockResolvedValue({ data: { id: 2, name: 'Bob' } }),
  };
  const client = makeApiClient(http);
  const hero = await client.createHero({ name: 'Bob' });
  // TODO: Assert that hero deeply equals the expected value using .toEqual().
  // TODO: Assert that http.post was called with the expected arguments.
});
```
