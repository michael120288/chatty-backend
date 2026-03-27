# Event Sourcing Pattern

**Level:** 215
**ID:** `jest-215`
**XP:** 140
**Tags:** `event sourcing`, `reducer`, `pattern`

## Objective

Test an event sourcing pattern: record events, replay to reconstruct state.

## Story

The dungeon records events and replays them to rebuild state.

## Hints
1. DAMAGE reduces hp by amount (floor at 0).
2. HEAL increases hp by amount (cap at 100).
3. replay() re-runs all events from initialState.

## Solution

```javascript
function createStore(reducer,init){const events=[];let state=init;return{dispatch(e){state=reducer(state,e);events.push(e);},getState(){return state;},replay(){return events.reduce(reducer,init);}};}
function heroReducer(s,e){switch(e.type){case'DAMAGE':return{...s,hp:Math.max(0,s.hp-e.amount)};case'HEAL':return{...s,hp:Math.min(100,s.hp+e.amount)};default:return s;}}
test('event sourcing',()=>{const store=createStore(heroReducer,{hp:100});store.dispatch({type:'DAMAGE',amount:30});store.dispatch({type:'HEAL',amount:10});expect(store.getState().hp).toBe(80);expect(store.replay().hp).toBe(80);});
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
function createStore(reducer, initialState) {
  const events = [];
  let state = initialState;
  return {
    dispatch(event) { state = reducer(state, event); events.push(event); },
    getState() { return state; },
    replay() { return events.reduce(reducer, initialState); },
  };
}

function heroReducer(state, event) {
  switch (event.type) {
    case 'DAMAGE': return { ...state, hp: Math.max(0, state.hp - event.amount) };
    case 'HEAL': return { ...state, hp: Math.min(100, state.hp + event.amount) };
    default: return state;
  }
}

test('event sourcing', () => {
  const store = createStore(heroReducer, { hp: 100 });
  store.dispatch({ type: 'DAMAGE', amount: 30 });
  store.dispatch({ type: 'HEAL', amount: 10 });
  // TODO: Assert that store.getState( equals 80 using .toBe().
  // TODO: Assert that store.replay( equals 80 using .toBe().
});
```
