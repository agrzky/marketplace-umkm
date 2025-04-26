import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingBag } from "lucide-react"

export const metadata: Metadata = {
  title: "Admin Login | Marketplace UMKM Mahasiswa",
  description: "Login ke panel admin Marketplace UMKM Mahasiswa",
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-8 w-8 text-blue-500" />
              <span className="font-bold text-xl">UMKM Mahasiswa</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
          <CardDescription className="text-center">Masuk ke panel admin untuk mengelola marketplace</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="admin@example.com" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="/admin/forgot-password" className="text-sm text-blue-500 hover:underline">
                Lupa password?
              </Link>
            </div>
            <Input id="password" type="password" />
          </div>
          <Button asChild className="w-full">
            <Link href="/admin">Login</Link>
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/" className="text-sm text-gray-500 hover:underline">
            Kembali ke halaman utama
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
