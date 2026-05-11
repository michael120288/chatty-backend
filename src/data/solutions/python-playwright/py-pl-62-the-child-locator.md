# The Child Locator

**Level:** 62
**ID:** `py-pl-62`
**Difficulty:** medium
**XP:** 220
**Tags:** `css`, `descendant`, `locator`


## Objective

On level-02 use page.locator('.scene button') to find the button inside .scene. Click it and print 'LEVEL_PASSED'.

## Story

The genealogist traces lineage — find elements that are children of a parent.

## Hints
1. CSS descendant selector '.scene button' finds buttons inside .scene.
2. Just click and then print — no assertion needed.
3. This is the same button as 'Reveal Secret'.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-02/')
    page.locator('.scene button').click()
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

    # TODO: page.locator('.scene button').click()
    # print 'LEVEL_PASSED'

    browser.close()
```
