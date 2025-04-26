import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Tentang Kami | Marketplace UMKM Mahasiswa",
  description: "Pelajari lebih lanjut tentang Marketplace UMKM Mahasiswa dan misi kami.",
}

export default function TentangKamiPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Tentang Kami</h1>
          <div className="h-1 w-20 bg-blue-500 mb-8 rounded-full"></div>

          <div className="prose max-w-none">
            <p className="text-lg text-gray-600 mb-6">
              Marketplace UMKM Mahasiswa adalah platform yang didedikasikan untuk membantu mahasiswa Indonesia dalam
              mengembangkan usaha mikro, kecil, dan menengah mereka. Kami percaya bahwa mahasiswa memiliki potensi besar
              untuk menjadi wirausahawan sukses, dan kami ingin memberikan dukungan melalui platform yang mudah
              digunakan dan terjangkau.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-12 mb-4">Visi Kami</h2>
            <p className="text-lg text-gray-600 mb-6">
              Menjadi platform terdepan yang memberdayakan mahasiswa Indonesia untuk mengembangkan keterampilan
              kewirausahaan dan membangun bisnis yang berkelanjutan.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-12 mb-4">Misi Kami</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
              <li>Menyediakan platform yang mudah digunakan untuk mahasiswa menjual produk mereka</li>
              <li>Memberikan pelatihan dan sumber daya untuk mengembangkan keterampilan bisnis</li>
              <li>Membangun komunitas wirausaha mahasiswa yang saling mendukung</li>
              <li>Menghubungkan mahasiswa dengan mentor dan investor potensial</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-800 mt-12 mb-4">Tim Kami</h2>
            <p className="text-lg text-gray-600 mb-6">
              Tim kami terdiri dari profesional berpengalaman dan mahasiswa yang bersemangat untuk mendukung ekosistem
              kewirausahaan mahasiswa di Indonesia.
            </p>

            <div className="mt-12 text-center">
              <Button asChild size="lg" className="px-8">
                <Link href="/mulai-berjualan">Bergabung Dengan Kami</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
