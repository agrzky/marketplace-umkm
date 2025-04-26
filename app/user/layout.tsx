import type { ReactNode } from "react"
import Link from "next/link"
import type { Metadata } from "next"
import { User, ShoppingBag, Heart, CreditCard, Settings, LogOut, Menu, Bell, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Dashboard Pengguna | Marketplace UMKM Mahasiswa",
  description: "Dashboard pengguna Marketplace UMKM Mahasiswa",
}

interface UserLayoutProps {
  children: ReactNode
}

export default function UserLayout({ children }: UserLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden md:flex md:w-64 flex-col bg-white border-r">
          <div className="p-4 border-b">
            <Link href="/user" className="flex items-center gap-2">
              <ShoppingBag className="h-6 w-6 text-blue-500" />
              <span className="font-bold text-lg">Dashboard</span>
            </Link>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            <Link
              href="/user"
              className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600"
            >
              <User className="h-5 w-5" />
              <span>Profil Saya</span>
            </Link>
            <Link
              href="/user/orders"
              className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600"
            >
              <ShoppingBag className="h-5 w-5" />
              <span>Pesanan Saya</span>
            </Link>
            <Link
              href="/user/wishlist"
              className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600"
            >
              <Heart className="h-5 w-5" />
              <span>Wishlist</span>
            </Link>
            <Link
              href="/user/payment"
              className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600"
            >
              <CreditCard className="h-5 w-5" />
              <span>Pembayaran</span>
            </Link>
            <Link
              href="/user/settings"
              className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600"
            >
              <Settings className="h-5 w-5" />
              <span>Pengaturan</span>
            </Link>
          </nav>
          <div className="p-4 border-t">
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="h-5 w-5" />
              <span>Keluar</span>
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Navigation */}
          <header className="bg-white border-b">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
                <h1 className="text-xl font-semibold">Dashboard Pengguna</h1>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    3
                  </span>
                </Button>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    2
                  </span>
                </Button>
                <span className="text-sm font-medium">Pengguna</span>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </div>
  )
}
