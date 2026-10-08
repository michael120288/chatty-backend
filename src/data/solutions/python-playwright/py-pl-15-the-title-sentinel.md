# The Title Sentinel

**Level:** 15
**ID:** `py-pl-15`
**Difficulty:** medium
**XP:** 100
**Tags:** `expect`, `to_have_title`, `title`


## Objective

Use expect(page).to_have_title() with a regex that matches any non-empty string, then print 'LEVEL_PASSED'.

## Story

The Sentinel guards the realm by its name. Assert the page title is not empty using the expect API.

## Hints
1. re.compile('.+') matches any string with at least one character.
2. expect(page).to_have_title(re.compile('.+')) asserts a non-empty title.
3. Print 'LEVEL_PASSED' after.

## Solution

```python
from playwright.sync_api import sync_playwright, expect
import re

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    expect(page).to_have_title(re.compile('.+'))
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright, expect
import re

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-01/')

    # TODO: Assert title is not empty using expect(page).to_have_title(re.compile('.+'))
    # Then print 'LEVEL_PASSED'

    browser.close()
```
