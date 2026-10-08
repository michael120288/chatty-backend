# The Title Scout

**Level:** 55
**ID:** `py-pl-55`
**Difficulty:** medium
**XP:** 200
**Tags:** `title`, `navigation`, `basics`


## Objective

Navigate to level-01 and use page.title() to get the page title. If the title contains 'Level', print 'LEVEL_PASSED'.

## Story

The Scout reads the page title to confirm you've arrived at the right destination.

## Hints
1. page.title() returns the document title as a string.
2. Use 'Level' in title to check.
3. Print 'LEVEL_PASSED' if the condition is met.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    title = page.title()
    if 'Level' in title:
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

    # TODO: Get page title and check if 'Level' is in it

    browser.close()
```
