from playwright.sync_api import Page, expect
import re

class DashboardPage:
    def __init__(self, page: Page):
        self.page = page

        self.btn_view_history = page.get_by_role("button", name="View History")
        self.btn_send_alert_first = page.get_by_role("button", name="Send Alert").first

        self.h_history = page.get_by_role("heading", name="Alert History")
        self.h_send_alert = page.get_by_role("heading", name="Send Alert")

    def open_history(self):
        self.btn_view_history.click()
        expect(self.h_history).to_be_visible()

    def open_send_alert_first_customer(self):
        # expect(self.page.locator("table tbody tr").first ).to_be_visible(timeout=30000)

    # רק עכשיו מחפשים כפתור
        btn = self.page.get_by_role(
            "button",
            name=re.compile("send alert", re.I)
        ).first

        expect(btn).to_be_visible(timeout=30000)
        btn.click()





        
        # expect(self.btn_send_alert_first).to_be_visible(timeout=15000)
        # self.btn_send_alert_first.click()
        # expect(self.h_send_alert).to_be_visible()
