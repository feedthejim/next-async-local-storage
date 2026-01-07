import {
  withRequestContext,
  getRequestId,
  getFeatureFlags,
  getUserName,
  isFeatureEnabled,
} from "../request";
import { ClientDisplay } from "./client-display";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

async function fetchProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Synchronous access to request context - no await needed!
  const requestId = getRequestId();
  console.log("Fetching products for request ID:", requestId);

  // Return mock data
  return [
    { id: 1, name: "Laptop", price: 999.99, description: "High-performance laptop" },
    { id: 2, name: "Mouse", price: 29.99, description: "Wireless mouse" },
    { id: 3, name: "Keyboard", price: 79.99, description: "Mechanical keyboard" },
    { id: 4, name: "Monitor", price: 399.99, description: "27-inch 4K monitor" },
  ];
}

export default withRequestContext(async function ExamplePage() {
  const products = await fetchProducts();

  // All these calls are synchronous - context was prepared by withRequestContext
  const requestId = getRequestId();
  const userName = getUserName();
  const flags = getFeatureFlags();

  return (
    <main className="min-h-screen p-8">
      <ClientDisplay requestId={requestId} userName={userName} flags={flags} />

      <div className="mb-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Server Component (sync access)</h2>
        <p className="text-sm text-gray-600">Request ID: {requestId}</p>
        <p className="text-sm text-gray-600">User: {userName}</p>
        <div className="mt-2">
          <p className="text-sm font-medium">Feature Flags:</p>
          <ul className="text-sm text-gray-600 ml-4">
            <li>Dark Mode: {flags.darkMode ? "enabled" : "disabled"}</li>
            <li>New Checkout: {flags.newCheckout ? "enabled" : "disabled"}</li>
            <li>Experimental Search: {flags.experimentalSearch ? "enabled" : "disabled"}</li>
            <li>Beta Analytics: {flags.betaAnalytics ? "enabled" : "disabled"}</li>
          </ul>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-6">Products</h1>

      {isFeatureEnabled("experimentalSearch") && (
        <div className="mb-4 p-2 bg-blue-100 rounded">
          Experimental search is enabled for this request
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-lg font-bold text-green-600">
              ${product.price.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
});
