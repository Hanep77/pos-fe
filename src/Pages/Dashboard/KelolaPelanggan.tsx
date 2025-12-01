import { Plus } from "lucide-react";

const customers = [
  {
    id: 1,
    name: "Andi Pratama",
    phone: "081234567890",
    address: "Jl. Merdeka No. 123",
  },
  {
    id: 2,
    name: "Siti Rahma",
    phone: "081234567891",
    address: "Jl. Sudirman No. 456",
  },
  {
    id: 3,
    name: "Budi Santoso",
    phone: "081234567892",
    address: "Jl. Thamrin No. 789",
  },
  {
    id: 4,
    name: "Dewi Lestari",
    phone: "081234567893",
    address: "Jl. Diponegoro No. 101",
  },
];

export default function KelolaPelanggan() {
  return <div className="p-6 space-y-6">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-gray-800">Kelola Pelanggan</h1>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
        <Plus size={20} />
        <span>Tambah Pelanggan</span>
      </button>
    </div>

    {/* Search */}
    <div className="bg-white rounded-xl shadow-md p-4">
      <input
        type="text"
        placeholder="Cari pelanggan..."
        className="w-96 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Customers Table */}
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nama
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Telepon
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Alamat
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customers
              .map((customer) => (
                <tr key={customer.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {customer.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
}
