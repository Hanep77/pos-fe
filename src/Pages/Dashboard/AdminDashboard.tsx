import { DollarSign, Package, User, Users } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const adminDashboardData = [
  { name: "Senin", sales: 4000 },
  { name: "Selasa", sales: 3000 },
  { name: "Rabu", sales: 5000 },
  { name: "Kamis", sales: 2780 },
  { name: "Jumat", sales: 6000 },
  { name: "Sabtu", sales: 4890 },
  { name: "Minggu", sales: 3500 },
];

const stats = [
  { title: "Total Barang", value: 124, icon: Package, color: "bg-blue-500" },
  { title: "Total User", value: 8, icon: Users, color: "bg-green-500" },
  {
    title: "Total Pelanggan",
    value: 237,
    icon: User,
    color: "bg-purple-500",
  },
  {
    title: "Penjualan Hari Ini",
    value: "Rp 15.240.000",
    icon: DollarSign,
    color: "bg-yellow-500",
  },
];

export default function AdminDashboard() {
  return <div className="space-y-6">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard Admin</h1>
      <div className="flex space-x-4">
        <select
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="today">Hari Ini</option>
          <option value="week">Minggu Ini</option>
          <option value="month">Bulan Ini</option>
          <option value="all">Semua Waktu</option>
        </select>
      </div>
    </div>

    {/* Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`rounded-xl p-6 shadow-md ${stat.color} text-white`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
            <stat.icon size={40} />
          </div>
        </div>
      ))}
    </div>

    {/* Sales Chart */}
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Statistik Penjualan</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={adminDashboardData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
}
