import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { products } from "@/data/products"

export default function Home() {
  // Get only the first 4 products for the featured section
  const featuredProducts = products.slice(0, 4)

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <section className="py-16 md:py-24 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 tracking-tight">
                Marketplace UMKM
                <br />
                Mahasiswa
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
                Platform untuk memfasilitasi mahasiswa dalam memasarkan produk mereka.
              </p>
              <Button
                asChild
                size="lg"
                className="px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                <Link href="/mulai-berjualan">Mulai Berjualan</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Produk Unggulan</h2>
            <div className="h-1 w-20 bg-blue-500 mb-12 rounded-full"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  image={product.image}
                  title={product.title}
                  price={product.price}
                  rating={product.rating}
                  reviews={product.reviews}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Mengapa Bergabung Dengan Kami?</h2>
              <p className="text-lg text-gray-600 mb-12">
                Marketplace UMKM Mahasiswa menyediakan platform terbaik untuk mahasiswa yang ingin mengembangkan bisnis
                mereka.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="h-8 w-8 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Mudah Digunakan</h3>
                  <p className="text-gray-600">Platform yang sederhana dan intuitif untuk memulai bisnis Anda.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="h-8 w-8 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Jangkauan Luas</h3>
                  <p className="text-gray-600">Akses ke pasar yang luas untuk mempromosikan produk Anda.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="h-8 w-8 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Dukungan Penuh</h3>
                  <p className="text-gray-600">Tim kami siap membantu Anda dalam setiap langkah.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
