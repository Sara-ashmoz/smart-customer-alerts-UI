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
def dashboard_page(page):
    """
    Always start each test from a clean dashboard page
    """
    page.goto(APP_URL, wait_until="domcontentloaded")

    # ודאי שהדשבורד נטען באמת
    expect(
        page.get_by_role("button", name="View History")
    ).to_be_visible(timeout=15000)

    # המתן לטעינת נתונים כדי למנוע ריצות לא יציבות בין טסטים
    expect(page.get_by_text("Loading customers...")).not_to_be_visible(timeout=15000)

    yield page