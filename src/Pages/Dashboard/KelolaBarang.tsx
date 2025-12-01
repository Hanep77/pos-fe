import { Plus } from "lucide-react";

const inventoryItems = [
  {
    id: 1,
    name: "Beras 5kg",
    stock: 5,
    price: 55000,
  },
  {
    id: 2,
    name: "Minyak Goreng 1L",
    stock: 12,
    price: 18000,
  },
  {
    id: 3,
    name: "Gula Pasir 1kg",
    stock: 8,
    price: 12500,
  },
  {
    id: 4,
    name: "Telur Ayam",
    stock: 24,
    price: 25000,
  },
  {
    id: 5,
    name: "Ayam Potong",
    stock: 15,
    price: 35000,
  },
];

export default function KelolaBarang() {
  return <div className="space-y-6">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-gray-800">Kelola Barang</h1>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
        <Plus size={20} />
        <span>Tambah Barang</span>
      </button>
    </div>

    {/* Search and Filter */}
    <div className="bg-white rounded-xl shadow-md p-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Cari barang..."
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
            className="w-96 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Stok</option>
          <option>Stok terendah</option>
          <option>Stok terbanyak</option>
        </select>
      </div>
    </div>

    {/* Inventory Table */}
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nama Barang
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stok
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Harga
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {inventoryItems
              .map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {item.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.stock <= 5
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                        }`}
                    >
                      {item.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Rp {item.price.toLocaleString()}
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
