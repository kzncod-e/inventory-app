"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Home, Package, BarChart3, Grid3X3, X, Menu } from "lucide-react";

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className = "" }: NavbarProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/product", label: "Products", icon: Package },
    { href: "/reports", label: "Reports", icon: BarChart3 },
    { href: "/category", label: "Categories", icon: Grid3X3 },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`glassmorphism z-50 border-b border-purple-500/20 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <Grid3X3 className="w-5 h-5 text-white" />
            </div>
            <span className="font-orbitron text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Web3 Inventory
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      flex items-center space-x-2 px-4 py-2 rounded-lg font-exo font-medium
                      transition-all duration-300 border
                      ${
                        isActive
                          ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500/50 text-purple-300 shadow-lg shadow-purple-500/25"
                          : "border-transparent text-gray-300 hover:text-white hover:bg-white/5 hover:border-purple-500/30"
                      }
                    `}>
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="glassmorphism p-2 rounded-lg border border-purple-500/30 text-gray-300 hover:text-white hover:border-purple-500/50 transition-all duration-300">
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={`
                    flex items-center space-x-3 px-3 py-2 rounded-lg font-exo font-medium
                    transition-all duration-300 border
                    ${
                      isActive
                        ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500/50 text-purple-300"
                        : "border-transparent text-gray-300 hover:text-white hover:bg-white/5 hover:border-purple-500/30"
                    }
                  `}>
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}
    </nav>
  );
}
