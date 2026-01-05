import { getRequestId } from "../request-id";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

async function fetchProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  const requestId = getRequestId();
  console.log("Fetching products for request ID:", requestId);
  
  // Return mock data
  return [
    { id: 1, name: 'Laptop', price: 999.99, description: 'High-performance laptop' },
    { id: 2, name: 'Mouse', price: 29.99, description: 'Wireless mouse' },
    { id: 3, name: 'Keyboard', price: 79.99, description: 'Mechanical keyboard' },
    { id: 4, name: 'Monitor', price: 399.99, description: '27-inch 4K monitor' },
  ];
}

export default async function ExamplePage() {
  const products = await fetchProducts();

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
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
}
