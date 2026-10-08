# The All-Text Harvester

**Level:** 224
**ID:** `py-pl-224`
**Difficulty:** medium
**XP:** 280
**Tags:** `all_text_contents`, `locator`, `multiple-elements`


## Objective

Navigate to level-01. Use `page.locator(".item-card h3").all_text_contents()` to get a list of all card titles. Assert the list is non-empty. Print `LEVEL_PASSED`.

## Story

Multiple scrolls line the shelf. Collect ALL their text contents in one sweep.

## Hints
1. `locator.all_text_contents()` returns a Python list of strings
2. Try `.item-card` or `h3` elements

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    texts = page.locator('.item-card').all_text_contents()
    assert len(texts) > 0
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
    # use all_text_contents() on a multi-element locator
    browser.close()
```
