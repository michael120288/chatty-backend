# The Label Seeker

**Level:** 52
**ID:** `py-pl-52`
**Difficulty:** medium
**XP:** 220
**Tags:** `get_by_label`, `forms`, `accessibility`


## Objective

On level-03 use page.get_by_label('Username') to fill in 'wizard', get_by_label('Password') to fill 'playwright123', then click the button. If #success-message becomes visible, print 'LEVEL_PASSED'.

## Story

The Form Guardian insists you find inputs by their labels — a sign of a true accessibility champion.

## Hints
1. page.get_by_label('Username') finds the input associated with that label.
2. After filling, click page.get_by_role('button', name='Submit').
3. page.locator('#success-message').is_visible() returns True if visible.

## Solution

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-03/')
    page.get_by_label('Username').fill('wizard')
    page.get_by_label('Password').fill('playwright123')
    page.get_by_role('button', name='Submit').click()
    if page.locator('#success-message').is_visible():
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

    # TODO: get_by_label('Username').fill('wizard')
    # TODO: get_by_label('Password').fill('playwright123')
    # TODO: click submit, check #success-message is visible

    browser.close()
```
