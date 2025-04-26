"use client"

import Link from "next/link"
import { ShoppingBag, Menu, X, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled ? "bg-white shadow-md py-2" : "bg-white/80 backdrop-blur-md py-4",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <ShoppingBag className="h-8 w-8 text-blue-500" />
            <span className="text-xl font-medium text-gray-700">UMKM MAHASISWA</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-blue-500 transition-colors font-medium">
              Home
            </Link>
            <Link href="/produk" className="text-gray-700 hover:text-blue-500 transition-colors font-medium">
              Produk
            </Link>
            <Link href="/tentang-kami" className="text-gray-700 hover:text-blue-500 transition-colors font-medium">
              Tentang Kami
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/keranjang">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-blue-500 text-white hover:bg-blue-600">Register</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 mt-4 border-t">
            <nav className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-500 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/produk"
                className="text-gray-700 hover:text-blue-500 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Produk
              </Link>
              <Link
                href="/tentang-kami"
                className="text-gray-700 hover:text-blue-500 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Tentang Kami
              </Link>
              <div className="flex items-center gap-4 mt-4">
                <Link href="/login" className="w-full" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-blue-500 text-blue-500 hover:bg-blue-50">
                    Login
                  </Button>
                </Link>
                <Link href="/register" className="w-full" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-blue-500 text-white hover:bg-blue-600">Register</Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
