# The Text Extractor

**Level:** 2
**ID:** `py-pl-02`
**Difficulty:** medium
**XP:** 100
**Tags:** `locator`, `text_content`, `selectors`


## Objective

Use a locator to get the text content of '#featured-item'. If it equals 'Magic Sword', print 'LEVEL_PASSED'.

## Story

The Library Keeper asks you to read the inscription on the featured relic. Only one who can extract text from the DOM may continue.

## Hints
1. Use page.locator('#featured-item').text_content() to get the text.
2. Strip whitespace with .strip() before comparing.
3. Use an if statement: if text.strip() == 'Magic Sword': print('LEVEL_PASSED')

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    text = page.locator('#featured-item').text_content()
    if text and text.strip() == 'Magic Sword':
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

    # TODO: Get text of '#featured-item' and check if it equals 'Magic Sword'
    # print('LEVEL_PASSED') if it matches

    browser.close()
```
