# The Inner Text Collector

**Level:** 225
**ID:** `py-pl-225`
**Difficulty:** medium
**XP:** 280
**Tags:** `all_inner_texts`, `locator`, `multiple-elements`


## Objective

Navigate to level-01. Use `page.locator(".item-card").all_inner_texts()` to collect all card visible texts. Assert none of the results are empty strings. Print `LEVEL_PASSED`.

## Story

The visible rendered text reveals the truth. Collect all inner texts and verify they are non-blank.

## Hints
1. `locator.all_inner_texts()` returns visible text for each element
2. `all(t.strip() for t in texts)` checks none are blank

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    texts = page.locator('.item-card').all_inner_texts()
    assert len(texts) > 0
    assert all(t.strip() != '' for t in texts)
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
    # use all_inner_texts(), assert none are empty
    browser.close()
```
