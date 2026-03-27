# Auth Middleware Mock

**Level:** 212
**ID:** `jest-212`
**XP:** 130
**Tags:** `middleware`, `mock`, `auth`

## Objective

Test an auth middleware function with mocked request and response objects.

## Story

The dungeon auth middleware checks tokens. Test it with mock req/res.

## Hints
1. res.status().json() requires mockReturnThis for chaining.
2. next is a jest.fn() — verify it was/wasn't called.
3. req.user is set before next() is called.

## Solution

```javascript
function authMiddleware(ts){return function(req,res,next){const token=req.headers?.authorization;if(!token){res.status(401).json({error:'No token'});return;}const user=ts.verify(token);if(!user){res.status(403).json({error:'Invalid token'});return;}req.user=user;next();}}
test('no token → 401',()=>{const ts={verify:jest.fn()};const req={headers:{}};const res={status:jest.fn().mockReturnThis(),json:jest.fn()};const next=jest.fn();authMiddleware(ts)(req,res,next);expect(res.status).toHaveBeenCalledWith(401);expect(next).not.toHaveBeenCalled();});
test('valid token → next',()=>{const ts={verify:jest.fn().mockReturnValue({id:1,name:'Aria'})};const req={headers:{authorization:'Bearer abc'}};const res={status:jest.fn().mockReturnThis(),json:jest.fn()};const next=jest.fn();authMiddleware(ts)(req,res,next);expect(next).toHaveBeenCalled();expect(req.user).toEqual({id:1,name:'Aria'});});
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
function authMiddleware(tokenService) {
  return function (req, res, next) {
    const token = req.headers?.authorization;
    if (!token) { res.status(401).json({ error: 'No token' }); return; }
    const user = tokenService.verify(token);
    if (!user) { res.status(403).json({ error: 'Invalid token' }); return; }
    req.user = user;
    next();
  };
}

test('no token → 401', () => {
  const ts = { verify: jest.fn() };
  const req = { headers: {} };
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  const next = jest.fn();
  authMiddleware(ts)(req, res, next);
  // TODO: Assert that res.status was called with the expected arguments.
  // TODO: Assert that next was not called.
});

test('valid token → next', () => {
  const ts = { verify: jest.fn().mockReturnValue({ id: 1, name: 'Aria' }) };
  const req = { headers: { authorization: 'Bearer abc' } };
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  const next = jest.fn();
  authMiddleware(ts)(req, res, next);
  // TODO: Assert that next was called.
  // TODO: Assert that req.user deeply equals the expected value using .toEqual().
});
```
