import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Mulai Berjualan | Marketplace UMKM Mahasiswa",
  description: "Mulai berjualan produk Anda di Marketplace UMKM Mahasiswa.",
}

export default function MulaiBerjualanPage() {
  return (
    <div className="py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Mulai Berjualan</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan mahasiswa yang telah sukses menjual produk mereka di platform kami.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <CardTitle>Paket Basic</CardTitle>
              <CardDescription>Untuk pemula</CardDescription>
              <div className="mt-4 text-3xl font-bold">Gratis</div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-left">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Maksimal 10 produk</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Dukungan email</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Analitik dasar</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">
                Pilih Paket
              </Button>
            </CardFooter>
          </Card>

          <Card className="text-center border-blue-500 shadow-lg relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
              Populer
            </div>
            <CardHeader>
              <CardTitle>Paket Pro</CardTitle>
              <CardDescription>Untuk penjual aktif</CardDescription>
              <div className="mt-4 text-3xl font-bold">
                Rp49.000<span className="text-sm font-normal">/bulan</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-left">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Maksimal 50 produk</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Dukungan prioritas</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Analitik lengkap</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Promosi produk</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Pilih Paket</Button>
            </CardFooter>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle>Paket Business</CardTitle>
              <CardDescription>Untuk bisnis berkembang</CardDescription>
              <div className="mt-4 text-3xl font-bold">
                Rp99.000<span className="text-sm font-normal">/bulan</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-left">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Produk tidak terbatas</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Dukungan 24/7</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Analitik premium</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Fitur toko khusus</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">
                Pilih Paket
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="max-w-3xl mx-auto bg-blue-50 p-8 rounded-xl">
          <h2 className="text-2xl font-bold text-center mb-6">Cara Mulai Berjualan</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Daftar Akun</h3>
              <p className="text-sm text-gray-600">Buat akun baru atau login jika sudah memiliki akun</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">Pilih Paket</h3>
              <p className="text-sm text-gray-600">Pilih paket yang sesuai dengan kebutuhan Anda</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">Tambah Produk</h3>
              <p className="text-sm text-gray-600">Tambahkan produk Anda dan mulai berjualan</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
