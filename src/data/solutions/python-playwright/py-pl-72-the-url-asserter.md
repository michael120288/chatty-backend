# The URL Asserter

**Level:** 72
**ID:** `py-pl-72`
**Difficulty:** medium
**XP:** 230
**Tags:** `expect`, `to_have_url`, `navigation`


## Objective

Navigate to level-02, then use expect(page).to_have_url() with a regex or string matching the URL. Print 'LEVEL_PASSED'.

## Story

The Navigator asserts the page URL matches what was expected — no surprises.

## Hints
1. expect(page).to_have_url() can accept a string or re.compile pattern.
2. re.compile('level-02') matches any URL containing 'level-02'.
3. Print 'LEVEL_PASSED' after the assertion.

## Solution

```python
from playwright.sync_api import sync_playwright, expect
import re

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-02/')
    expect(page).to_have_url(re.compile('level-02'))
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
    page.goto('http://localhost:5000/pages/level-02/')

    # TODO: expect(page).to_have_url(re.compile('level-02'))
    # print 'LEVEL_PASSED'

    browser.close()
```
