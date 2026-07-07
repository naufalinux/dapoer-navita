import { ShoppingBag, TrendingUp, BotMessageSquare, Star } from "lucide-react";

type Order = {
  id: string;
  customerName: string;
  total: number;
  status: "Pending" | "WhatsApp Redirected" | "Completed";
  date: string;
};

const recentOrders: Order[] = [
  { id: "ORD-001", customerName: "Budi Santoso", total: 50000, status: "Pending", date: "2026-07-08T10:00:00Z" },
  { id: "ORD-002", customerName: "Siti Aminah", total: 125000, status: "WhatsApp Redirected", date: "2026-07-08T09:30:00Z" },
  { id: "ORD-003", customerName: "Ahmad Yani", total: 34000, status: "Completed", date: "2026-07-07T15:45:00Z" },
  { id: "ORD-004", customerName: "Dewi Lestari", total: 250000, status: "Completed", date: "2026-07-07T12:20:00Z" },
  { id: "ORD-005", customerName: "Rina Nose", total: 25000, status: "WhatsApp Redirected", date: "2026-07-07T11:00:00Z" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-serif text-foreground">Dashboard Overview</h1>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
          <div className="p-3 bg-primary/10 text-primary rounded-xl">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground/60">Total Orders Today</p>
            <h3 className="text-2xl font-bold text-foreground">24</h3>
            <p className="text-xs text-green-600 font-medium mt-1">+12% from yesterday</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-xl">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground/60">Revenue (Today)</p>
            <h3 className="text-2xl font-bold text-foreground">Rp 1.250k</h3>
            <p className="text-xs text-green-600 font-medium mt-1">+5% from yesterday</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
          <div className="p-3 bg-accent/20 text-yellow-600 rounded-xl">
            <BotMessageSquare className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground/60">Active AI Chats</p>
            <h3 className="text-2xl font-bold text-foreground">8</h3>
            <p className="text-xs text-foreground/50 font-medium mt-1">Currently interacting</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
          <div className="p-3 bg-secondary/10 text-secondary rounded-xl">
            <Star className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground/60">Top Selling Item</p>
            <h3 className="text-lg font-bold text-foreground leading-tight mt-1">Cumi Cabe Ijo</h3>
            <p className="text-xs text-secondary font-medium mt-1">42 portions sold</p>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold font-serif text-foreground">Recent Orders</h2>
          <button className="text-sm text-primary font-medium hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-foreground/60 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer Name</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{order.id}</td>
                  <td className="px-6 py-4 text-foreground/80">{order.customerName}</td>
                  <td className="px-6 py-4 font-medium">Rp {order.total.toLocaleString("id-ID")}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold
                      ${order.status === "Pending" ? "bg-yellow-100 text-yellow-700" : 
                        order.status === "WhatsApp Redirected" ? "bg-blue-100 text-blue-700" : 
                        "bg-green-100 text-green-700"}`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
