"use client"

import Link from "next/link"
import { ShoppingBag, Menu, X, ShoppingCart, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

export default function Header() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Cek status login dari token
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token')
      setIsLoggedIn(!!token)

      // Ambil role user dari localStorage jika ada
      const role = localStorage.getItem('userRole')
      setUserRole(role)
    }

    // Cek status awal
    checkLoginStatus()

    // Tambahkan event listener untuk storage changes
    window.addEventListener('storage', checkLoginStatus)

    // Cleanup event listener
    return () => window.removeEventListener('storage', checkLoginStatus)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userRole')
    setIsLoggedIn(false)
    setUserRole(null)
    router.push('/login')
  }

  const getDashboardLink = () => {
    switch(userRole) {
      case 'ADMIN':
        return '/admin'
      case 'SELLER':
        return '/seller/dashboard'
      default:
        return '/user/dashboard'
    }
  }

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
            
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Link href={getDashboardLink()}>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="border-blue-500 text-blue-500 hover:bg-blue-50"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-blue-500 text-white hover:bg-blue-600">Register</Button>
                </Link>
              </>
            )}
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
              <div className="flex flex-col gap-4 mt-4">
                {isLoggedIn ? (
                  <>
                    <Link
                      href={getDashboardLink()}
                      className="text-gray-700 hover:text-blue-500 transition-colors font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Button
                      variant="outline"
                      className="border-blue-500 text-blue-500 hover:bg-blue-50 w-full"
                      onClick={() => {
                        handleLogout()
                        setIsMenuOpen(false)
                      }}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="w-full" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50 w-full">
                        Login
                      </Button>
                    </Link>
                    <Link href="/register" className="w-full" onClick={() => setIsMenuOpen(false)}>
                      <Button className="bg-blue-500 text-white hover:bg-blue-600 w-full">
                        Register
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
