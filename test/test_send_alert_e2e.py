from test.pages.dashboard_page import DashboardPage
from test.pages.send_alert_modal import SendAlertModal

def test_send_alert_e2e_success(dashboard_page):
    page = dashboard_page

    dashboard = DashboardPage(page)
    send_modal = SendAlertModal(page)

    dashboard.open_send_alert_first_customer()
    send_modal.expect_open()

    send_modal.click_send()
    send_modal.expect_success()
