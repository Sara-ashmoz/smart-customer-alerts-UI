"""
UI Test Plan (STP) – Smart Customer Alerts Dashboard (Playwright)

1) Scope (What we test)
-----------------------
This STP validates the main user flows in the Smart Customer Alerts UI using Playwright
with the Page Object Model (POM).

In scope:
- Dashboard main page interactions
- Send Alert flow (E2E)
- View Alerts History modal flow

Out of scope:
- Backend API logic and DB persistence
- Risk calculation correctness
- Pixel-perfect UI design testing


2) Test Design Strategy
-----------------------
Testing approach:
- End-to-End UI tests using Playwright
- Page Object Model (POM) for maintainability and clean test code

POM files:
- dashboard_page.py
- send_alert_modal.py
- history_modal.py

Test files:
- test_send_alert_e2e.py
- test_view_history.py


3) Test Environment
-------------------
Local / CI:
- Playwright (Python)
- Browser: Chromium/Chrome
- Tests executed using pytest
- The tests use a shared fixture (dashboard_page) to open the dashboard page


4) Success Criteria
-------------------
UI testing is considered successful when:

- All UI tests pass consistently (no flaky failures).
- The dashboard loads successfully and main actions are usable.
- Send Alert flow completes and shows a success confirmation.
- History modal opens and closes correctly.
- Allure report is generated locally and includes UI test results.
- CI workflow runs the UI tests automatically on pull requests and completes successfully.


5) Test Cases Covered
---------------------
TC-UI-01: Send Alert (E2E) – Success
- Open dashboard
- Handle optional "Visit Site" button
- Open Send Alert modal for first customer
- Click Send
- Verify success state

TC-UI-02: View History Modal – Open and Close
- Open dashboard
- Handle optional "Visit Site" button
- Open History modal
- Verify modal is visible
- Close modal

"""
