const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8000";

export async function GET() {
  const response = await fetch(`${API_BASE_URL}/risk/customers`, {
    cache: "no-store",
  });

  const body = await response.text();
  return new Response(body, {
    status: response.status,
    headers: {
      "Content-Type": response.headers.get("content-type") || "application/json",
    },
  });
}
