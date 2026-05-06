# Real-World: testing a REST API client

**Level:** 231
**ID:** `vitest-231`
**XP:** 250
**Tags:** `HTTP`, `integration`

## Objective

Complete the starter code using Real-World: testing a REST API client so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Real-World: testing a REST API client to implement the missing assertions and make everything pass.

## Hints
1. Section 16: Real-World Patterns

## Solution

```javascript
import { test, expect, vi, beforeEach } from 'vitest';

class ApiClient {
  constructor(private baseUrl: string, private token: string) {}

  async get<T>(path: string): Promise<T> {
    const res = await fetch(\`\${this.baseUrl}\${path}\`, {
      headers: { Authorization: \`Bearer \${this.token}\` },
    });
    if (!res.ok) throw new Error(\`HTTP \${res.status}: \${path}\`);
    return res.json();
  }

  async post<T>(path: string, body: unknown): Promise<T> {
    const res = await fetch(\`\${this.baseUrl}\${path}\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: \`Bearer \${this.token}\` },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(\`HTTP \${res.status}: \${path}\`);
    return res.json();
  }
}

beforeEach(() => { vi.restoreAllMocks(); });

test('ApiClient.get calls fetch with correct headers', async () => {
  const mockFetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ id: 1, name: 'Alice' }),
  });
  vi.stubGlobal('fetch', mockFetch);

  const client = new ApiClient('https://api.test.com', 'my-token');
  const user = await client.get('/users/1');

  expect(mockFetch).toHaveBeenCalledWith(
    'https://api.test.com/users/1',
    expect.objectContaining({ headers: expect.objectContaining({ Authorization: 'Bearer my-token' }) })
  );
  expect(user).toEqual({ id: 1, name: 'Alice' });
  vi.unstubAllGlobals();
});

test('ApiClient.get throws on non-ok response', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 404, json: async () => ({}) }));
  const client = new ApiClient('https://api.test.com', 'token');
  await expect(client.get('/missing')).rejects.toThrow('HTTP 404');
  vi.unstubAllGlobals();
});
```

## Explanation

`Real` Test an HTTP client class with mocked fetch.

## Starter Code

```javascript
import { test, expect, vi, beforeEach } from 'vitest';

class ApiClient {
  constructor(baseUrl, token) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  async get(path) {
    const res = await fetch(`${this.baseUrl}${path}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${path}`);
    return res.json();
  }

  async post(path, body) {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${this.token}` },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${path}`);
    return res.json();
  }
}

beforeEach(() => { vi.restoreAllMocks(); });

test('ApiClient.get calls fetch with correct headers', async () => {
  const mockFetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ id: 1, name: 'Alice' }),
  });
  vi.stubGlobal('fetch', mockFetch);

  const client = new ApiClient('https://api.test.com', 'my-token');
  const user = await client.get('/users/1');

  // TODO: assert mockFetch was called with the correct URL and Authorization header
  // TODO: assert user.name equals 'Alice'
  vi.unstubAllGlobals();
});

test('ApiClient.get throws on non-ok response', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 404, json: async () => ({}) }));
  const client = new ApiClient('https://api.test.com', 'token');
  // TODO: assert client.get('/missing') rejects with an error matching 'HTTP 404'
  vi.unstubAllGlobals();
});
```
