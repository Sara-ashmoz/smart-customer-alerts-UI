from playwright.sync_api import Page, expect

class SendAlertModal:
    def __init__(self, page: Page):
        self.page = page
        self.h_title = page.get_by_role("heading", name="Send Alert")
        self.btn_send = page.get_by_role("button", name="Send", exact=True)
        self.success_msg = page.get_by_text("✓ Alert sent successfully!")

    def expect_open(self):
        expect(self.h_title).to_be_visible()

    def click_send(self):
        expect(self.btn_send).to_be_visible()
        self.btn_send.click()

    def expect_success(self):
        expect(self.success_msg).to_be_visible()
