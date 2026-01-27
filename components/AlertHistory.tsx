// Alert History component - displays past sent alerts

"use client";

import { useState, useEffect } from "react";
import { Alert } from "@/types";
import { formatTimestamp } from "@/lib/utils";
import { fetchAlerts } from "@/lib/api";

interface AlertHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  refreshTrigger?: number;
}

export default function AlertHistory({
  isOpen,
  onClose,
  refreshTrigger,
}: AlertHistoryProps) {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (isOpen) {
      loadAlerts();
    }
  }, [isOpen, refreshTrigger]);

  const loadAlerts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAlerts();
      setAlerts(data);
    } catch (err) {
      setError("Failed to load alerts");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  // Filter alerts by customer name
  const filteredAlerts = alerts.filter((alert) =>
    alert.customer_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[80vh] flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Alert History</h2>
        </div>

        <div className="p-6 border-b border-gray-200">
          <input
            type="text"
            placeholder="Search by customer name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading alerts...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600">{error}</p>
            </div>
          ) : filteredAlerts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No alerts found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Timestamp
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Customer Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Message
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredAlerts.map((alert) => (
                    <tr key={alert.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                        {formatTimestamp(alert.timestamp)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {alert.customer_name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 max-w-md">
                        {alert.message}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {alert.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
