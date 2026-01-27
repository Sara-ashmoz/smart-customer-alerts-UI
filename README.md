# Smart Customer Alerts - Frontend

A modern Next.js dashboard for monitoring customer financial risk and sending alerts.

## Features

- **Risk Dashboard**: View all customers with their risk levels and scores
- **KPI Cards**: Track total customers, high-risk customers, overdue accounts, and total open debt
- **Advanced Filtering**: Search, filter by risk level, show overdue only, and sort by risk score
- **Send Alerts**: Send customized alert messages to customers
- **Alert History**: View all previously sent alerts with timestamps

## Tech Stack

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React** for UI components

## Prerequisites

- Node.js 18+ installed
- Backend API running at `http://localhost:8000`

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

The `.env.local` file is already configured with:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

If your backend runs on a different port, update this value.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints Used

The application connects to the following backend endpoints:

- `GET /risk/customers` - Fetch all customers with risk data
- `POST /alerts/send` - Send an alert to a customer
- `GET /alerts` - Fetch alert history

## Project Structure

```
smart-customer-alerts-UI/
├── app/
│   ├── layout.tsx          # Root layout with global styles
│   ├── page.tsx            # Main dashboard page
│   └── globals.css         # Global CSS with Tailwind
├── components/
│   ├── AlertHistory.tsx    # Alert history modal
│   ├── CustomerTable.tsx   # Customer data table
│   ├── Filters.tsx         # Filter controls
│   ├── KPICards.tsx        # KPI statistics cards
│   └── SendAlertModal.tsx  # Send alert modal
├── lib/
│   ├── api.ts              # API utility functions
│   └── utils.ts            # Helper functions
├── types/
│   └── index.ts            # TypeScript type definitions
├── .env.local              # Environment variables
├── package.json            # Dependencies
└── tailwind.config.ts      # Tailwind configuration
```

## Usage

### Dashboard

1. The dashboard automatically loads customer data on page load
2. Use the **Refresh Risk** button to reload data from the backend
3. View the **last refresh timestamp** in the header

### Filtering Customers

- **Search**: Type customer name to filter
- **Risk Level**: Select All, High, Medium, or Low
- **Show only overdue**: Toggle to show customers with overdue invoices
- **Sort**: Sort by risk score (high to low or low to high)

### Sending Alerts

1. Click **Send Alert** on any customer row
2. Select a message template:
   - Friendly Reminder
   - Overdue Invoice
   - High Debt Warning
3. Preview the message
4. Click **Send** to send the alert

### Viewing Alert History

1. Click **View History** in the header
2. Search alerts by customer name
3. View timestamp, customer, message, and status for each alert

## Building for Production

```bash
npm run build
npm start
```

## Notes

- The application is designed as an MVP dashboard
- All data comes from the backend API (no mock data)
- Authentication is not included in this version
- The UI uses a clean, minimal design suitable for a product dashboard

## Troubleshooting

**"Failed to load customers"**
- Ensure the backend is running at `http://localhost:8000`
- Check the backend logs for errors
- Verify the API endpoints are accessible

**Styling issues**
- Make sure Tailwind CSS is properly configured
- Clear `.next` cache and rebuild: `rm -rf .next && npm run dev`

## License

This is an MVP project for Smart Customer Alerts system.
