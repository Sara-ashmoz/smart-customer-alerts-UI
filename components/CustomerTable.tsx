// Customer Table component - displays customer data with risk information

import { Customer } from "@/types";
import { getRiskLevelColor, formatReasons, formatCurrency } from "@/lib/utils";

interface CustomerTableProps {
  customers: Customer[];
  onSendAlert: (customer: Customer) => void;
}

export default function CustomerTable({
  customers,
  onSendAlert,
}: CustomerTableProps) {
  if (customers.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center border border-gray-200">
        <p className="text-gray-500">No customers found matching your filters.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Customer Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Risk Level
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Risk Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Reason(s)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Open Debt
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customers.map((customer) => (
              <tr
                key={customer.customer_id}
                className={
                  customer.risk_level === "High" || customer.risk_level === "Medium"
                    ? "bg-orange-50"
                    : ""
                }
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900">
                      {customer.customer_name}
                    </div>
                    {customer.has_overdue && (
                      <span className="ml-2 text-xs text-orange-600">⚠️</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRiskLevelColor(
                      customer.risk_level
                    )}`}
                  >
                    {customer.risk_level}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {customer.risk_score.toFixed(1)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                  {formatReasons(customer.reasons)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(customer.total_open_debt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {customer.risk_level === "Safe" || customer.risk_score === 0 ? (
                    <span className="text-gray-400">—</span>
                  ) : (
                    <button
                      onClick={() => onSendAlert(customer)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition-colors font-medium"
                    >
                      Send Alert
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
