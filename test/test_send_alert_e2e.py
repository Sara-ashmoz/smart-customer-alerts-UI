from test.pages.dashboard_page import DashboardPage
from test.pages.send_alert_modal import SendAlertModal

def test_send_alert_e2e_success(dashboard_page):
    dashboard_page.screenshot(path='before.png')
    page = dashboard_page

    try:
        visit_btn = page.get_by_role("button", name="Visit Site")
        if visit_btn.is_visible():
            visit_btn.click()
            page.wait_for_load_state("domcontentloaded")
    except:
        pass
    
    dashboard_page.screenshot(path='after.png')

    dashboard = DashboardPage(page)
    send_modal = SendAlertModal(page)

    dashboard.open_send_alert_first_customer()
    dashboard_page.screenshot(path='after_open_send_alert.png')
    send_modal.expect_open()

    send_modal.click_send()
    send_modal.expect_success()
