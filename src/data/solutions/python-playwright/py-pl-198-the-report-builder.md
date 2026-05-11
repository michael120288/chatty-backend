# The Report Builder

**Level:** 198
**ID:** `py-pl-198`
**Difficulty:** medium
**XP:** 400
**Tags:** `report`, `multi-page`, `dict`


## Objective

Visit level-01, level-02, level-03. For each, collect title and h1 text. Build a report dict. If all 3 entries have non-empty title and h1, print 'LEVEL_PASSED'.

## Story

The Journalist collects findings from multiple pages into a structured report.

## Hints
1. report[n] = {'title': page.title(), 'h1': page.locator('h1').text_content()}
2. Check all entries have truthy title and h1.
3. Use all() over report.values().

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    report = {}
    for n in ['01', '02', '03']:
        page.goto(f'http://localhost:5000/pages/level-{n}/')
        report[n] = {'title': page.title(), 'h1': page.locator('h1').text_content()}
    if all(v['title'] and v['h1'] for v in report.values()):
        print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    report = {}

    for n in ['01', '02', '03']:
        page.goto(f'http://localhost:5000/pages/level-{n}/')
        # TODO: Store title and h1 in report[n]

    # TODO: Verify all entries valid, print 'LEVEL_PASSED'

    browser.close()
```
