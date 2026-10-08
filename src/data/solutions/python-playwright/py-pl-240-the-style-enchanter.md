# The Style Enchanter

**Level:** 240
**ID:** `py-pl-240`
**Difficulty:** medium
**XP:** 295
**Tags:** `add_style_tag`, `css-injection`, `page`, `styling`


## Objective

Navigate to level-01. Call `page.add_style_tag(content="h1 { color: red; }")`. Assert the page still shows the h1. Print `LEVEL_PASSED`.

## Story

You can weave new CSS threads into the living page. Inject a style tag that turns headings red.

## Hints
1. `page.add_style_tag(content=css_string)` injects a `<style>` tag
2. Use `expect(page.locator("h1")).to_be_visible()` to confirm the element still exists

## Solution

```python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    page.add_style_tag(content='h1 { color: red; }')
    expect(page.locator('h1').first).to_be_visible()
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
    page.add_style_tag(content='h1 { color: red; }')
    # assert h1 is still visible, print LEVEL_PASSED
    browser.close()
```
