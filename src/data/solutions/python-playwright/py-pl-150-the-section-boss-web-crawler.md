# The Section Boss: Web Crawler

**Level:** 150
**ID:** `py-pl-150`
**Difficulty:** medium
**XP:** 400
**Tags:** `navigation`, `loop`, `crawl`


## Objective

Navigate to level-01, level-02, and level-03. Collect all three page titles. If all three are non-empty, print 'LEVEL_PASSED'.

## Story

The Crawl Master must navigate to three different levels and collect their titles — a mini-crawler.

## Hints
1. Use a loop or 3 separate gotos.
2. Append page.title() to titles after each navigation.
3. Check all(titles) or len(titles) == 3 and all non-empty.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    titles = []
    for slug in ['level-01', 'level-02', 'level-03']:
        page.goto(f'http://localhost:5000/pages/{slug}/')
        titles.append(page.title())
    if all(titles):
        print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    titles = []

    # TODO: Navigate to level-01, -02, -03
    # Collect page.title() for each
    # If all 3 non-empty, print 'LEVEL_PASSED'

    browser.close()
```
