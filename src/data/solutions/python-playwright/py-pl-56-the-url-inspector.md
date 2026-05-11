# The URL Inspector

**Level:** 56
**ID:** `py-pl-56`
**Difficulty:** medium
**XP:** 200
**Tags:** `url`, `navigation`, `assertion`


## Objective

Navigate to level-02 and use page.url to verify the URL contains 'level-02'. Print 'LEVEL_PASSED' if it does.

## Story

The Cartographer checks the URL to confirm your position on the map.

## Hints
1. page.url is a property (no parentheses needed).
2. Use 'level-02' in page.url.
3. Print 'LEVEL_PASSED' on success.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-02/')
    if 'level-02' in page.url:
        print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-02/')

    # TODO: Check page.url contains 'level-02'

    browser.close()
```
