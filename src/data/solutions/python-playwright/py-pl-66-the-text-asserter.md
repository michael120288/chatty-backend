# The Text Asserter

**Level:** 66
**ID:** `py-pl-66`
**Difficulty:** medium
**XP:** 240
**Tags:** `expect`, `to_have_text`, `assertions`


## Objective

On level-01 use expect(page.locator('h1')).to_have_text() with the exact h1 text. If the assertion passes, print 'LEVEL_PASSED'.

## Story

The Scribe uses the sacred expect() to assert text — and the spell fails loudly if wrong.

## Hints
1. First use .text_content() to find the actual h1 text, then assert it.
2. expect(locator).to_have_text(expected) raises if the text doesn't match.
3. Wrap in try/except if you want to handle failures gracefully.

## Solution

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    text = page.locator('h1').text_content().strip()
    expect(page.locator('h1')).to_have_text(text)
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')

    # TODO: First get the h1 text, then use expect().to_have_text()
    # print 'LEVEL_PASSED'

    browser.close()
```
