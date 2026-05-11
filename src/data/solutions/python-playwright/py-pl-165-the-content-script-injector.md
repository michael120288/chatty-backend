# The Content Script Injector

**Level:** 165
**ID:** `py-pl-165`
**Difficulty:** medium
**XP:** 300
**Tags:** `add_script_tag`, `javascript`, `injection`


## Objective

Use page.add_script_tag(content='window.greet = () => "hello"') after goto. Verify via evaluate. Print 'LEVEL_PASSED'.

## Story

The Wizard injects a script tag into the DOM that adds a function.

## Hints
1. add_script_tag injects a <script> element.
2. The function becomes available globally.
3. evaluate('window.greet()') calls it.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    page.add_script_tag(content='window.greet = () => "hello"')
    result = page.evaluate('window.greet()')
    if result == 'hello':
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

    # TODO: page.add_script_tag(content='window.greet = () => "hello"')
    # result = page.evaluate('window.greet()')
    # print 'LEVEL_PASSED' if result == 'hello'

    browser.close()
```
