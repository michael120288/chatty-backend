# The Trace Recorder Starter

**Level:** 191
**ID:** `py-pl-191`
**Difficulty:** medium
**XP:** 350
**Tags:** `tracing`, `debugging`, `advanced`


## Objective

Start a trace with context.tracing.start(screenshots=True). Navigate, then stop with context.tracing.stop(path='/tmp/trace.zip'). Print 'LEVEL_PASSED'.

## Story

The Forensic Analyst records a trace for later debugging in Playwright Trace Viewer.

## Hints
1. tracing.start() begins recording.
2. tracing.stop(path=) saves the trace zip.
3. Print 'LEVEL_PASSED' after stop.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context()
    context.tracing.start(screenshots=True)
    page = context.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    context.tracing.stop(path='/tmp/trace.zip')
    print('LEVEL_PASSED')
    context.close()
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context()
    context.tracing.start(screenshots=True)
    page = context.new_page()
    page.goto('http://localhost:5000/pages/level-01/')

    # TODO: context.tracing.stop(path='/tmp/trace.zip')
    # print 'LEVEL_PASSED'

    context.close()
    browser.close()
```
