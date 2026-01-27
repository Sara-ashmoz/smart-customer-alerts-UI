# Quick Start Guide

## 🚀 Start the Application

Run the development server:

```bash
npm run dev
```

Then open your browser to: **http://localhost:3000**

## ✅ Pre-flight Checklist

Before starting, make sure:

1. ✓ Node.js 18+ is installed
2. ✓ Backend API is running at `http://localhost:8000`
3. ✓ Dependencies are installed (`npm install`)

## 🧪 Test Backend Connection

You can test if your backend is running by visiting these URLs in your browser:

- http://localhost:8000/risk/customers
- http://localhost:8000/alerts

## 📋 What to Expect

When you open http://localhost:3000, you should see:

1. **Header** with "Smart Customer Alerts" title and action buttons
2. **4 KPI Cards** showing:
   - Total Customers
   - High Risk Customers
   - Overdue Found
   - Total Open Debt
3. **Filter Section** with search, risk level dropdown, overdue toggle, and sort options
4. **Customer Table** with all customer data from the backend
5. **Send Alert** button on each row
6. **View History** button in header to see past alerts

## 🛠️ Troubleshooting

**If you see "Failed to load customers":**
- Check if backend is running: `curl http://localhost:8000/risk/customers`
- Verify backend port in `.env.local`
- Check browser console for CORS errors

**If styling looks broken:**
- Clear Next.js cache: `rm -rf .next`
- Restart dev server: `npm run dev`

## 📁 Project Files

```
├── app/
│   ├── page.tsx           ← Main dashboard (start here)
│   ├── layout.tsx         ← Root layout
│   └── globals.css        ← Global styles
├── components/
│   ├── KPICards.tsx       ← Statistics cards
│   ├── Filters.tsx        ← Filter controls
│   ├── CustomerTable.tsx  ← Customer data table
│   ├── SendAlertModal.tsx ← Alert sending modal
│   └── AlertHistory.tsx   ← History viewer
├── lib/
│   ├── api.ts             ← API calls
│   └── utils.ts           ← Helper functions
├── types/
│   └── index.ts           ← TypeScript types
└── .env.local             ← Environment config
```

## 🎯 Key Features to Test

1. Click **Refresh Risk** to reload data
2. Use filters to narrow down customers
3. Click **Send Alert** on a customer
4. Select a message template and send
5. Click **View History** to see sent alerts
6. Search alert history by customer name

Enjoy your Smart Customer Alerts Dashboard! 🎉
