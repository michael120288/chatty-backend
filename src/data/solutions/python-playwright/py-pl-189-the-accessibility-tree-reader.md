# The Accessibility Tree Reader

**Level:** 189
**ID:** `py-pl-189`
**Difficulty:** medium
**XP:** 330
**Tags:** `accessibility`, `aria`, `snapshot`


## Objective

On level-01 use page.accessibility.snapshot() to get the ARIA snapshot. If snapshot is not None, print 'LEVEL_PASSED'.

## Story

The Accessibility Auditor reads the ARIA tree to ensure the page is screen-reader friendly.

## Hints
1. page.accessibility.snapshot() returns a dict representing the accessibility tree.
2. It includes role, name, children.
3. None means an empty page — level-01 has content.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    snapshot = page.accessibility.snapshot()
    if snapshot is not None:
        print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')

    # TODO: snapshot = page.accessibility.snapshot()
    # print 'LEVEL_PASSED' if snapshot is not None

    browser.close()
```
