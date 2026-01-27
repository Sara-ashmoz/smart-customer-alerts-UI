import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart Customer Alerts",
  description: "Customer risk monitoring and alert system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}
