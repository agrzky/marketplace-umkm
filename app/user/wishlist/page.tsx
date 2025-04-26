import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"
import { products } from "@/data/products"
import Image from "next/image"

export default function UserWishlistPage() {
  // For demo purposes, we'll use the first 4 products as wishlist items
  const wishlistItems = products.slice(0, 4)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Wishlist Saya</h2>
          <p className="text-muted-foreground">Produk yang Anda simpan untuk dibeli nanti</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Heart className="h-4 w-4 fill-current" />
          <span>{wishlistItems.length} Item</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <Image
                  src={`/placeholder.svg?height=300&width=300&text=${encodeURIComponent(item.title)}`}
                  alt={item.title}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                  unoptimized
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white/90 text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-blue-600 font-medium mb-4">{item.price}</p>
                <Button className="w-full gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Tambah ke Keranjang
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
