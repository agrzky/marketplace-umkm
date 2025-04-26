import Image from "next/image"
import type { Metadata } from "next"
import { Star, ShoppingCart, Heart, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { products } from "@/data/products"
import { notFound } from "next/navigation"

interface ProductPageProps {
  params: {
    id: string
  }
}

export function generateMetadata({ params }: ProductPageProps): Metadata {
  const product = products.find((p) => p.id === params.id)

  if (!product) {
    return {
      title: "Produk Tidak Ditemukan | Marketplace UMKM Mahasiswa",
    }
  }

  return {
    title: `${product.title} | Marketplace UMKM Mahasiswa`,
    description: product.description,
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = params
  const product = products.find((p) => p.id === id)

  if (!product) {
    notFound()
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link href="/produk" className="text-blue-500 hover:underline flex items-center gap-1">
            &larr; Kembali ke Produk
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              width={500}
              height={500}
              className="w-full h-auto object-contain rounded-lg"
              unoptimized
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.title}</h1>
            <p className="text-2xl font-semibold text-blue-600 mb-4">{product.price}</p>

            <div className="flex items-center mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                />
              ))}
              <span className="text-gray-500 ml-2">({product.reviews} ulasan)</span>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Deskripsi</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-sm text-gray-500">Penjual</h3>
                <p className="font-medium">{product.seller}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500">Kategori</h3>
                <p className="font-medium">{product.category}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button className="flex-1 gap-2" size="lg">
                <ShoppingCart className="h-5 w-5" />
                Tambah ke Keranjang
              </Button>
              <Button variant="outline" size="lg" className="flex-1 gap-2">
                Beli Sekarang
              </Button>
            </div>

            <div className="flex gap-4">
              <Button variant="ghost" size="sm" className="gap-2">
                <Heart className="h-4 w-4" />
                Simpan
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" />
                Bagikan
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
