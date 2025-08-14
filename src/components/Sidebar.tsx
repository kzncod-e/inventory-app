"use client";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function Sidebar({
  isOpen,
  onToggle,
  activeCategory,
  onCategoryChange,
}: SidebarProps) {
  const categories = [
    { id: "electronics", name: "Electronics", icon: "⚡" },
    { id: "clothing", name: "Clothing", icon: "👕" },
    { id: "books", name: "Books", icon: "📚" },
    { id: "home", name: "Home & Garden", icon: "🏠" },
    { id: "sports", name: "Sports", icon: "⚽" },
    { id: "beauty", name: "Beauty", icon: "💄" },
  ];

  const reports = [
    { id: "sales", name: "Sales Report", icon: "📊" },
    { id: "inventory", name: "Inventory Report", icon: "📦" },
    { id: "analytics", name: "Analytics", icon: "📈" },
    { id: "financial", name: "Financial Report", icon: "💰" },
  ];

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-20 p-3 glassmorphism rounded-lg border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
        <svg
          className="w-6 h-6 text-white transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`relative z-10 transition-all duration-300 ease-in-out ${
          isOpen ? "w-80 translate-x-0" : "w-0 -translate-x-full"
        } overflow-hidden`}>
        <div className="w-80 p-4 h-full">
          <div className="glassmorphism rounded-2xl p-3 shadow-2xl h-full">
            {/* Sidebar Header */}
            <div className="text-center mb-8">
              <h2
                className="text-2xl font-bold text-white mb-2"
                style={{ fontFamily: "var(--font-orbitron)" }}>
                NAVIGATION
              </h2>
              <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
            </div>

            {/* Product Categories */}
            <div className="mb-8">
              <h3
                className="text-lg font-semibold text-white mb-4"
                style={{ fontFamily: "var(--font-orbitron)" }}>
                PRODUCT
              </h3>
              <div className="space-y-2">
                {/* {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => onCategoryChange(category.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-300 flex items-center space-x-3 ${
                      activeCategory === category.id
                        ? "bg-gradient-to-r from-purple-500/30 to-blue-500/30 border border-purple-400/50 shadow-lg shadow-purple-500/20"
                        : "hover:bg-white/10 border border-transparent hover:border-purple-500/30"
                    }`}
                    style={{ fontFamily: "var(--font-exo)" }}>
                    <span className="text-xl">{category.icon}</span>
                    <span className="text-white font-medium">
                      {category.name}
                    </span>
                  </button>
                ))} */}
              </div>
            </div>

            {/* Reports Section */}
            <div>
              <h3
                className="text-lg font-semibold text-white mb-4"
                style={{ fontFamily: "var(--font-orbitron)" }}>
                PRODUCT CATEGORIES
              </h3>
              {/* <div className="space-y-2">
                {reports.map((report) => (
                  <button
                    key={report.id}
                    className="w-full text-left p-3 rounded-lg transition-all duration-300 flex items-center space-x-3 hover:bg-white/10 border border-transparent hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/20"
                    style={{ fontFamily: "var(--font-exo)" }}>
                    <span className="text-xl">{report.icon}</span>
                    <span className="text-white font-medium">
                      {report.name}
                    </span>
                  </button>
                ))}
              </div> */}
            </div>
            <div>
              <h3
                className="text-lg font-semibold text-white mb-4"
                style={{ fontFamily: "var(--font-orbitron)" }}>
                REPORTS
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-5 lg:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
}
