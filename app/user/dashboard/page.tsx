'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Package, Star, Clock } from "lucide-react";
import { toast } from "sonner";

interface Order {
  id: string;
  status: string;
  total: number;
  createdAt: string;
}

interface Review {
  id: string;
  productName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export default function UserDashboard() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchDashboardData = async () => {
      try {
        // Fetch user data
        const userResponse = await fetch('/api/user/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUserData(userData);
          localStorage.setItem('userRole', userData.role); // Simpan role user
        }

        // Fetch orders
        const ordersResponse = await fetch('/api/orders', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (ordersResponse.ok) {
          const ordersData = await ordersResponse.json();
          setOrders(ordersData.orders || []);
        }

        // Fetch reviews
        const reviewsResponse = await fetch('/api/user/reviews', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (reviewsResponse.ok) {
          const reviewsData = await reviewsResponse.json();
          setReviews(reviewsData.reviews || []);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Gagal memuat data dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Selamat datang{userData ? `, ${userData.firstName}` : ''} di Marketplace UMKM
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pesanan</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
            <p className="text-xs text-muted-foreground">Pesanan yang telah dibuat</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pesanan Aktif</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {orders.filter(order => order.status === 'PROCESSING').length}
            </div>
            <p className="text-xs text-muted-foreground">Pesanan dalam proses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ulasan</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reviews.length}</div>
            <p className="text-xs text-muted-foreground">Ulasan yang diberikan</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Riwayat</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {orders.filter(order => order.status === 'COMPLETED').length}
            </div>
            <p className="text-xs text-muted-foreground">Pesanan selesai</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Pesanan Terbaru</CardTitle>
            <CardDescription>Daftar pesanan terakhir Anda</CardDescription>
          </CardHeader>
          <CardContent>
            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.slice(0, 5).map((order) => (
                  <div key={order.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Order #{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        Rp {order.total.toLocaleString('id-ID')}
                      </p>
                      <p className="text-sm text-muted-foreground capitalize">
                        {order.status.toLowerCase()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">Belum ada pesanan</p>
            )}
            {orders.length > 5 && (
              <Button
                variant="link"
                className="mt-4 w-full"
                onClick={() => router.push('/user/orders')}
              >
                Lihat Semua Pesanan
              </Button>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ulasan Terbaru</CardTitle>
            <CardDescription>Ulasan yang Anda berikan</CardDescription>
          </CardHeader>
          <CardContent>
            {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.slice(0, 5).map((review) => (
                  <div key={review.id} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{review.productName}</p>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(review.createdAt).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">Belum ada ulasan</p>
            )}
            {reviews.length > 5 && (
              <Button
                variant="link"
                className="mt-4 w-full"
                onClick={() => router.push('/user/reviews')}
              >
                Lihat Semua Ulasan
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}