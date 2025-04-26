import type { Metadata } from "next"
import ProductCard from "@/components/product-card"
import { products } from "@/data/products"

export const metadata: Metadata = {
  title: "Produk | Marketplace UMKM Mahasiswa",
  description: "Jelajahi berbagai produk UMKM dari mahasiswa di seluruh Indonesia.",
}

export default function ProdukPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Semua Produk</h1>
          <div className="h-1 w-20 bg-blue-500 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
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
    </div>
  )
}
