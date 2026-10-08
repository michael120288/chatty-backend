# The Input Value Reader

**Level:** 64
**ID:** `py-pl-64`
**Difficulty:** medium
**XP:** 230
**Tags:** `input_value`, `forms`, `locator`


## Objective

On level-03 fill the username input with 'tester' using get_by_label. Then use locator.input_value() to read back the value. If it equals 'tester', print 'LEVEL_PASSED'.

## Story

The Inspector peers into the value of an input field to verify what was typed.

## Hints
1. page.get_by_label('Username').fill('tester')
2. page.locator('#username').input_value() reads the current value.
3. if value == 'tester': print('LEVEL_PASSED')

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-03/')
    page.get_by_label('Username').fill('tester')
    value = page.locator('#username').input_value()
    if value == 'tester':
        print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-03/')

    # TODO: Fill username with 'tester'
    # TODO: Read back with input_value() and verify

    browser.close()
```
