import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, MapPin, Phone, Mail } from "lucide-react"

export default function UserProfilePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Profil Saya</h2>
          <p className="text-muted-foreground">Kelola informasi profil Anda</p>
        </div>
        <Button>Simpan Perubahan</Button>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="address">Alamat</TabsTrigger>
          <TabsTrigger value="security">Keamanan</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Profil</CardTitle>
              <CardDescription>Perbarui informasi profil dan kontak Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="h-16 w-16 text-gray-500" />
                  </div>
                  <Button variant="outline" size="sm">
                    Ubah Foto
                  </Button>
                </div>

                <div className="grid gap-4 flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nama Depan</Label>
                      <Input id="firstName" defaultValue="Budi" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nama Belakang</Label>
                      <Input id="lastName" defaultValue="Santoso" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="budi.santoso@example.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Nomor Telepon</Label>
                    <Input id="phone" type="tel" defaultValue="+62 812 3456 7890" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Ceritakan sedikit tentang diri Anda"
                      defaultValue="Mahasiswa Teknik Informatika yang senang berbelanja produk lokal."
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informasi Kontak</CardTitle>
              <CardDescription>Informasi kontak yang dapat dihubungi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">+62 812 3456 7890</p>
                    <p className="text-sm text-muted-foreground">Nomor Telepon Utama</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">budi.santoso@example.com</p>
                    <p className="text-sm text-muted-foreground">Email Utama</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="address" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Alamat Pengiriman</CardTitle>
              <CardDescription>Kelola alamat pengiriman Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4 relative">
                <div className="absolute top-4 right-4">
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>

                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Alamat Rumah</p>
                    <p className="text-sm text-muted-foreground">Alamat Utama</p>
                  </div>
                </div>

                <div className="space-y-1 ml-8">
                  <p className="font-medium">Budi Santoso</p>
                  <p>Jl. Merdeka No. 123, RT 05/RW 02</p>
                  <p>Kelurahan Sukamaju, Kecamatan Cilodong</p>
                  <p>Kota Depok, Jawa Barat 16413</p>
                  <p>Indonesia</p>
                  <p>+62 812 3456 7890</p>
                </div>
              </div>

              <div className="border rounded-lg p-4 relative">
                <div className="absolute top-4 right-4">
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>

                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Alamat Kantor</p>
                    <p className="text-sm text-muted-foreground">Alamat Alternatif</p>
                  </div>
                </div>

                <div className="space-y-1 ml-8">
                  <p className="font-medium">Budi Santoso</p>
                  <p>Gedung Menara Tinggi, Lantai 12</p>
                  <p>Jl. Jendral Sudirman Kav. 45-46</p>
                  <p>Jakarta Selatan, DKI Jakarta 12190</p>
                  <p>Indonesia</p>
                  <p>+62 812 3456 7890</p>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                Tambah Alamat Baru
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ubah Password</CardTitle>
              <CardDescription>Perbarui password akun Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Password Saat Ini</Label>
                <Input id="currentPassword" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">Password Baru</Label>
                <Input id="newPassword" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Konfirmasi Password Baru</Label>
                <Input id="confirmPassword" type="password" />
              </div>

              <Button>Perbarui Password</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Keamanan Akun</CardTitle>
              <CardDescription>Kelola pengaturan keamanan akun Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Verifikasi Dua Faktor</p>
                  <p className="text-sm text-muted-foreground">Tambahkan lapisan keamanan ekstra untuk akun Anda</p>
                </div>
                <Button variant="outline">Aktifkan</Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Sesi Aktif</p>
                  <p className="text-sm text-muted-foreground">Kelola perangkat yang terhubung ke akun Anda</p>
                </div>
                <Button variant="outline">Kelola</Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Riwayat Login</p>
                  <p className="text-sm text-muted-foreground">Lihat riwayat login akun Anda</p>
                </div>
                <Button variant="outline">Lihat</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
