# The Title Asserter

**Level:** 73
**ID:** `py-pl-73`
**Difficulty:** medium
**XP:** 230
**Tags:** `expect`, `to_have_title`, `navigation`


## Objective

Navigate to level-03 and use expect(page).to_have_title(re.compile('Level 3')). Print 'LEVEL_PASSED'.

## Story

The Herald asserts the page title with the power of expect.

## Hints
1. to_have_title() accepts a string or regex.
2. re.compile('Level 3') will match titles containing 'Level 3'.
3. Print 'LEVEL_PASSED' after.

## Solution

```python
from playwright.sync_api import sync_playwright, expect
import re

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-03/')
    expect(page).to_have_title(re.compile('Level 3'))
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
    page.goto('http://localhost:5000/pages/level-03/')

    # TODO: expect(page).to_have_title(re.compile('Level 3'))
    # print 'LEVEL_PASSED'

    browser.close()
```
