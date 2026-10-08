# The Page Object Pattern

**Level:** 181
**ID:** `py-pl-181`
**Difficulty:** medium
**XP:** 380
**Tags:** `page_object`, `pattern`, `class`


## Objective

Create a LoginPage class with fill_credentials() and submit() methods. Use it to log into level-03. Print 'LEVEL_PASSED' on success.

## Story

The Architect introduces the Page Object Model — encapsulating page interactions in a class.

## Hints
1. In fill_credentials, use self.page.locator('#username').fill(username).
2. In submit, click '#submit-btn'.
3. In is_success, return self.page.locator('#success-message').is_visible().

## Solution

```python
from playwright.sync_api import sync_playwright

class LoginPage:
    def __init__(self, page):
        self.page = page
    def fill_credentials(self, username, password):
        self.page.locator('#username').fill(username)
        self.page.locator('#password').fill(password)
    def submit(self):
        self.page.locator('#submit-btn').click()
    def is_success(self):
        return self.page.locator('#success-message').is_visible()

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-03/')
    login = LoginPage(page)
    login.fill_credentials('wizard', 'playwright123')
    login.submit()
    if login.is_success():
        print('LEVEL_PASSED')
    browser.close()
```

## Starter Code

```python
from playwright.sync_api import sync_playwright

class LoginPage:
    def __init__(self, page):
        self.page = page

    def fill_credentials(self, username, password):
        # TODO: fill username and password
        pass

    def submit(self):
        # TODO: click submit
        pass

    def is_success(self):
        # TODO: return True if #success-message visible
        pass

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-03/')
    login = LoginPage(page)
    login.fill_credentials('wizard', 'playwright123')
    login.submit()
    if login.is_success():
        print('LEVEL_PASSED')
    browser.close()
```
