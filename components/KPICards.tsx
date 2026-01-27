// KPI Cards component - displays key statistics at the top of dashboard

import { formatCurrency } from "@/lib/utils";

interface KPICardsProps {
  totalCustomers: number;
  highRiskCustomers: number;
  overdueFound: number;
  totalOpenDebt: number;
}

export default function KPICards({
  totalCustomers,
  highRiskCustomers,
  overdueFound,
  totalOpenDebt,
}: KPICardsProps) {
  const cards = [
    {
      label: "Total Customers",
      value: totalCustomers.toString(),
      color: "text-blue-600",
    },
    {
      label: "High Risk Customers",
      value: highRiskCustomers.toString(),
      color: "text-red-600",
    },
    {
      label: "Overdue Found",
      value: overdueFound.toString(),
      color: "text-orange-600",
    },
    {
      label: "Total Open Debt",
      value: formatCurrency(totalOpenDebt),
      color: "text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow p-6 border border-gray-200"
        >
          <p className="text-sm text-gray-600 mb-1">{card.label}</p>
          <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
        </div>
      ))}
    </div>
  );
}
