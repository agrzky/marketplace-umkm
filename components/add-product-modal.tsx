"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Upload, X } from "lucide-react"

export function AddProductModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Reset form and close modal
    setIsSubmitting(false)
    setIsOpen(false)

    // You would typically show a success notification here
    alert("Produk berhasil ditambahkan!")
  }

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)}>
        <Plus className="h-4 w-4 mr-2" /> Tambah Produk
      </Button>
    )
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={() => !isSubmitting && setIsOpen(false)} />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md md:max-w-lg bg-white rounded-lg shadow-lg p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Tambah Produk Baru</h2>
          <Button variant="ghost" size="icon" onClick={() => !isSubmitting && setIsOpen(false)} disabled={isSubmitting}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Nama Produk</Label>
            <Input id="title" placeholder="Masukkan nama produk" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Harga</Label>
            <Input id="price" placeholder="Rp0" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Kategori</Label>
            <select id="category" className="w-full px-3 py-2 border rounded-md" required>
              <option value="">Pilih kategori</option>
              <option value="fashion">Fashion</option>
              <option value="aksesoris">Aksesoris</option>
              <option value="makanan">Makanan</option>
              <option value="kerajinan">Kerajinan</option>
              <option value="peralatan">Peralatan</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="stock">Stok</Label>
            <Input id="stock" type="number" min="0" placeholder="0" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi Produk</Label>
            <textarea
              id="description"
              placeholder="Deskripsi detail tentang produk"
              className="w-full px-3 py-2 border rounded-md min-h-[100px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="seller">Penjual</Label>
            <Input id="seller" placeholder="Nama penjual atau toko" required />
          </div>

          <div className="space-y-2">
            <Label>Gambar Produk</Label>
            <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center gap-2">
              <Upload className="h-8 w-8 text-gray-400" />
              <p className="text-sm text-gray-500">Drag & drop gambar produk di sini</p>
              <p className="text-xs text-gray-400">atau</p>
              <Button type="button" variant="outline" size="sm">
                Pilih File
              </Button>
              <p className="text-xs text-gray-400 mt-2">PNG, JPG, atau WEBP (Maks. 5MB)</p>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} disabled={isSubmitting}>
              Batal
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Menyimpan..." : "Simpan Produk"}
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}
