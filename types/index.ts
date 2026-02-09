// Type definitions for API data structures

export type RiskLevel = "Safe" | "Low" | "Medium" | "High";

export interface Customer {
  customer_id: number;
  customer_name: string;
  risk_score: number;
  risk_level: RiskLevel;
  reasons: string | string[];
  unpaid_count: number;
  total_open_debt: number;
  has_overdue: boolean;
}

export interface SendAlertRequest {
  customer_id: number;
  message_template: string;
}

export interface SendAlertResponse {
  status: string;
}

export interface Alert {
  id: number;
  customer_id: number;
  customer_name: string;
  message: string;
  status: string;
  timestamp: string;
}

export type MessageTemplate = "friendly_reminder" | "overdue_invoice" | "high_debt_warning";
