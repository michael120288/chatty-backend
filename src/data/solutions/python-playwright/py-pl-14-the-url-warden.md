# The URL Warden

**Level:** 14
**ID:** `py-pl-14`
**Difficulty:** medium
**XP:** 100
**Tags:** `expect`, `to_have_url`, `url`, `regex`


## Objective

Use expect(page).to_have_url() with a regex or string that matches the current URL, then print 'LEVEL_PASSED'.

## Story

The Gate Warden checks the exact URL of visitors. Assert the current URL contains the level path.

## Hints
1. Use import re and re.compile('level-01') as the pattern.
2. expect(page).to_have_url(re.compile('level-01')) checks the current URL.
3. Print 'LEVEL_PASSED' after the assertion.

## Solution

```python
from playwright.sync_api import sync_playwright, expect
import re

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    expect(page).to_have_url(re.compile('level-01'))
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

    # TODO: Assert the URL contains 'level-01' using expect(page).to_have_url(re.compile(...))
    # Then print 'LEVEL_PASSED'

    browser.close()
```
