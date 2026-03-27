# Callback Error Handling

**Level:** 112
**ID:** `jest-112`
**XP:** 120
**Tags:** `done`, `callback`, `error`

## Objective

Pass errors to done() when a callback receives an error.

## Story

The courier may fail. Pass the error to done() to signal failure correctly.

## Hints
1. done(err) fails the test with the given error.
2. Pattern: if (err) return done(err); then assertions.
3. This mirrors the Node.js error-first callback convention.

## Solution

```javascript
function riskyDelivery(s,cb){setTimeout(()=>{if(s)cb(null,'delivered');else cb(new Error('Failed'),null);},10);}
test('successful delivery',(done)=>{riskyDelivery(true,(err,r)=>{if(err)return done(err);expect(r).toBe('delivered');done();});});
```

## Explanation

Testing error boundaries and error states:

```
it('shows error when API fails', async () => {
  jest.spyOn(api, 'fetchLevels').mockRejectedValue(new Error('Network error'));
  render(<GameHome />);
  await waitFor(() =>
    expect(screen.getByText(/Failed to load.*Network error/)).toBeInTheDocument()
  );
});
```

## Starter Code

```javascript
function riskyDelivery(succeed, callback) {
  setTimeout(() => {
    if (succeed) callback(null, 'delivered');
    else callback(new Error('Failed'), null);
  }, 10);
}

test('successful delivery', (done) => {
  riskyDelivery(true, (err, result) => {
    if (err) return done(err);
    // TODO: Assert that result equals 'delivered' using .toBe().
    done();
  });
});
```
