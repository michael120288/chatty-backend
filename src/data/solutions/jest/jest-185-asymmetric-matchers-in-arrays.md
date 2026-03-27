# Asymmetric Matchers in Arrays

**Level:** 185
**ID:** `jest-185`
**XP:** 120
**Tags:** `asymmetric`, `arrayContaining`, `objectContaining`

## Objective

Use asymmetric matchers inside array assertions.

## Story

The hero roster must include two known heroes plus any unknown third.

## Hints
1. expect.arrayContaining checks that the array contains these elements (any order).
2. expect.objectContaining ignores extra properties.
3. Combine them for flexible array assertions.

## Solution

```javascript
const roster=[{name:'Alice',level:5},{name:'Bob',level:3},{name:'Unknown',level:99}];
test('roster check',()=>{expect(roster).toEqual(expect.arrayContaining([expect.objectContaining({name:'Alice'}),expect.objectContaining({name:'Bob'})]));});
```

## Explanation

Testing text content and ARIA accessibility:

```
it('renders accessible heading', () => {
  render(<LevelHeader level={LEVEL} />);
  // Role-based query (most accessible)
  expect(screen.getByRole('heading', { name: 'The Selector Sage' })).toBeInTheDocument();
  // Text content
  expect(screen.getByText('+150 XP')).toBeInTheDocument();
});
```

## Starter Code

```javascript
const roster = [
  { name: 'Alice', level: 5 },
  { name: 'Bob', level: 3 },
  { name: 'Unknown', level: 99 },
];

test('roster check', () => {
  expect(roster).toEqual(
    expect.arrayContaining([
      // TODO: expect.objectContaining({ name: 'Alice' }),
      // TODO: expect.objectContaining({ name: 'Bob' }),
    ])
  );
});
```
