# The Network Speed Tester

**Level:** 164
**ID:** `py-pl-164`
**Difficulty:** medium
**XP:** 280
**Tags:** `timing`, `performance`, `network`


## Objective

Record time before and after goto level-01. If elapsed > 0, print 'LEVEL_PASSED'.

## Story

The Benchmarker times how long a page load takes.

## Hints
1. time.time() before and after goto gives elapsed seconds.
2. elapsed = end - start.
3. Any positive elapsed time means success.

## Solution

```python
from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    start = time.time()
    page.goto('http://localhost:5000/pages/level-01/')
    elapsed = time.time() - start
    if elapsed > 0:
        print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()

    # TODO: Record start time, goto, record end time
    # If elapsed > 0, print 'LEVEL_PASSED'

    browser.close()
```
