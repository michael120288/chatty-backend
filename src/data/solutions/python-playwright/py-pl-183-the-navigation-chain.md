# The Navigation Chain

**Level:** 183
**ID:** `py-pl-183`
**Difficulty:** medium
**XP:** 360
**Tags:** `navigation`, `loop`, `data_collection`


## Objective

Visit level-01, level-02, level-03 in sequence. Collect each page's h1 text. If all 3 are non-empty, print 'LEVEL_PASSED'.

## Story

The Pilgrim visits multiple pages in sequence, collecting data at each stop.

## Hints
1. page.locator('h1').text_content() gets the heading.
2. Append to headings list.
3. all(headings) checks all are truthy.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    headings = []
    for n in ['01', '02', '03']:
        page.goto(f'http://localhost:5000/pages/level-{n}/')
        headings.append(page.locator('h1').text_content())
    if all(headings):
        print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    headings = []

    for n in ['01', '02', '03']:
        page.goto(f'http://localhost:5000/pages/level-{n}/')
        # TODO: Append h1 text_content to headings

    # TODO: print 'LEVEL_PASSED' if all 3 non-empty

    browser.close()
```
