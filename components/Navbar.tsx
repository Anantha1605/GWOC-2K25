"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import SearchBar from "./SearchBar";
import { UserMenu } from "./UserMenu";
import { Menu, X } from "lucide-react"; // Import icons for hamburger menu

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Service", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Dashboard", href: "/dashboard/admindashboard" },
    { name: "SPDashboard", href: "/dashboard/spdashboard/overview" } // Ensure this line is correct
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-[#161617] bg-opacity-95 px-4 py-2">
      <div className="mx-auto flex items-center justify-between max-w-7xl">
        {/* Logo - Always visible */}
        <div className="w-36">
          <Link href="/" className="text-lg font-semibold text-white">
            HelperBuddy
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex-1 justify-center">
          <div className="flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn("text-sm text-gray-200 transition-colors hover:text-white")}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop Search and User Menu */}
        <div className="hidden lg:flex items-center gap-4 w-72 justify-end">
          <SearchBar />
          <UserMenu />
        </div>

        {/* Mobile Navigation */}
        <div className="flex lg:hidden items-center gap-4">
          <SearchBar />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-200 hover:text-white"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-[40px] bg-[#161617] z-50">
            <div className="flex flex-col p-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-200 hover:text-white py-3 border-b border-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="mt-4 flex flex-col gap-2">
                <Link
                  href="/login"
                  className="text-gray-200 hover:text-white py-3"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="text-gray-200 hover:text-white py-3"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}