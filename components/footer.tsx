import Link from "next/link"
import { ShoppingBag, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <ShoppingBag className="h-8 w-8 text-blue-500" />
              <span className="text-xl font-medium text-gray-700">MARKETPLACE UMKM</span>
            </Link>
            <p className="text-gray-600 mb-4">Platform untuk memfasilitasi mahasiswa dalam memasarkan produk mereka.</p>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-500 hover:text-blue-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-blue-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-blue-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-blue-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/produk" className="text-gray-600 hover:text-blue-500 transition-colors">
                  Produk
                </Link>
              </li>
              <li>
                <Link href="/tentang-kami" className="text-gray-600 hover:text-blue-500 transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/mulai-berjualan" className="text-gray-600 hover:text-blue-500 transition-colors">
                  Mulai Berjualan
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Kategori</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/produk?kategori=fashion" className="text-gray-600 hover:text-blue-500 transition-colors">
                  Fashion
                </Link>
              </li>
              <li>
                <Link href="/produk?kategori=aksesoris" className="text-gray-600 hover:text-blue-500 transition-colors">
                  Aksesoris
                </Link>
              </li>
              <li>
                <Link href="/produk?kategori=makanan" className="text-gray-600 hover:text-blue-500 transition-colors">
                  Makanan
                </Link>
              </li>
              <li>
                <Link href="/produk?kategori=kerajinan" className="text-gray-600 hover:text-blue-500 transition-colors">
                  Kerajinan
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Kontak</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-500 mt-0.5" />
                <span className="text-gray-600">Jl. UT No. 123, Kota, Indonesia</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-500" />
                <span className="text-gray-600">+62 123 4567 890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-500" />
                <span className="text-gray-600">info@umkmmarket.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Marketplace UMKM Mahasiswa. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  )
}
