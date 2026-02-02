// Send Alert Modal - allows user to select a message template and send an alert

"use client";

import { useState } from "react";
import { Customer, MessageTemplate } from "@/types";

interface SendAlertModalProps {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
  onSend: (
    customerId: number,
    message: string,
    messageTemplate: string
  ) => Promise<void> | void;
}

const messageTemplates = [
  { value: "friendly_reminder", label: "Friendly Reminder" },
  { value: "overdue_invoice", label: "Overdue Invoice" },
  { value: "high_debt_warning", label: "High Debt Warning" },
];

const templatePreviews: Record<MessageTemplate, string> = {
  friendly_reminder:
    "Hi {customer_name}, this is a friendly reminder about your outstanding balance. Please review your account at your earliest convenience.",
  overdue_invoice:
    "Dear {customer_name}, we noticed you have overdue invoices. Please settle them promptly to avoid any service interruption.",
  high_debt_warning:
    "Attention {customer_name}: Your account has accumulated significant debt. Immediate action is required to resolve this matter.",
};

export default function SendAlertModal({
  customer,
  isOpen,
  onClose,
  onSend,
}: SendAlertModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<MessageTemplate>("friendly_reminder");
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  if (!isOpen || !customer) return null;

  const handleSend = async () => {
    setIsSending(true);
    try {
      await onSend(customer.customer_id, previewMessage, selectedTemplate);
      setIsSent(true);
      setTimeout(() => {
        setIsSent(false);
        onClose();
      }, 1500);
    } catch (error) {
      console.error("Failed to send alert:", error);
      alert("Failed to send alert. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const previewMessage = templatePreviews[selectedTemplate].replace(
    "{customer_name}",
    customer.customer_name
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Send Alert</h2>
        </div>

        <div className="p-6 space-y-4">
          {/* Customer Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Customer
            </label>
            <input
              type="text"
              value={customer.customer_name}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
            />
          </div>

          {/* Message Template Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message Template
            </label>
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value as MessageTemplate)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSending || isSent}
            >
              {messageTemplates.map((template) => (
                <option key={template.value} value={template.value}>
                  {template.label}
                </option>
              ))}
            </select>
          </div>

          {/* Message Preview */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preview
            </label>
            <textarea
              value={previewMessage}
              readOnly
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
            />
          </div>

          {/* Success Message */}
          {isSent && (
            <div className="bg-green-50 border border-green-200 rounded-md p-3">
              <p className="text-green-800 text-sm font-medium">
                ✓ Alert sent successfully!
              </p>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            disabled={isSending}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={isSending || isSent}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md transition-colors disabled:opacity-50 font-medium"
          >
            {isSending ? "Sending..." : isSent ? "Sent!" : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
