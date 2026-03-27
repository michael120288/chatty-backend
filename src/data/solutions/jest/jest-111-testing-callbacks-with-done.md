# Testing Callbacks with done

**Level:** 111
**ID:** `jest-111`
**XP:** 120
**Tags:** `done`, `callback`, `async`

## Objective

Use the done callback to test async callback-based code.

## Story

The messenger delivers asynchronously. Use the done callback to signal completion.

## Hints
1. Jest waits for done() before ending the test.
2. If done is never called, Jest times out.
3. Call done(error) to fail the test with an error message.

## Solution

```javascript
function deliverMessage(cb){setTimeout(()=>cb('message delivered'),10);}
test('delivery confirmed',(done)=>{deliverMessage((r)=>{expect(r).toBe('message delivered');done();});});
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
function deliverMessage(callback) {
  setTimeout(() => callback('message delivered'), 10);
}

test('delivery confirmed', (done) => {
  deliverMessage((result) => {
    // TODO: Assert that result equals 'message delivered' using .toBe().
    done();
  });
});
```
