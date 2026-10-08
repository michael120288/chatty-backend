# The Dual Tab Inspector

**Level:** 211
**ID:** `py-pl-211`
**Difficulty:** medium
**XP:** 310
**Tags:** `multi-tab`, `new_page`, `context`, `parallel-pages`


## Objective

Open two pages in the same context. Navigate page1 to level-01, page2 to level-02. Assert both `page1.title()` and `page2.title()` are non-empty. Print `LEVEL_PASSED`.

## Story

Two realms, one context. Navigate each tab independently and verify they both hold valid content.

## Hints
1. Navigate each page independently with `.goto()`
2. Both pages share the same context (cookies, etc.)

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context()
    page1 = context.new_page()
    page2 = context.new_page()
    page1.goto('http://localhost:5000/pages/level-01/')
    page2.goto('http://localhost:5000/pages/level-02/')
    assert page1.title() != ''
    assert page2.title() != ''
    print('LEVEL_PASSED')
    context.close()
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context()
    page1 = context.new_page()
    page2 = context.new_page()
    # navigate each, assert titles, print LEVEL_PASSED
    context.close()
    browser.close()
```
