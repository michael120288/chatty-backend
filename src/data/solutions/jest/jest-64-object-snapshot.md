# Object Snapshot

**Level:** 64
**ID:** `jest-64`
**XP:** 110
**Tags:** `toMatchSnapshot`, `objects`, `snapshot`

## Objective

Snapshot a plain object to detect unexpected changes.

## Story

The artifact details must be preserved exactly. Snapshot the whole object.

## Hints
1. toMatchSnapshot() deep-serialises objects.
2. Any key added or changed will fail the test.
3. Update with --updateSnapshot when changes are intentional.

## Solution

```javascript
function getArtifact(){return{id:1,name:'Sword of Truth',damage:50};}
test('artifact snapshot',()=>{expect(getArtifact()).toMatchSnapshot();});
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
function getArtifact() {
  return { id: 1, name: 'Sword of Truth', damage: 50 };
}

test('artifact snapshot', () => {
  // TODO: Assert that getArtifact() matches the snapshot.
});
```
