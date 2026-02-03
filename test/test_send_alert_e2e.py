from playwright.sync_api import expect

def test_send_alert_e2e_success(page):
    # 1. Open the app
    page.goto("http://localhost:3000", wait_until="domcontentloaded")

    # 2. Click "Send Alert" on the FIRST risky customer
    page.get_by_role("button", name="Send Alert").first.click()

    # 3. Verify Send Alert modal is open
    expect(
        page.get_by_role("heading", name="Send Alert")
    ).to_be_visible()

    # 4. Click the Send button inside the modal
    page.get_by_role("button", name="Send", exact=True).click()

    # 5. Expect success indication in UI
    # (adjust text ONLY if your UI message is different)
    expect(page.get_by_text("✓ Alert sent successfully!")).to_be_visible()

    # 6. Modal should close OR success state should appear
    expect(
        page.get_by_role("heading", name="Send Alert")
    ).not_to_be_visible()
