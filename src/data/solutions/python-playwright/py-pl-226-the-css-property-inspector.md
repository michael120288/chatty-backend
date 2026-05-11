# The CSS Property Inspector

**Level:** 226
**ID:** `py-pl-226`
**Difficulty:** medium
**XP:** 310
**Tags:** `to_have_css`, `expect`, `css`, `assertions`


## Objective

Navigate to level-50. Use `expect(page.locator("[data-testid=\"hero-badge\"]")).to_have_css("color", ...)` to assert a CSS color property exists. Print `LEVEL_PASSED`.

## Story

The enchantment changes the color of the golden badge. Assert the CSS property to confirm the ritual.

## Hints
1. `expect(locator).to_have_css("property", value)` checks computed style
2. Use a regex for colors: `to_have_css("color", re.compile(r"rgb"))`

## Solution

```python
from playwright.sync_api import sync_playwright, expect
import re

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5000/pages/level-50/')
    badge = page.locator('[data-testid="hero-badge"]')
    expect(badge).to_be_visible()
    expect(badge).to_have_css('color', re.compile(r'rgb'))
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
    page.goto('http://localhost:5000/pages/level-50/')
    badge = page.locator('[data-testid="hero-badge"]')
    # assert a CSS property with to_have_css(), then print LEVEL_PASSED
    browser.close()
```
