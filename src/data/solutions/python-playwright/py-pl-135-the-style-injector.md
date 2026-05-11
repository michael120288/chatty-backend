# The Style Injector

**Level:** 135
**ID:** `py-pl-135`
**Difficulty:** medium
**XP:** 280
**Tags:** `add_style_tag`, `css`, `injection`


## Objective

Use page.add_style_tag(content='body { background: red !important; }') after navigating. Then take a screenshot and print 'LEVEL_PASSED'.

## Story

The Visual Wizard injects custom CSS into the page to change its appearance.

## Hints
1. add_style_tag injects a <style> element into the page.
2. The screenshot will show the red background.
3. Print 'LEVEL_PASSED' after.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    page.add_style_tag(content='body { background: red !important; }')
    page.screenshot(path='/tmp/red.png')
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

    # TODO: page.add_style_tag(content='body { background: red !important; }')
    # page.screenshot(path='/tmp/red.png')
    # print 'LEVEL_PASSED'

    browser.close()
```
