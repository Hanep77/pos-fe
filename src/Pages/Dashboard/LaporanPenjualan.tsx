import { FileText } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { PaginationType } from "./KelolaBarang";
import { useEffect, useState } from "react";
import { axiosPrivate } from "@/lib/axios";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";
import { Link } from "react-router";

type TransactionType = {
  id: string;
  date: string;
  total: number;
  payment_method: string;
  payment_status: string;
  customer_name: string;
};

type SalesType = {
  name: string;
  sales: number;
};

export default function LaporanPenjualan() {
  const [transactions, setTransactions] = useState<TransactionType[] | null>(
    null,
  );
  const [sales, setSales] = useState<SalesType[] | null>(null);
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [pagination, setPagination] = useState<PaginationType | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [period, setPeriod] = useState<string>("day");

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const products = await axiosPrivate.get(
          `/transactions?start_at=${startAt}&end_at=${endAt}&page=${currentPage}`,
        );
        setTransactions(products.data.data);
        const sales = await axiosPrivate.get(
          `/list-sales?start_at=${startAt}&end_at=${endAt}&period=${period}`,
        );
        setSales(sales.data.data);
        setPagination(products.data.pagination);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [startAt, endAt, currentPage, period]);

  const handleExportExcel = () => {
    if (!transactions || transactions.length === 0) {
      alert("No transaction data to export.");
      return;
    }

    const data = transactions.map((t) => ({
      Tanggal: t.date,
      Pelanggan: t.customer_name,
      "Metode Pembayaran": t.payment_method,
      "Status Pembayaran": t.payment_status,
      Total: t.total,
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Laporan Penjualan");
    XLSX.writeFile(wb, `laporan_penjualan_${startAt}_${endAt}.xlsx`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Laporan Penjualan</h1>
        <div className="flex space-x-4">
          <button
            onClick={handleExportExcel}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
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
              value={startAt}
              onChange={(e) => setStartAt(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal Akhir
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={endAt}
              onChange={(e) => setEndAt(e.target.value)}
            />
          </div>
          {/* <div className="flex-1"> */}
          {/*   <label className="block text-sm font-medium text-gray-700 mb-1"> */}
          {/*     Pelanggan */}
          {/*   </label> */}
          {/*   <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"> */}
          {/*     <option>Semua Pelanggan</option> */}
          {/*     <option>Andi Pratama</option> */}
          {/*     <option>Siti Rahma</option> */}
          {/*     <option>Budi Santoso</option> */}
          {/*   </select> */}
          {/* </div> */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Produk
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={period}
              onChange={(e) => setPeriod(() => e.target.value)}
            >
              <option value="day">per hari</option>
              <option value="week">Per minggu</option>
              <option value="month">Per bulan</option>
              <option value="year">Per tahun</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sales Chart */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Tren Penjualan</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sales ? sales : []}>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions?.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.customer_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.payment_method}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.payment_status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Rp {item.total.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      to={`/transactions/${item.id}/details`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Detail Transaksi
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {pagination && (
          <div className="p-4 flex justify-end items-center gap-4">
            <span className="text-sm text-gray-700">
              Page {pagination.current_page} of {pagination.total_pages}
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(pagination.current_page - 1)}
                disabled={pagination.current_page === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(pagination.current_page + 1)}
                disabled={pagination.current_page === pagination.total_pages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
