# The Role Finder

**Level:** 51
**ID:** `py-pl-51`
**Difficulty:** medium
**XP:** 220
**Tags:** `get_by_role`, `aria`, `locator`


## Objective

Use page.get_by_role('button') to find the first button on level-02 and print its text. If non-empty, print 'LEVEL_PASSED'.

## Story

The Archivist demands you locate elements by their ARIA role — the ancient semantic language of accessibility.

## Hints
1. Use page.get_by_role('button').first to get the first button.
2. Call .text_content() to get its label.
3. Print 'LEVEL_PASSED' if the result is non-empty.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-02/')
    text = page.get_by_role('button').first.text_content()
    if text:
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

    # TODO: Use page.get_by_role('button').first.text_content()
    # print 'LEVEL_PASSED' if text is not empty

    browser.close()
```
