import Navbar from "@/components/Navbar";
import { getCategories } from "@/lib/category";
import { Kategori } from "@/types/type";
import { Produk } from "@/types/type";

export default async function DashboardPage() {
  const resCategories = await fetch("http://localhost:3000/api/category");
  const resProducts = await fetch("http://localhost:3000/api/product");
  const jsonCategories = await resCategories.json();
  const jsonProducts = await resProducts.json();
  const categories: Kategori[] = jsonCategories.data ?? [];
  const products: Produk[] = jsonProducts.data ?? [];

  console.log(categories, "<<< categories array");

  console.log(products, "<<< products array");
  const totalSemuaStok = products.reduce((acc, el) => {
    const totalStokProduk =
      el.stok?.reduce((a, s) => a + s.jumlah_barang, 0) ?? 0;
    return acc + totalStokProduk;
  }, 0);
  return (
    <div className="min-h-screen neon-gradient-bg ">
      {/* Animated background overlay */}
      <div className="absolute inset-0 bg-black/20" />
      <Navbar />
      <div
        className={`relative z-10 w-full overflow-hidden p-4 transition-all duration-300 ${"ml-0"}`}>
        <div className="glassmorphism rounded-2xl p-8 shadow-2xl h-full">
          <div className="mt-8">
            {/* Header */}
            <div className="text-center mb-12">
              <h1
                className="text-4xl font-bold text-white mb-2"
                style={{ fontFamily: "var(--font-orbitron)" }}>
                INVENTORY DASHBOARD
              </h1>
              <p
                className="text-gray-300 text-lg"
                style={{ fontFamily: "var(--font-exo)" }}>
                Manage your digital assets
              </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {/* Total Categories Card */}
              <div className="dashboard-card glassmorphism rounded-xl p-6 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white animate-pulse"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
                    </svg>
                  </div>
                  <div className="text-right">
                    <p
                      className="text-2xl font-bold text-white"
                      style={{ fontFamily: "var(--font-orbitron)" }}>
                      {categories.length}
                    </p>
                    <p
                      className="text-gray-300 text-sm"
                      style={{ fontFamily: "var(--font-exo)" }}>
                      Categories
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <h3
                    className="text-lg font-semibold text-white mb-2"
                    style={{ fontFamily: "var(--font-orbitron)" }}>
                    TOTAL CATEGORIES
                  </h3>
                </div>
              </div>

              {/* Total Products Card */}
              <div className="dashboard-card glassmorphism rounded-xl p-6 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white animate-bounce"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 15a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v12z" />
                    </svg>
                  </div>
                  <div className="text-right">
                    <p
                      className="text-2xl font-bold text-white"
                      style={{ fontFamily: "var(--font-orbitron)" }}>
                      {products.length}
                    </p>
                    <p
                      className="text-gray-300 text-sm"
                      style={{ fontFamily: "var(--font-exo)" }}>
                      Products
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <h3
                    className="text-lg font-semibold text-white mb-2"
                    style={{ fontFamily: "var(--font-orbitron)" }}>
                    TOTAL PRODUCTS
                  </h3>
                </div>
              </div>

              {/* Total Stock Card */}
              <div className="dashboard-card glassmorphism rounded-xl p-6 border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white animate-spin"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </div>
                  <div className="text-right">
                    <p
                      className="text-2xl font-bold text-white"
                      style={{ fontFamily: "var(--font-orbitron)" }}>
                      {totalSemuaStok}
                    </p>
                    <p
                      className="text-gray-300 text-sm"
                      style={{ fontFamily: "var(--font-exo)" }}>
                      Units
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <h3
                    className="text-lg font-semibold text-white mb-2"
                    style={{ fontFamily: "var(--font-orbitron)" }}>
                    TOTAL STOCK
                  </h3>
                </div>
              </div>
            </div>

            {/* Quick Links Section */}
            {/* <div className="text-center mb-8">
              <h2
                className="text-2xl font-bold text-white mb-8"
                style={{ fontFamily: "var(--font-orbitron)" }}>
                QUICK ACTIONS
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Button
                  className="futuristic-button h-16 text-white font-semibold rounded-xl shadow-lg flex items-center justify-center space-x-3"
                  style={{ fontFamily: "var(--font-orbitron)" }}>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                  </svg>
                  <span>ADD PRODUCT</span>
                </Button>

                <Button
                  className="futuristic-button h-16 text-white font-semibold rounded-xl shadow-lg flex items-center justify-center space-x-3"
                  style={{ fontFamily: "var(--font-orbitron)" }}>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span>MANAGE STOCK</span>
                </Button>

                <Button
                  className="futuristic-button h-16 text-white font-semibold rounded-xl shadow-lg flex items-center justify-center space-x-3"
                  style={{ fontFamily: "var(--font-orbitron)" }}>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                  </svg>
                  <span>VIEW ANALYTICS</span>
                </Button>
              </div>
            </div> */}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-purple-500/30 rounded-full blur-sm animate-pulse" />
        <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-blue-500/30 rounded-full blur-sm animate-pulse" />
        <div className="absolute top-1/2 -right-8 w-6 h-6 bg-cyan-400/40 rounded-full blur-sm animate-bounce" />
        <div className="absolute top-1/4 -left-8 w-10 h-10 bg-teal-500/30 rounded-full blur-sm animate-pulse" />
      </div>
    </div>
  );
}
