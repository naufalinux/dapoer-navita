"use client";

import { useState } from "react";
import { Search, Filter, Download } from "lucide-react";

type OrderLog = {
  id: string;
  customerName: string;
  phone: string;
  items: string;
  total: number;
  status: "Pending" | "WhatsApp Redirected" | "Completed" | "Cancelled";
  date: string;
};

const mockOrders: OrderLog[] = [
  { id: "ORD-2026-001", customerName: "Budi Santoso", phone: "+62 812-3456-7890", items: "2x Nasi Ayam Geprek, 1x Bubur Kacang Ijo", total: 60000, status: "Pending", date: "2026-07-08" },
  { id: "ORD-2026-002", customerName: "Siti Aminah", phone: "+62 813-2233-4455", items: "5x Cumi Cabe Ijo Rice Bowl", total: 125000, status: "WhatsApp Redirected", date: "2026-07-08" },
  { id: "ORD-2026-003", customerName: "Ahmad Yani", phone: "+62 856-7788-9900", items: "2x Nasi Box Nasi Uduk Telor", total: 34000, status: "Completed", date: "2026-07-07" },
  { id: "ORD-2026-004", customerName: "Dewi Lestari", phone: "+62 878-1122-3344", items: "10x Nasi Ayam Geprek", total: 250000, status: "Completed", date: "2026-07-07" },
  { id: "ORD-2026-005", customerName: "Rina Nose", phone: "+62 811-9988-7766", items: "1x Cumi Cabe Ijo Rice Bowl", total: 25000, status: "WhatsApp Redirected", date: "2026-07-07" },
  { id: "ORD-2026-006", customerName: "Anton Syah", phone: "+62 812-5555-6666", items: "3x Tahu Berontak", total: 33000, status: "Cancelled", date: "2026-07-06" },
];

export default function OrderLogs() {
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterDate, setFilterDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = mockOrders.filter((order) => {
    const matchStatus = filterStatus === "All" || order.status === filterStatus;
    const matchDate = filterDate === "" || order.date === filterDate;
    const matchSearch = order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || order.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchDate && matchSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold font-serif text-foreground">Order Logs</h1>
        <button className="flex items-center gap-2 bg-white border border-gray-200 text-foreground/80 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by Order ID or Customer Name..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex items-center w-full md:w-48">
            <Filter className="absolute left-3 w-4 h-4 text-gray-400" />
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none transition-all"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="WhatsApp Redirected">WhatsApp Redirected</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          
          <input 
            type="date" 
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="w-full md:w-auto px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground/80"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-foreground/60 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Order Details</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Items</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-foreground">{order.id}</div>
                      <div className="text-xs text-foreground/60 mt-1">{order.date}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-foreground">{order.customerName}</div>
                      <div className="text-xs text-foreground/60 mt-1">{order.phone}</div>
                    </td>
                    <td className="px-6 py-4 text-foreground/80 max-w-xs truncate" title={order.items}>
                      {order.items}
                    </td>
                    <td className="px-6 py-4 font-bold text-foreground">
                      Rp {order.total.toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold
                        ${order.status === "Pending" ? "bg-yellow-100 text-yellow-700" : 
                          order.status === "WhatsApp Redirected" ? "bg-blue-100 text-blue-700" : 
                          order.status === "Cancelled" ? "bg-red-100 text-red-700" :
                          "bg-green-100 text-green-700"}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-foreground/50">
                    No orders found matching the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
