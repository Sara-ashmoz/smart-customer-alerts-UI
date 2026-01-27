import { Customer, RiskLevel } from "@/types";

interface KPIData {
  totalCustomers: number;
  highRiskCustomers: number;
  overdueFound: number;
  totalOpenDebt: number;
}

// Calculate KPI data from customers array
export function calculateKPIs(customers: Customer[]): KPIData {
  return {
    totalCustomers: customers.length,
    highRiskCustomers: customers.filter(c => c.risk_level === "High").length,
    overdueFound: customers.filter(c => c.has_overdue).length,
    totalOpenDebt: customers.reduce((sum, c) => sum + c.total_open_debt, 0),
  };
}

// Format currency for display
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Format timestamp for display
export function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

// Get color classes for risk level badges
export function getRiskLevelColor(level: RiskLevel): string {
  switch (level) {
    case "High":
      return "bg-red-100 text-red-800";
    case "Medium":
      return "bg-yellow-100 text-yellow-800";
    case "Low":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

// Format reasons (handle string or array)
export function formatReasons(reasons: string | string[]): string {
  if (Array.isArray(reasons)) {
    return reasons.join(", ");
  }
  return reasons;
}
