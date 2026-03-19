import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config({});

const API_URL = process.env.API_URL || 'http://localhost:5000/api/v1';
const USERNAME = process.env.SEED_USERNAME || 'admin';
const PASSWORD = process.env.SEED_PASSWORD || 'qwerty';

const CATEGORY = 'Jest';

interface Card {
  question: string;
  answer: string;
  difficulty: string;
  questionCodeSnippet?: string;
  answerCodeSnippet?: string;
}

const cards: Card[] = [
  // ─── Installation & Setup ──────────────────────────────────────────────────
  {
    question: 'How do you install Jest as a dev dependency?',
    answer: 'Use your package manager to add Jest to devDependencies, then add a "test" script to package.json.',
    questionCodeSnippet: `npm install --save-dev jest`,
    answerCodeSnippet: `// package.json
{
  "scripts": {
    "test": "jest"
  }
}`,
    difficulty: 'beginner'
  },
  {
    question: 'What command generates an interactive Jest configuration file?',
    answer: 'Run "npm init jest@latest" (or the equivalent for yarn/pnpm/bun). It walks you through questions and creates jest.config.js.',
    answerCodeSnippet: `npm init jest@latest
# or
yarn create jest`,
    difficulty: 'beginner'
  },
  {
    question: 'What Babel packages are needed to use Jest with modern JavaScript?',
    answer: 'Install babel-jest, @babel/core, and @babel/preset-env as dev dependencies, then add a babel.config.js targeting the current Node version.',
    answerCodeSnippet: `npm install --save-dev babel-jest @babel/core @babel/preset-env

// babel.config.js
module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
};`,
    difficulty: 'beginner'
  },
  {
    question: 'What are the two ways to add TypeScript support to Jest?',
    answer: 'Option 1: ts-jest — compiles TypeScript and performs type-checking. Option 2: @babel/preset-typescript via babel-jest — only transpiles, no type-checking.',
    answerCodeSnippet: `// Option 1 (type-checking)
npm install --save-dev ts-jest

// Option 2 (transpile only)
npm install --save-dev @babel/preset-typescript`,
    difficulty: 'intermediate'
  },
  {
    question: 'Which environment variable does Jest set automatically when running tests?',
    answer: 'Jest sets process.env.NODE_ENV to "test" automatically if it is not already set.',
    difficulty: 'intermediate'
  },

  // ─── Basic Test Structure ──────────────────────────────────────────────────
  {
    question: 'What is the basic structure of a Jest test?',
    answer: 'Use test() (or it()) with a description string and a callback. Inside the callback, call expect() with the value being tested, then chain a matcher.',
    answerCodeSnippet: `test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3);
});`,
    difficulty: 'beginner'
  },
  {
    question: 'What does describe() do in Jest?',
    answer: 'describe() groups related tests into a block. It creates a named scope for tests and setup/teardown hooks, making output easier to read and enabling scoped beforeEach/afterEach.',
    answerCodeSnippet: `describe('sum()', () => {
  test('adds positive numbers', () => {
    expect(sum(1, 2)).toBe(3);
  });
  test('adds negative numbers', () => {
    expect(sum(-1, -2)).toBe(-3);
  });
});`,
    difficulty: 'beginner'
  },
  {
    question: 'What is the difference between test() and it() in Jest?',
    answer: 'They are identical — it() is an alias for test(). Both define a single test case. Use whichever reads better for your test description.',
    difficulty: 'beginner'
  },
  {
    question: 'How do you skip a test or describe block in Jest?',
    answer: 'Prefix with .skip — test.skip() or describe.skip(). The test is reported as "skipped" rather than deleted. Also works as xtest() or xit().',
    answerCodeSnippet: `test.skip('this test is temporarily disabled', () => {
  expect(brokenFeature()).toBe(true);
});`,
    difficulty: 'beginner'
  },
  {
    question: 'How do you run only a specific test or describe block in Jest?',
    answer: 'Use .only — test.only() or describe.only(). All other tests in the file are skipped. Useful when debugging a failing test. Alias: fdescribe() / fit().',
    answerCodeSnippet: `test.only('this is the only test that will run', () => {
  expect(1 + 1).toBe(2);
});`,
    difficulty: 'beginner'
  },

  // ─── Core Matchers ─────────────────────────────────────────────────────────
  {
    question: 'What is the difference between toBe() and toEqual() in Jest?',
    answer: 'toBe() uses Object.is for strict equality — it fails for objects with same shape but different references. toEqual() recursively checks all fields, so it passes for objects with the same content.',
    answerCodeSnippet: `const obj = { a: 1 };
expect(obj).toBe(obj);          // ✓ same reference
expect(obj).not.toBe({ a: 1 }); // ✓ different reference

expect(obj).toEqual({ a: 1 });  // ✓ same content`,
    difficulty: 'beginner'
  },
  {
    question: 'How do you negate any Jest matcher?',
    answer: 'Chain .not before the matcher. It inverts the assertion so the test passes when the original matcher would have failed.',
    answerCodeSnippet: `expect(5).not.toBe(4);
expect([1, 2]).not.toContain(3);
expect(fn).not.toThrow();`,
    difficulty: 'beginner'
  },
  {
    question: 'What are the four truthiness matchers in Jest and what do they each match?',
    answer: 'toBeNull() — only null. toBeUndefined() — only undefined. toBeTruthy() — anything truthy in a boolean context. toBeFalsy() — anything falsy (0, "", null, undefined, false, NaN).',
    answerCodeSnippet: `expect(null).toBeNull();
expect(undefined).toBeUndefined();
expect(1).toBeTruthy();
expect(0).toBeFalsy();`,
    difficulty: 'beginner'
  },
  {
    question: 'Why should you use toBeCloseTo() instead of toBe() for floating point comparisons?',
    answer: 'Floating point arithmetic produces rounding errors (0.1 + 0.2 = 0.30000000000000004). toBeCloseTo() checks equality within a configurable number of decimal places, avoiding false failures.',
    answerCodeSnippet: `expect(0.1 + 0.2).not.toBe(0.3);        // ✓ would fail with toBe
expect(0.1 + 0.2).toBeCloseTo(0.3, 5);  // ✓ passes`,
    difficulty: 'intermediate'
  },
  {
    question: 'How do you test that a string matches a pattern in Jest?',
    answer: 'Use toMatch() with a regular expression or a substring string.',
    answerCodeSnippet: `expect('Christoph').toMatch(/stop/);
expect('hello world').toMatch('world');
expect('team').not.toMatch(/I/i);`,
    difficulty: 'beginner'
  },
  {
    question: 'How do you check that an array contains a specific item in Jest?',
    answer: 'Use toContain(). It works with arrays and any iterable (e.g. Set). It uses strict equality for each item.',
    answerCodeSnippet: `const list = ['apple', 'banana', 'cherry'];
expect(list).toContain('banana');
expect(new Set(list)).toContain('apple');`,
    difficulty: 'beginner'
  },
  {
    question: 'How do you assert that a function throws an error in Jest?',
    answer: 'Use toThrow(). The function must be wrapped in an arrow function — calling it directly causes the error to propagate before Jest can catch it.',
    answerCodeSnippet: `function boom() {
  throw new Error('kaboom!');
}

expect(() => boom()).toThrow();
expect(() => boom()).toThrow(Error);
expect(() => boom()).toThrow('kaboom');
expect(() => boom()).toThrow(/kaboom/);`,
    difficulty: 'intermediate'
  },
  {
    question: 'What does expect.assertions(n) do and when should you use it?',
    answer: 'It verifies that exactly n assertions were called during a test. Use it in async tests (especially with .catch()) to ensure the assertion inside actually runs and the test does not silently pass if the promise never rejects.',
    answerCodeSnippet: `test('async error is caught', () => {
  expect.assertions(1);
  return fetchData().catch(err => {
    expect(err).toMatch('error');
  });
});`,
    difficulty: 'intermediate'
  },

  // ─── Async Testing ─────────────────────────────────────────────────────────
  {
    question: 'What are the three main ways to test asynchronous code in Jest?',
    answer: '1. Return a Promise — Jest waits for it to resolve/reject. 2. async/await — use await inside an async test function. 3. done callback — call done() when the async operation completes.',
    difficulty: 'intermediate'
  },
  {
    question: 'How do you test a resolved Promise value using async/await in Jest?',
    answer: 'Mark the test callback as async and await the promise. Then assert on the resolved value.',
    answerCodeSnippet: `test('resolves to peanut butter', async () => {
  const data = await fetchData();
  expect(data).toBe('peanut butter');
});`,
    difficulty: 'beginner'
  },
  {
    question: 'How do you use .resolves and .rejects matchers in Jest?',
    answer: '.resolves unwraps a fulfilled promise so you can assert on its value. .rejects unwraps a rejected promise. You must await (or return) these assertions.',
    answerCodeSnippet: `test('resolves', async () => {
  await expect(fetchData()).resolves.toBe('peanut butter');
});

test('rejects', async () => {
  await expect(fetchData()).rejects.toMatch('error');
});`,
    difficulty: 'intermediate'
  },
  {
    question: 'What is the done callback in Jest and when is it needed?',
    answer: 'Jest injects done as a parameter when you declare it. Call done() to signal the test is finished. Call done(error) to fail the test. Used for legacy callback-style APIs that do not return promises.',
    answerCodeSnippet: `test('callback style', done => {
  fetchData((error, data) => {
    if (error) { done(error); return; }
    try {
      expect(data).toBe('peanut butter');
      done();
    } catch (e) {
      done(e);
    }
  });
});`,
    difficulty: 'intermediate'
  },
  {
    question: 'What happens if you forget to return or await a Promise assertion in Jest?',
    answer: 'The test completes before the promise resolves, so the assertion never runs and the test passes even if the value is wrong. Always return or await async assertions.',
    answerCodeSnippet: `// ❌ Bug: test always passes
test('wrong', () => {
  expect(fetchData()).resolves.toBe('wrong value');
});

// ✓ Correct
test('correct', async () => {
  await expect(fetchData()).resolves.toBe('peanut butter');
});`,
    difficulty: 'intermediate'
  },

  // ─── Setup & Teardown ──────────────────────────────────────────────────────
  {
    question: 'What are the four setup and teardown hooks in Jest?',
    answer: 'beforeAll() — runs once before all tests in scope. afterAll() — runs once after all tests. beforeEach() — runs before every test. afterEach() — runs after every test.',
    answerCodeSnippet: `beforeAll(() => connectDB());
afterAll(() => disconnectDB());
beforeEach(() => seedDB());
afterEach(() => clearDB());`,
    difficulty: 'beginner'
  },
  {
    question: 'How does hook scoping work inside describe() blocks in Jest?',
    answer: 'Hooks declared inside a describe() only apply to tests within that block. Outer hooks run first. The order is: outer beforeAll → outer beforeEach → inner beforeEach → test → inner afterEach → outer afterEach → inner afterAll → outer afterAll.',
    answerCodeSnippet: `beforeEach(() => initGlobal());    // runs for ALL tests

describe('group A', () => {
  beforeEach(() => initGroupA());   // only for group A tests

  test('test 1', () => { /* initGlobal + initGroupA ran */ });
});`,
    difficulty: 'intermediate'
  },
  {
    question: 'In what order does Jest execute describe blocks vs test callbacks?',
    answer: 'All describe() callback bodies execute first (collecting tests), then Jest runs the actual tests in order. This means code directly inside describe() (not in a test/hook) runs before any test, which is rarely what you want.',
    answerCodeSnippet: `describe('order demo', () => {
  console.log('1 - describe body');   // runs FIRST
  beforeAll(() => console.log('2 - beforeAll'));
  test('t1', () => console.log('3 - test'));
});
// Output: 1, 2, 3`,
    difficulty: 'advanced'
  },

  // ─── Mock Functions ────────────────────────────────────────────────────────
  {
    question: 'How do you create a mock function in Jest and what does it track?',
    answer: 'Use jest.fn(). The returned function tracks: .mock.calls (all call arguments), .mock.results (all return values), .mock.instances (instances when called with new), and .mock.contexts (this values).',
    answerCodeSnippet: `const mockFn = jest.fn();
mockFn('a', 'b');
mockFn('c');

mockFn.mock.calls;    // [['a','b'], ['c']]
mockFn.mock.calls[0]; // ['a', 'b']`,
    difficulty: 'beginner'
  },
  {
    question: 'What is the difference between mockReturnValue() and mockReturnValueOnce()?',
    answer: 'mockReturnValue() sets a default return value used every time the mock is called. mockReturnValueOnce() sets a value used only for the next call. Once-values are consumed in order before falling back to the default.',
    answerCodeSnippet: `const mock = jest.fn()
  .mockReturnValueOnce(10)
  .mockReturnValueOnce('x')
  .mockReturnValue(true);

mock(); // 10
mock(); // 'x'
mock(); // true
mock(); // true`,
    difficulty: 'intermediate'
  },
  {
    question: 'How do you make a mock function return a resolved Promise?',
    answer: 'Use mockResolvedValue() for a default resolved value, or mockResolvedValueOnce() for a single call. These are sugar for mockReturnValue(Promise.resolve(value)).',
    answerCodeSnippet: `const fetchUser = jest.fn()
  .mockResolvedValueOnce({ id: 1, name: 'Alice' })
  .mockResolvedValue(null);

await fetchUser(); // { id: 1, name: 'Alice' }
await fetchUser(); // null`,
    difficulty: 'intermediate'
  },
  {
    question: 'How do you provide a full implementation to a mock function?',
    answer: 'Pass the implementation to jest.fn(), or use mockImplementation() / mockImplementationOnce() after creation.',
    answerCodeSnippet: `// inline
const double = jest.fn(x => x * 2);

// after creation
const mock = jest.fn();
mock.mockImplementation(x => x * 3);

// once only
mock.mockImplementationOnce(() => 'special');`,
    difficulty: 'intermediate'
  },
  {
    question: 'How do you spy on an existing method without replacing its implementation?',
    answer: 'Use jest.spyOn(object, methodName). It wraps the real function with a mock so you can assert calls while keeping the original behavior. Call .mockRestore() to undo it.',
    answerCodeSnippet: `const video = { play: () => 'playing' };

const spy = jest.spyOn(video, 'play');
video.play();

expect(spy).toHaveBeenCalled();
spy.mockRestore(); // restores original`,
    difficulty: 'intermediate'
  },
  {
    question: 'What is the difference between jest.spyOn() and jest.fn()?',
    answer: 'jest.fn() creates a brand-new standalone mock with no real implementation. jest.spyOn() wraps an existing object method — it calls through to the real implementation by default and can be restored.',
    difficulty: 'intermediate'
  },
  {
    question: 'What do the mock assertion matchers toHaveBeenCalled() and toHaveBeenCalledWith() check?',
    answer: 'toHaveBeenCalled() passes if the mock was called at least once. toHaveBeenCalledWith(arg1, arg2) passes if any call matched those exact arguments.',
    answerCodeSnippet: `const mock = jest.fn();
mock('hello', 42);

expect(mock).toHaveBeenCalled();
expect(mock).toHaveBeenCalledWith('hello', 42);
expect(mock).toHaveBeenCalledTimes(1);`,
    difficulty: 'beginner'
  },

  // ─── Module Mocking ────────────────────────────────────────────────────────
  {
    question: 'How do you mock an entire module in Jest?',
    answer: 'Call jest.mock("module-name") at the top of the test file. Jest auto-mocks all exports — functions become jest.fn() returning undefined. You can then configure return values per test.',
    answerCodeSnippet: `jest.mock('axios');
import axios from 'axios';

test('fetches users', async () => {
  axios.get.mockResolvedValue({ data: [{ name: 'Bob' }] });
  const data = await fetchUsers();
  expect(data[0].name).toBe('Bob');
});`,
    difficulty: 'intermediate'
  },
  {
    question: 'How do you partially mock a module, keeping real implementations for some exports?',
    answer: 'Use jest.mock() with a factory function. Inside, call jest.requireActual() to get the real module, spread it, then override specific exports.',
    answerCodeSnippet: `jest.mock('../utils', () => {
  const real = jest.requireActual('../utils');
  return {
    ...real,
    formatDate: jest.fn(() => '2024-01-01'), // mocked
    // parseDate uses real implementation
  };
});`,
    difficulty: 'advanced'
  },
  {
    question: 'How do you clear, reset, and restore mocks in Jest — and what is the difference?',
    answer: 'clearAllMocks() — clears call history and instances but keeps implementation. resetAllMocks() — clears everything including return values/implementations. restoreAllMocks() — restores spied methods to their original implementation.',
    answerCodeSnippet: `afterEach(() => {
  jest.clearAllMocks();   // clear call records
});

afterAll(() => {
  jest.restoreAllMocks(); // undo jest.spyOn()
});`,
    difficulty: 'intermediate'
  },

  // ─── Timer Mocking ─────────────────────────────────────────────────────────
  {
    question: 'How do you mock timers in Jest to avoid waiting for setTimeout/setInterval?',
    answer: 'Call jest.useFakeTimers() to replace global timer functions with mock implementations. Then use jest.runAllTimers() or jest.advanceTimersByTime(ms) to control time. Call jest.useRealTimers() to restore.',
    answerCodeSnippet: `jest.useFakeTimers();

test('fires callback after 1 second', () => {
  const callback = jest.fn();
  setTimeout(callback, 1000);

  expect(callback).not.toHaveBeenCalled();
  jest.advanceTimersByTime(1000);
  expect(callback).toHaveBeenCalledTimes(1);
});`,
    difficulty: 'intermediate'
  },
  {
    question: 'What is the difference between jest.runAllTimers() and jest.advanceTimersByTime()?',
    answer: 'runAllTimers() exhausts all pending timers immediately, including those queued by other timers. advanceTimersByTime(ms) advances the clock by exactly ms milliseconds, firing only timers that fall within that window.',
    difficulty: 'advanced'
  },

  // ─── Snapshot Testing ──────────────────────────────────────────────────────
  {
    question: 'What is snapshot testing in Jest?',
    answer: 'Snapshot testing serializes a value (e.g. a rendered component or object) and saves it to a .snap file on first run. On subsequent runs it compares against the saved snapshot, failing if anything changed.',
    answerCodeSnippet: `test('renders correctly', () => {
  const tree = renderer.create(<Link href="/">Home</Link>).toJSON();
  expect(tree).toMatchSnapshot();
});`,
    difficulty: 'intermediate'
  },
  {
    question: 'How do you update an outdated snapshot in Jest?',
    answer: 'Run Jest with the --updateSnapshot (-u) flag. This regenerates all failing snapshots and saves them as the new baseline.',
    answerCodeSnippet: `jest --updateSnapshot
# or
jest -u`,
    difficulty: 'beginner'
  },

  // ─── Configuration ─────────────────────────────────────────────────────────
  {
    question: 'What are the three places you can define Jest configuration?',
    answer: '1. jest.config.js (or .ts/.mjs/.cjs) — standalone config file. 2. The "jest" key inside package.json. 3. Inline via the --config CLI flag pointing to a JSON/JS file.',
    answerCodeSnippet: `// jest.config.js
/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  coverageThreshold: { global: { lines: 70 } },
};`,
    difficulty: 'beginner'
  },
  {
    question: 'What does the testEnvironment Jest config option control?',
    answer: 'It sets the global environment Jest simulates for tests. "node" provides Node.js globals (no DOM). "jsdom" (default for projects) provides browser-like globals (document, window). You can also supply a custom environment.',
    answerCodeSnippet: `// jest.config.js
module.exports = {
  testEnvironment: 'node',      // for backend tests
  // testEnvironment: 'jsdom',  // for frontend/React tests
};`,
    difficulty: 'intermediate'
  },
  {
    question: 'What does the moduleNameMapper Jest config option do?',
    answer: 'It maps import paths matching a regex to a different module path. Used to resolve path aliases (e.g. @components → src/components), stub static assets (images, CSS), or swap implementations in tests.',
    answerCodeSnippet: `// jest.config.js
module.exports = {
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '\\.(css|png|svg)$': '<rootDir>/src/__mocks__/fileMock.js',
  },
};`,
    difficulty: 'intermediate'
  },
  {
    question: 'What is the setupFilesAfterFramework config option in Jest?',
    answer: 'setupFilesAfterFramework (or setupFilesAfterFramework) is a list of modules to run after the test framework is installed in the environment. Used to configure matchers (e.g. @testing-library/jest-dom), set globals, or start mock servers.',
    answerCodeSnippet: `// jest.config.js
module.exports = {
  setupFilesAfterFramework: ['<rootDir>/src/setupTests.js'],
};

// setupTests.js
import '@testing-library/jest-dom';`,
    difficulty: 'intermediate'
  },
  {
    question: 'How do you enforce a minimum code coverage threshold in Jest?',
    answer: 'Set coverageThreshold in jest.config.js. Jest will fail if coverage falls below the specified percentages. You can set thresholds globally or per file.',
    answerCodeSnippet: `// jest.config.js
module.exports = {
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};`,
    difficulty: 'intermediate'
  },

  // ─── Advanced ──────────────────────────────────────────────────────────────
  {
    question: 'What does jest.requireActual() do and when do you need it?',
    answer: 'It imports the real module, bypassing any jest.mock() override. Use it inside a mock factory to keep part of the real implementation while overriding specific exports.',
    answerCodeSnippet: `jest.mock('../config', () => ({
  ...jest.requireActual('../config'), // keep real exports
  featureFlag: true,                  // override one value
}));`,
    difficulty: 'advanced'
  },
  {
    question: 'What is the each() table-driven test helper in Jest?',
    answer: 'test.each() runs the same test with multiple sets of inputs/outputs defined in a table (array of arrays or tagged template literal). Avoids duplication when testing the same logic with different values.',
    answerCodeSnippet: `test.each([
  [1, 1, 2],
  [2, 3, 5],
  [0, -1, -1],
])('sum(%i, %i) = %i', (a, b, expected) => {
  expect(sum(a, b)).toBe(expected);
});`,
    difficulty: 'intermediate'
  },
  {
    question: 'How do you run only tests matching a name pattern from the CLI?',
    answer: 'Use the -t flag (or --testNamePattern) with a regex or string. Jest runs only tests whose full name (describe + test) matches the pattern.',
    answerCodeSnippet: `jest -t "adds two numbers"
# or
jest --testNamePattern "auth"`,
    difficulty: 'beginner'
  },
];

