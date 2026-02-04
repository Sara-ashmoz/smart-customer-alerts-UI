import os
import pytest
from playwright.sync_api import expect


APP_URL = os.getenv("APP_URL", "http://localhost:3000")

@pytest.fixture(scope="session")
def browser_type_launch_args():
    # HEADLESS=true ב-CI, מקומית ברירת מחדל false (פותח UI)
    headless = os.getenv("HEADLESS", "false").lower() == "true"
    return {"headless": headless}


@pytest.fixture(scope="function")
def dashboard_page(browser):
    """
    Always start each test from a clean dashboard page.
    Works with ngrok by skipping the ngrok browser warning page.
    """
    context = browser.new_context(
        ignore_https_errors=True,  # safe for CI; helps if cert issues exist
        extra_http_headers={
            "ngrok-skip-browser-warning": "true",
        },
    )
    page = context.new_page()

    page.goto(APP_URL, wait_until="domcontentloaded")

    # Debug (ממש עוזר אם שוב נופל)
    # print("URL:", page.url)
    # print("TITLE:", page.title())

    expect(page.get_by_role("button", name="View History")).to_be_visible(timeout=30000)

    # אם הטקסט הזה לא תמיד מופיע, עדיף להפוך את זה ל-optional (ראה הערה למטה)
    expect(page.get_by_text("Loading customers...")).not_to_be_visible(timeout=30000)

    yield page