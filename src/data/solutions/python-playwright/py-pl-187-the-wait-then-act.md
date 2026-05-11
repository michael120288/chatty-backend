# The Wait Then Act

**Level:** 187
**ID:** `py-pl-187`
**Difficulty:** medium
**XP:** 320
**Tags:** `wait_for`, `state`, `locator`


## Objective

On level-05 use page.locator('#treasure-chest').wait_for(state='visible'). Then get its text. Print 'LEVEL_PASSED'.

## Story

The Strategist always waits for the element to be ready before acting.

## Hints
1. locator.wait_for(state='visible') waits until the element is visible.
2. States: 'attached', 'detached', 'visible', 'hidden'.
3. After waiting, text_content() is safe to call.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-05/')
    page.locator('#treasure-chest').wait_for(state='visible')
    text = page.locator('#treasure-chest').text_content()
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
    page.goto('http://localhost:5000/pages/level-05/')

    # TODO: page.locator('#treasure-chest').wait_for(state='visible')
    # Get text and print 'LEVEL_PASSED'

    browser.close()
```
