from test.pages.dashboard_page import DashboardPage
from test.pages.history_modal import HistoryModal

def test_view_history_modal_opens_and_closes(dashboard_page):
    page = dashboard_page
    try:
        visit_btn = page.get_by_role("button", name="Visit Site")
        if visit_btn.is_visible():
            visit_btn.click()
            page.wait_for_load_state("domcontentloaded")
    except:
        pass

    dashboard = DashboardPage(page)
    history = HistoryModal(page)

    dashboard.open_history()
    history.expect_open()
    history.close()



