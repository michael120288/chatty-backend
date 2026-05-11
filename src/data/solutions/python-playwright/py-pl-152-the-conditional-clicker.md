# The Conditional Clicker

**Level:** 152
**ID:** `py-pl-152`
**Difficulty:** medium
**XP:** 270
**Tags:** `conditional`, `is_visible`, `click`


## Objective

On level-02 check if #reveal-btn is_visible(). Only click it if true. Then print 'LEVEL_PASSED'.

## Story

The Wise One only clicks if the element is visible — no blind strikes.

## Hints
1. page.locator('#reveal-btn').is_visible() returns True/False.
2. Only call .click() if True.
3. Print 'LEVEL_PASSED' regardless.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-02/')
    btn = page.locator('#reveal-btn')
    if btn.is_visible():
        btn.click()
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

    # TODO: if btn is visible, click it
    # print 'LEVEL_PASSED'

    browser.close()
```
