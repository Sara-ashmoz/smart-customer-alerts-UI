"use client";

import { useState, useEffect } from "react";
import { Customer } from "@/types";
import { fetchCustomers, sendAlert } from "@/lib/api";
import { calculateKPIs, formatTimestamp } from "@/lib/utils";
import KPICards from "@/components/KPICards";
import Filters from "@/components/Filters";
import CustomerTable from "@/components/CustomerTable";
import SendAlertModal from "@/components/SendAlertModal";
import AlertHistory from "@/components/AlertHistory";

export default function Home() {
  // State for customer data
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  // State for filters
  const [searchQuery, setSearchQuery] = useState("");
  const [riskLevelFilter, setRiskLevelFilter] = useState("All");
  const [showOnlyOverdue, setShowOnlyOverdue] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");

  // State for modals
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [alertRefreshTrigger, setAlertRefreshTrigger] = useState(0);

  // Load customers on mount
  useEffect(() => {
    loadCustomers();
  }, []);

  // Function to fetch customers from API
  const loadCustomers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCustomers();
      setCustomers(data);
      setLastRefresh(new Date());
    } catch (err) {
      setError("Failed to load customers. Please ensure the backend is running.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle sending an alert
  const handleSendAlert = async (customerId: number, messageTemplate: string) => {
    await sendAlert(customerId, messageTemplate);
    setAlertRefreshTrigger((prev) => prev + 1);
  };

  // Function to open send alert modal
  const openSendAlertModal = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsAlertModalOpen(true);
  };

  // Function to close send alert modal
  const closeSendAlertModal = () => {
    setIsAlertModalOpen(false);
    setSelectedCustomer(null);
  };

  // Apply filters to customers
  const filteredCustomers = customers
    .filter((customer) => {
      // Search filter
      if (
        searchQuery &&
        !customer.customer_name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Risk level filter
      if (riskLevelFilter !== "All" && customer.risk_level !== riskLevelFilter) {
        return false;
      }

      // Overdue filter
      if (showOnlyOverdue && !customer.has_overdue) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      // Sort by risk score
      if (sortOrder === "desc") {
        return b.risk_score - a.risk_score;
      } else {
        return a.risk_score - b.risk_score;
      }
    });

  // Calculate KPIs from all customers (not filtered)
  const kpis = calculateKPIs(customers);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Smart Customer Alerts
              </h1>
              {lastRefresh && (
                <p className="text-sm text-gray-500 mt-1">
                  Last refresh: {formatTimestamp(lastRefresh.toISOString())}
                </p>
              )}
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setIsHistoryOpen(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors font-medium"
              >
                View History
              </button>
              <button
                onClick={loadCustomers}
                disabled={loading}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors font-medium disabled:opacity-50"
              >
                {loading ? "Refreshing..." : "Refresh Risk"}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        ) : loading && customers.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500">Loading customers...</p>
          </div>
        ) : (
          <>
            {/* KPI Cards */}
            <KPICards
              totalCustomers={kpis.totalCustomers}
              highRiskCustomers={kpis.highRiskCustomers}
              overdueFound={kpis.overdueFound}
              totalOpenDebt={kpis.totalOpenDebt}
            />

            {/* Filters */}
            <Filters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              riskLevelFilter={riskLevelFilter}
              setRiskLevelFilter={setRiskLevelFilter}
              showOnlyOverdue={showOnlyOverdue}
              setShowOnlyOverdue={setShowOnlyOverdue}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />

            {/* Customer Table */}
            <CustomerTable
              customers={filteredCustomers}
              onSendAlert={openSendAlertModal}
            />
          </>
        )}
      </div>

      {/* Send Alert Modal */}
      <SendAlertModal
        customer={selectedCustomer}
        isOpen={isAlertModalOpen}
        onClose={closeSendAlertModal}
        onSend={handleSendAlert}
      />

      {/* Alert History Modal */}
      <AlertHistory
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        refreshTrigger={alertRefreshTrigger}
      />
    </main>
  );
}
