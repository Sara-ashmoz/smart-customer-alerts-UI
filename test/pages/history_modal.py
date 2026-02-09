from playwright.sync_api import Page, expect

class HistoryModal:
    def __init__(self, page: Page):
        self.page = page
        self.h_title = page.get_by_role("heading", name="Alert History")
        self.btn_close = page.get_by_role("button", name="Close")

    def expect_open(self):
        expect(self.h_title).to_be_visible()

    def close(self):
        self.btn_close.click()
        expect(self.h_title).not_to_be_visible()
