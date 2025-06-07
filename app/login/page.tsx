'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loginStatus, setLoginStatus] = useState<{ type: 'success' | 'error' | null; message: string | null }>({ type: null, message: null });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi form
    if (!formData.email || !formData.password) {
      toast.error("Email dan password harus diisi");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userRole', data.user.role);
        
        // Dispatch custom event untuk memperbarui header
        window.dispatchEvent(new Event('storage'));
        
        toast.success('Login berhasil!');
        
        setLoginStatus({
          type: 'success',
          message: 'Login berhasil! Anda akan dialihkan ke halaman dashboard.'
        });

        // Redirect berdasarkan role setelah 2 detik
        setTimeout(() => {
          switch (data.user.role) {
            case 'ADMIN':
              router.push('/admin');
              break;
            case 'SELLER':
              router.push('/seller/dashboard');
              break;
            default:
              router.push('/user/dashboard');
          }
        }, 2000);
      } else {
        // Menampilkan pesan error dari server
        setLoginStatus({
          type: 'error',
          message: data.error || 'Email atau password salah'
        });
        toast.error(data.error || 'Email atau password salah');
      }
    } catch (error) {
      setLoginStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Terjadi kesalahan saat login'
      });
      toast.error('Terjadi kesalahan saat login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          {loginStatus.type && (
            <Alert className={`mb-4 ${loginStatus.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
              {loginStatus.type === 'success' ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <AlertCircle className="h-5 w-5" />
              )}
              <AlertTitle className="text-lg font-semibold">
                {loginStatus.type === 'success' ? 'Login Berhasil!' : 'Login Gagal!'}
              </AlertTitle>
              <AlertDescription className="text-base">
                {loginStatus.message}
              </AlertDescription>
            </Alert>
          )}
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
              <CardDescription className="text-center">Masuk ke akun Anda untuk melanjutkan</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/lupa-password" className="text-sm text-blue-500 hover:underline">
                      Lupa password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading ? "Memproses..." : "Login"}
                </Button>
              </CardContent>
            </form>
            <CardFooter className="flex flex-col space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Atau login dengan</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" disabled={isLoading}>Google</Button>
                <Button variant="outline" disabled={isLoading}>Facebook</Button>
              </div>
            </CardFooter>
          </Card>
          <div className="mt-4 text-center text-sm">
            Belum punya akun?{" "}
            <Link href="/register" className="text-blue-500 hover:underline">
              Daftar sekarang
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
