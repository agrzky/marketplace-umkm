import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, Truck, CheckCircle, Clock, AlertCircle } from "lucide-react"

export default function UserOrdersPage() {
  const orders = [
    {
      id: "ORD-12345",
      date: "12 Mei 2023",
      status: "completed",
      total: "Rp250.000",
      items: [
        { name: "Kaos Polos", price: "Rp120.000", quantity: 1 },
        { name: "Tas Kanvas", price: "Rp50.000", quantity: 1 },
        { name: "Botol Minum", price: "Rp50.000", quantity: 1 },
      ],
    },
    {
      id: "ORD-12346",
      date: "20 Mei 2023",
      status: "shipped",
      total: "Rp150.000",
      items: [{ name: "Cetakan Seni", price: "Rp150.000", quantity: 1 }],
    },
    {
      id: "ORD-12347",
      date: "25 Mei 2023",
      status: "processing",
      total: "Rp85.000",
      items: [{ name: "Dompet Kulit", price: "Rp85.000", quantity: 1 }],
    },
    {
      id: "ORD-12348",
      date: "1 Juni 2023",
      status: "cancelled",
      total: "Rp45.000",
      items: [{ name: "Tote Bag", price: "Rp45.000", quantity: 1 }],
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "shipped":
        return <Truck className="h-5 w-5 text-blue-500" />
      case "processing":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "cancelled":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <Package className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Selesai"
      case "shipped":
        return "Dikirim"
      case "processing":
        return "Diproses"
      case "cancelled":
        return "Dibatalkan"
      default:
        return "Tidak Diketahui"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Pesanan Saya</h2>
        <p className="text-muted-foreground">Lihat dan kelola pesanan Anda</p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-8">
          <TabsTrigger value="all">Semua</TabsTrigger>
          <TabsTrigger value="processing">Diproses</TabsTrigger>
          <TabsTrigger value="shipped">Dikirim</TabsTrigger>
          <TabsTrigger value="completed">Selesai</TabsTrigger>
          <TabsTrigger value="cancelled">Dibatalkan</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardHeader className="bg-gray-50 py-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <CardTitle className="text-base">{order.id}</CardTitle>
                      <span className="text-sm text-muted-foreground">({getStatusText(order.status)})</span>
                    </div>
                    <CardDescription>Tanggal Pesanan: {order.date}</CardDescription>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-medium">{order.total}</span>
                    <Button variant="outline" size="sm">
                      Detail
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="py-4">
                <div className="space-y-2">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center">
                          <Package className="h-5 w-5 text-gray-500" />
                        </div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-medium">{item.price}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="processing" className="space-y-4">
          {orders
            .filter((order) => order.status === "processing")
            .map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="bg-gray-50 py-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        <CardTitle className="text-base">{order.id}</CardTitle>
                        <span className="text-sm text-muted-foreground">({getStatusText(order.status)})</span>
                      </div>
                      <CardDescription>Tanggal Pesanan: {order.date}</CardDescription>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-medium">{order.total}</span>
                      <Button variant="outline" size="sm">
                        Detail
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="py-4">
                  <div className="space-y-2">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center">
                            <Package className="h-5 w-5 text-gray-500" />
                          </div>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-medium">{item.price}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        {/* Similar content for other tabs */}
      </Tabs>
    </div>
  )
}
