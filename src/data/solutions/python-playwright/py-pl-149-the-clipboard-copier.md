# The Clipboard Copier

**Level:** 149
**ID:** `py-pl-149`
**Difficulty:** medium
**XP:** 290
**Tags:** `clipboard`, `evaluate`, `permissions`


## Objective

Use page.evaluate to copy text to clipboard via JS. Then read it back with another evaluate. If they match, print 'LEVEL_PASSED'.

## Story

The Thief reaches into the clipboard to read what was copied.

## Hints
1. Use navigator.clipboard.writeText() to write.
2. Use navigator.clipboard.readText() to read.
3. Both are async in JS, so use async () => await ... in evaluate.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context(permissions=['clipboard-read', 'clipboard-write'])
    page = context.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    page.evaluate("async () => navigator.clipboard.writeText('hello')")
    text = page.evaluate('async () => navigator.clipboard.readText()')
    if text == 'hello':
        print('LEVEL_PASSED')
    context.close()
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context(permissions=['clipboard-read', 'clipboard-write'])
    page = context.new_page()
    page.goto('http://localhost:5000/pages/level-01/')

    # TODO: Write to clipboard via evaluate
    # Read back and verify
    # print 'LEVEL_PASSED'

    context.close()
    browser.close()
```
