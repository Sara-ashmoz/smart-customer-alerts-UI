// API utility functions for communicating with the Next.js backend

const API_BASE_URL = "/api";

export async function fetchCustomers() {
  const response = await fetch(`${API_BASE_URL}/risk/customers`);
  if (!response.ok) {
    throw new Error("Failed to fetch customers");
  }
  return response.json();
}

export async function sendAlert(customerId: number, message: string, messageTemplate?: string) {
  const response = await fetch(`${API_BASE_URL}/alerts/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      customer_id: customerId,
      message: message,
      message_template: messageTemplate,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to send alert");
  }
  return response.json();
}

export async function fetchAlerts() {
  const response = await fetch(`${API_BASE_URL}/alerts`);
  if (!response.ok) {
    throw new Error("Failed to fetch alerts");
  }
  return response.json();
}

