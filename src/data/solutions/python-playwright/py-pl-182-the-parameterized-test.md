# The Parameterized Test

**Level:** 182
**ID:** `py-pl-182`
**Difficulty:** medium
**XP:** 370
**Tags:** `parameterized`, `loop`, `testing`


## Objective

Test level-03 login with 3 credential pairs. Count how many succeed. If at least 1 succeeds (wizard/playwright123), print 'LEVEL_PASSED'.

## Story

The Systematic Tester runs the same test with multiple inputs.

## Hints
1. The loop runs 3 times with different credentials.
2. Only wizard/playwright123 succeeds.
3. successes should be 1.

## Solution

```python
from playwright.sync_api import sync_playwright

credentials = [('wrong', 'wrong'), ('wizard', 'playwright123'), ('invalid', 'invalid')]
successes = 0
with sync_playwright() as p:
    browser = p.chromium.launch()
    for user, pwd in credentials:
        page = browser.new_page()
        page.goto('http://localhost:5000/pages/level-03/')
        page.locator('#username').fill(user)
        page.locator('#password').fill(pwd)
        page.locator('#submit-btn').click()
        if page.locator('#success-message').is_visible():
            successes += 1
        page.close()
    if successes >= 1:
        print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

credentials = [
    ('wrong', 'wrong'),
    ('wizard', 'playwright123'),
    ('invalid', 'invalid'),
]

successes = 0
with sync_playwright() as p:
    browser = p.chromium.launch()
    for user, pwd in credentials:
        page = browser.new_page()
        page.goto('http://localhost:5000/pages/level-03/')
        page.locator('#username').fill(user)
        page.locator('#password').fill(pwd)
        page.locator('#submit-btn').click()
        if page.locator('#success-message').is_visible():
            successes += 1
        page.close()

    # TODO: print 'LEVEL_PASSED' if successes >= 1

    browser.close()
```
