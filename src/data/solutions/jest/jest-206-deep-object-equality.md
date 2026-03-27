# Deep Object Equality

**Level:** 206
**ID:** `jest-206`
**XP:** 120
**Tags:** `deep equality`, `toMatchObject`, `nested`

## Objective

Test deeply nested object equality with toEqual and toMatchObject.

## Story

The dungeon configuration is deeply nested. Test deep equality with precision.

## Hints
1. toEqual requires exact deep match.
2. toMatchObject allows partial matching at any depth.
3. Nested toMatchObject also ignores extra keys.

## Solution

```javascript
const config={server:{host:'localhost',port:3000},db:{url:'mongodb://localhost',name:'dungeon'},features:{darkMode:true,beta:false}};
test('exact config',()=>{expect(config).toEqual({server:{host:'localhost',port:3000},db:{url:'mongodb://localhost',name:'dungeon'},features:{darkMode:true,beta:false}});});
test('partial config check',()=>{expect(config).toMatchObject({server:{port:3000}});});
```

## Explanation

Testing multi-step user flows:

```
it('completes the full registration flow', async () => {
  render(<RegistrationFlow />);
  await userEvent.type(screen.getByLabelText('Username'), 'aria');
  await userEvent.type(screen.getByLabelText('Password'), 'secret123');
  await userEvent.click(screen.getByRole('button', { name: 'Create Account' }));
  await waitFor(() =>
    expect(screen.getByText('Account created!')).toBeInTheDocument()
  );
});
```

## Starter Code

```javascript
const config = {
  server: { host: 'localhost', port: 3000 },
  db: { url: 'mongodb://localhost', name: 'dungeon' },
  features: { darkMode: true, beta: false },
};

test('exact config', () => {
  // TODO: Assert that config deeply equals the expected value using .toEqual().
  //   server: { host: 'localhost', port: 3000 },
  //   db: { url: 'mongodb://localhost', name: 'dungeon' },
  //   features: { darkMode: true, beta: false },
  // });
});

test('partial config check', () => {
  // TODO: Assert that config matches the expected object shape using .toMatchObject().
});
```
