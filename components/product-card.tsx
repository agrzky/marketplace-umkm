import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface ProductCardProps {
  id: string
  image: string
  title: string
  price: string
  rating: number
  reviews: number
}

export default function ProductCard({ id, image, title, price, rating, reviews }: ProductCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg group">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <Image
          src={`/placeholder.svg?height=300&width=300&text=${encodeURIComponent(title)}`}
          alt={title}
          width={300}
          height={300}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          unoptimized
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{title}</h3>
        <p className="text-lg font-medium text-blue-600 mb-2">{price}</p>
        <div className="flex items-center mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
          ))}
          <span className="text-gray-500 text-sm ml-2">({reviews})</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full" variant="outline">
          <Link href={`/produk/${id}`}>Lihat Detail</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
