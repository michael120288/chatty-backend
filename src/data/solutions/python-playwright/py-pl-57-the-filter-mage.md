# The Filter Mage

**Level:** 57
**ID:** `py-pl-57`
**Difficulty:** medium
**XP:** 230
**Tags:** `filter`, `locator`, `has_text`


## Objective

On level-01 use page.locator('p').filter(has_text='Welcome') to find the paragraph containing 'Welcome'. If count() > 0, print 'LEVEL_PASSED'.

## Story

The Mage teaches you to narrow down locators using filter — only the matching element shall pass.

## Hints
1. page.locator('p').filter(has_text='Welcome') narrows to p elements containing 'Welcome'.
2. If no paragraph contains 'Welcome', try another word that appears on the page.
3. Use .count() to check how many match — if > 0, print 'LEVEL_PASSED'.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    count = page.locator('p').count()
    if count > 0:
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

    # TODO: Use locator('p').filter(has_text='...') to find a paragraph
    # print 'LEVEL_PASSED' if found

    browser.close()
```
