# The Form Scribe

**Level:** 4
**ID:** `py-pl-04`
**Difficulty:** medium
**XP:** 100
**Tags:** `fill`, `input`, `forms`


## Objective

Find the first text input on the page, fill it with the value 'hero', then print 'LEVEL_PASSED'.

## Story

An ancient scroll demands your name. Only those who can fill the sacred input field may inscribe their legend.

## Hints
1. Use page.locator('input').first to select the first input field.
2. Call .fill('hero') to type into it.
3. Print 'LEVEL_PASSED' after filling.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-03/')
    page.locator('input').first.fill('hero')
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-03/')

    # TODO: Fill the first input with 'hero' using page.locator('input').first.fill('hero')

    browser.close()
```
