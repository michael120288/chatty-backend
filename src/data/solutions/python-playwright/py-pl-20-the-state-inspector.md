# The State Inspector

**Level:** 20
**ID:** `py-pl-20`
**Difficulty:** medium
**XP:** 100
**Tags:** `expect`, `multiple-assertions`, `to_have_title`


## Objective

Assert the page title is not empty AND the body is visible. Print 'LEVEL_PASSED' after both pass.

## Story

The Inspector verifies the page state after navigation. Use multiple assertions to confirm the page loaded correctly.

## Hints
1. Use expect(page).to_have_title(re.compile('.+')) for the title.
2. Use expect(page.locator('body')).to_be_visible() for visibility.
3. Both assertions must pass before printing 'LEVEL_PASSED'.

## Solution

```python
from playwright.sync_api import sync_playwright, expect
import re

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    expect(page).to_have_title(re.compile('.+'))
    expect(page.locator('body')).to_be_visible()
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright, expect
import re

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')

    # TODO: Two assertions: title not empty, body visible
    # Then print 'LEVEL_PASSED'

    browser.close()
```
