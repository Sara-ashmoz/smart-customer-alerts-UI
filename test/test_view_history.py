from playwright.sync_api import expect

def test_view_history_modal_opens_and_closes(page):
    page.goto("http://localhost:3000", wait_until="domcontentloaded")

    # פתיחת המודאל
    page.get_by_role("button", name="View History").click()

    # בדיקה: כותרת Alert History קיימת
    header = page.get_by_role("heading", name="Alert History")
    expect(header).to_be_visible()

    # סגירת המודאל
    page.get_by_role("button", name="Close").click()

    # בדיקה: המודאל נסגר
    expect(header).not_to_be_visible()


