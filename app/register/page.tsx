'use client';

import type { Metadata } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      toast.error("Semua field harus diisi");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Password dan konfirmasi password tidak cocok");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Terjadi kesalahan saat registrasi');
      }

      toast.success('Registrasi berhasil! Silakan login.');
      router.push('/login');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Terjadi kesalahan saat registrasi');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Register</CardTitle>
              <CardDescription className="text-center">
                Buat akun baru untuk mulai berjualan atau berbelanja
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nama Depan</Label>
                    <Input
                      id="firstName"
                      placeholder="Nama depan"
                      value={formData.firstName}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nama Belakang</Label>
                    <Input
                      id="lastName"
                      placeholder="Nama belakang"
                      value={formData.lastName}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                  </div>
                </div>
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
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading ? "Mendaftar..." : "Daftar"}
                </Button>
              </CardContent>
            </form>
            <CardFooter className="flex flex-col space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Atau daftar dengan</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" disabled={isLoading}>Google</Button>
                <Button variant="outline" disabled={isLoading}>Facebook</Button>
              </div>
            </CardFooter>
          </Card>
          <div className="mt-4 text-center text-sm">
            Sudah punya akun?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Login sekarang
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
