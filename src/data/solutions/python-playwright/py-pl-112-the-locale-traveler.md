# The Locale Traveler

**Level:** 112
**ID:** `py-pl-112`
**Difficulty:** medium
**XP:** 260
**Tags:** `locale`, `context`, `i18n`


## Objective

Create a context with locale='fr-FR'. Navigate to level-01. Print 'LEVEL_PASSED'.

## Story

The Translator sets the browser locale to test internationalized pages.

## Hints
1. locale sets the Accept-Language header and navigator.language.
2. The page won't look different unless it detects locale.
3. Just navigate and print.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context(locale='fr-FR')
    page = context.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    print('LEVEL_PASSED')
    context.close()
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context(locale='fr-FR')
    page = context.new_page()
    page.goto('http://localhost:5000/pages/level-01/')

    # TODO: print 'LEVEL_PASSED'

    context.close()
    browser.close()
```
