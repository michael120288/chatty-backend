# The Speed Click Counter

**Level:** 194
**ID:** `py-pl-194`
**Difficulty:** medium
**XP:** 330
**Tags:** `click`, `counter`, `interaction`


## Objective

On level-02 click the reveal button 5 times. Read the click counter text and check it contains '5'. Print 'LEVEL_PASSED'.

## Story

The Swift One clicks the button multiple times and tracks the count.

## Hints
1. #click-count shows 'Clicks: N'.
2. After 5 clicks it shows 'Clicks: 5'.
3. Check '5' in text.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-02/')
    for _ in range(5):
        page.locator('#reveal-btn').click()
    text = page.locator('#click-count').text_content()
    if '5' in text:
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

    for _ in range(5):
        page.locator('#reveal-btn').click()

    # TODO: Read #click-count text and check '5' is in it
    # print 'LEVEL_PASSED'

    browser.close()
```
