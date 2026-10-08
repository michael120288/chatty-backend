# The Video Recorder Starter

**Level:** 190
**ID:** `py-pl-190`
**Difficulty:** medium
**XP:** 340
**Tags:** `video`, `recording`, `context`


## Objective

Create a context with record_video_dir='/tmp/videos'. Navigate to level-01. Close the context. Print 'LEVEL_PASSED'.

## Story

The Documentarian starts a video recording of the browser session.

## Hints
1. record_video_dir tells Playwright where to save .webm files.
2. Close the context to finalize the video.
3. Print 'LEVEL_PASSED' after closing.

## Solution

```python
from playwright.sync_api import sync_playwright
import os

os.makedirs('/tmp/videos', exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context(record_video_dir='/tmp/videos')
    page = context.new_page()
    page.goto('http://localhost:5000/pages/level-01/')
    context.close()
    print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright
import os

os.makedirs('/tmp/videos', exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context(record_video_dir='/tmp/videos')
    page = context.new_page()
    page.goto('http://localhost:5000/pages/level-01/')

    # TODO: context.close() then print 'LEVEL_PASSED'

    browser.close()
```
