# The Dialog Tamer

**Level:** 35
**ID:** `py-pl-35`
**Difficulty:** medium
**XP:** 100
**Tags:** `dialog`, `alert`, `on`


## Objective

Set up a dialog handler that accepts (dismisses) the dialog. Navigate, trigger a dialog if present, then print 'LEVEL_PASSED'.

## Story

The Trickster has set an alert trap. Handle the dialog or be forever stuck waiting.

## Hints
1. page.on('dialog', handler) registers a dialog handler.
2. dialog.accept() closes the dialog (like clicking OK).
3. Set up the handler BEFORE page.goto().

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.on('dialog', lambda dialog: dialog.accept())
    page.goto('http://localhost:5000/pages/level-05/')
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()

    # TODO: page.on('dialog', lambda dialog: dialog.accept())
    # Then page.goto(...) and print 'LEVEL_PASSED'

    browser.close()
```
