import { FileText } from "lucide-react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const adminDashboardData = [
  { name: "Senin", sales: 4000 },
  { name: "Selasa", sales: 3000 },
  { name: "Rabu", sales: 5000 },
  { name: "Kamis", sales: 2780 },
  { name: "Jumat", sales: 6000 },
  { name: "Sabtu", sales: 4890 },
  { name: "Minggu", sales: 3500 },
];

const salesReports = [
  {
    date: "2023-11-01",
    customer: "Andi Pratama",
    product: "Beras 5kg",
    quantity: 2,
    total: 110000,
  },
  {
    date: "2023-11-01",
    customer: "Siti Rahma",
    product: "Minyak Goreng 1L",
    quantity: 1,
    total: 18000,
  },
  {
    date: "2023-11-02",
    customer: "Budi Santoso",
    product: "Gula Pasir 1kg",
    quantity: 3,
    total: 37500,
  },
  {
    date: "2023-11-02",
    customer: "Dewi Lestari",
    product: "Beras 5kg",
    quantity: 1,
    total: 55000,
  },
  {
    date: "2023-11-03",
    customer: "Ahmad Fauzi",
    product: "Minyak Goreng 1L",
    quantity: 2,
    total: 36000,
  },
];

export default function LaporanPenjualan() {
  return <div className="p-6 space-y-6">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-gray-800">Laporan Penjualan</h1>
      <div className="flex space-x-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <FileText size={20} />
          <span>Ekspor Excel</span>
        </button>
      </div>
    </div>

    {/* Filter */}
    <div className="bg-white rounded-xl shadow-md p-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tanggal Mulai
          </label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tanggal Akhir
          </label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pelanggan
          </label>
          <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Semua Pelanggan</option>
            <option>Andi Pratama</option>
            <option>Siti Rahma</option>
            <option>Budi Santoso</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Produk
          </label>
          <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Semua Produk</option>
            <option>Beras 5kg</option>
            <option>Minyak Goreng 1L</option>
            <option>Gula Pasir 1kg</option>
          </select>
        </div>
      </div>
    </div>

    {/* Sales Chart */}
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Tren Penjualan</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={adminDashboardData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#3b82f6"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>

    {/* Sales Table */}
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tanggal
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pelanggan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Produk
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Jumlah
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {salesReports.map((report) => (
              <tr key={report.date}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {report.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {report.customer}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {report.product}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {report.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Rp {report.total.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
}
