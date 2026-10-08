# The Chaos Tester

**Level:** 199
**ID:** `py-pl-199`
**Difficulty:** medium
**XP:** 420
**Tags:** `error_handling`, `resilience`, `loop`


## Objective

Attempt to navigate to 3 URLs: level-01 (valid), a non-existent page (invalid), level-02 (valid). Count successes. If >= 2, print 'LEVEL_PASSED'.

## Story

The Resilience Champion tests what happens when things go wrong — and handles it gracefully.

## Hints
1. level-01 and level-02 have h1 elements — they succeed.
2. The non-existent page either 404s or fails.
3. Count successes >= 2.

## Solution

```python
from playwright.sync_api import sync_playwright

urls = ['http://localhost:5000/pages/level-01/', 'http://localhost:5000/pages/does-not-exist/', 'http://localhost:5000/pages/level-02/']
with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    successes = 0
    for url in urls:
        try:
            page.goto(url, timeout=3000)
            if page.locator('h1').count() > 0:
                successes += 1
        except Exception:
            pass
    if successes >= 2:
        print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

urls = [
    'http://localhost:5000/pages/level-01/',
    'http://localhost:5000/pages/does-not-exist/',
    'http://localhost:5000/pages/level-02/',
]

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    successes = 0

    for url in urls:
        try:
            page.goto(url, timeout=3000)
            if page.locator('h1').count() > 0:
                successes += 1
        except Exception:
            pass

    # TODO: print 'LEVEL_PASSED' if successes >= 2

    browser.close()
```