async function signIn(): Promise<{ token: string; profilePicture: string; avatarColor: string }> {
  const res = await axios.post(`${API_URL}/signin`, { username: USERNAME, password: PASSWORD });
  return {
    token: res.data.token,
    profilePicture: res.data.user?.profilePicture || '',
    avatarColor: res.data.user?.avatarColor || '#2196f3'
  };
}

async function seedCards(): Promise<void> {
  console.log(`Signing in as "${USERNAME}"...`);
  const { token, profilePicture } = await signIn();
  console.log(`Signed in. Seeding ${cards.length} Jest flashcards...\n`);

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const body = {
      question: card.question,
      answer: card.answer,
      category: CATEGORY,
      difficulty: card.difficulty,
      questionCodeSnippet: card.questionCodeSnippet || '',
      answerCodeSnippet: card.answerCodeSnippet || '',
      privacy: 'public',
      profilePicture
    };

    try {
      await axios.post(`${API_URL}/cards`, body, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(`[${i + 1}/${cards.length}] ✓ "${card.question.slice(0, 70)}"`);
    } catch (err: any) {
      console.error(`[${i + 1}/${cards.length}] ✗ FAILED: ${err?.response?.data?.message || err.message}`);
    }
  }

  console.log('\nDone.');
}

seedCards().catch((err) => {
  console.error(err?.response?.data || err.message);
  process.exit(1);
});
