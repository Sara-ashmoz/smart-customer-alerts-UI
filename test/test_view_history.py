from test.pages.dashboard_page import DashboardPage
from test.pages.history_modal import HistoryModal

def test_view_history_modal_opens_and_closes(dashboard_page):
    page = dashboard_page

    dashboard = DashboardPage(page)
    history = HistoryModal(page)

    dashboard.open_history()
    history.expect_open()
    history.close()



