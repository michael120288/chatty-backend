# The CSS Class Checker

**Level:** 76
**ID:** `py-pl-76`
**Difficulty:** medium
**XP:** 240
**Tags:** `expect`, `to_have_class`, `css`


## Objective

On level-02 click the reveal button. Then use expect(page.locator('#secret-message')).to_have_class(re.compile('visible')). Print 'LEVEL_PASSED'.

## Story

The Style Auditor inspects classes to confirm visual states were applied.

## Hints
1. After clicking, the #secret-message gets a 'visible' class.
2. to_have_class() accepts a regex.
3. Print 'LEVEL_PASSED' after.

## Solution

```python
from playwright.sync_api import sync_playwright, expect
import re

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-02/')
    page.locator('#reveal-btn').click()
    expect(page.locator('#secret-message')).to_have_class(re.compile('visible'))
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

    # TODO: Click reveal button
    # TODO: expect(page.locator('#secret-message')).to_have_class(re.compile('visible'))
    # print 'LEVEL_PASSED'

    browser.close()
```
