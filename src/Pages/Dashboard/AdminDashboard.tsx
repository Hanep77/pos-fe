import { axiosPrivate } from "@/lib/axios";
import { DollarSign, Package, User, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const getDatesForFilter = (filterType: string) => {
  const today = new Date();
  let start = new Date();
  let end = new Date();

  const formatDate = (date: Date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  switch (filterType) {
    case "today":
      end.setDate(today.getDate() + today.getDay() + 1);
      break;
    case "week":
      start.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1)); // Monday of current week
      end.setDate(today.getDate() - today.getDay() + 7); // Sunday of current week
      break;
    case "month":
      start = new Date(today.getFullYear(), today.getMonth(), 1);
      end = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Last day of current month
      break;
    case "year":
      start = new Date(today.getFullYear(), 0, 1);
      end = new Date(today.getFullYear(), 11, 31); // Last day of current year
      break;
    case "all":
      // For "all time", we might just not pass start_at and end_at to the API
      // or use a very distant past date. For now, let's keep it simple
      // and assume the API handles it if dates are omitted or null.
      // For the purpose of providing values, let's set a very old start date.
      start = new Date(2000, 0, 1); // A reasonable arbitrary start
      end = today;
      break;
  }
  console.log(`getDatesForFilter: ${filterType} -> Start: ${formatDate(start)}, End: ${formatDate(end)}`);
  return { start: formatDate(start), end: formatDate(end) };
};

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
    title: "Total Penjualan",
    value: "Rp 15.240.000",
    icon: DollarSign,
    color: "bg-yellow-500",
  },
];

type SalesType = {
  name: string,
  sales: number,
}

export default function AdminDashboard() {
  const [totalBarang, setTotalBarang] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPelanggan, setTotalPelanggan] = useState(0);
  const [salesData, setSalesData] = useState<SalesType[]>([]);
  const [totalSales, setTotalSales] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("week");
  const initialDates = getDatesForFilter(selectedFilter);
  const [startAt, setStartAt] = useState(initialDates.start);
  const [endAt, setEndAt] = useState(initialDates.end);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilter = event.target.value;
    setSelectedFilter(newFilter);
    const { start, end } = getDatesForFilter(newFilter);
    setStartAt(start);
    setEndAt(end);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const totalProducts = await axiosPrivate.get("/products/count");
        setTotalBarang(totalProducts.data.data)

        const totalUsers = await axiosPrivate.get("/users/count");
        setTotalUsers(totalUsers.data.data)

        const totalPelanggan = await axiosPrivate.get("/customers/count");
        setTotalPelanggan(totalPelanggan.data.data)

        if (startAt && endAt) {
          const salesSummary = await axiosPrivate.get(`/list-sales?start_at=${startAt}&end_at=${endAt}`);
          console.log("Sales Summary Data:", salesSummary.data); // Added log
          setSalesData(salesSummary.data.data);
          const sumSales = salesSummary.data.data.reduce((sum: number, item: SalesType) => sum + item.sales, 0);
          setTotalSales(sumSales);
        } else if (selectedFilter === "all") { // If "all" is selected, fetch all sales without date parameters
          const salesSummary = await axiosPrivate.get(`/list-sales`);
          console.log("Sales Summary Data (All):", salesSummary.data); // Added log
          setSalesData(salesSummary.data.data);
          const sumSales = salesSummary.data.data.reduce((sum: number, item: SalesType) => sum + item.sales, 0);
          setTotalSales(sumSales);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    }
    getData();
  }, [startAt, endAt, selectedFilter]);

  return <div className="space-y-6">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard Admin</h1>
      <div className="flex space-x-4">
        <select
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedFilter}
          onChange={handleFilterChange}
        >
          <option value="today">Hari Ini</option>
          <option value="week">Minggu Ini</option>
          <option value="month">Bulan Ini</option>
          <option value="year">Tahun Ini</option>
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
              <p className="text-sm opacity-80">Total Penjualan</p>
              {
                stat.title == "Total Barang" &&
                <p className="text-2xl font-bold">{totalBarang}</p>
              }
              {
                stat.title == "Total User" &&
                <p className="text-2xl font-bold">{totalUsers}</p>
              }
              {
                stat.title == "Total Pelanggan" &&
                <p className="text-2xl font-bold">{totalPelanggan}</p>
              }
              {
                stat.title == "Total Penjualan" &&
                <p className="text-2xl font-bold">Rp {totalSales.toLocaleString()}</p>
              }
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
          <BarChart data={salesData}>
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
