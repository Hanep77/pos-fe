import { axiosPrivate } from "@/lib/axios";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

type UserType = {
  id: string,
  username: string,
  role: string,
}

type PaginationType = {
  current_page: number,
  per_page: number,
  total_pages: number
}

export default function KelolaUser() {
  const [users, setUsers] = useState<UserType[] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [pagination, setPagination] = useState<PaginationType | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get(`/users?search=${searchQuery}&page=${currentPage}`);
        setUsers(response.data.data);
        setPagination(response.data.pagination);
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
  }, [searchQuery, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axiosPrivate.delete(`/users/${id}`);
        setUsers(users?.filter((user) => user.id !== id) || null);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return <div className="p-6 space-y-6">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-gray-800">Kelola User</h1>
      <Link to="/dashboard/users/tambah" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
        <Plus size={20} />
        <span>Tambah User</span>
      </Link>
    </div>

    {/* Search */}
    <div className="bg-white rounded-xl shadow-md p-4">
      <input
        type="text"
        placeholder="Cari user..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-96 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Users Table */}
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users?.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {user.username}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link to={`/dashboard/users/edit/${user.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:text-red-900">
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pagination && <div className="p-4 flex justify-end items-center gap-4">
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
      </div>}
    </div>
  </div>
}
