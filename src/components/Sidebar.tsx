import { useUserContext } from "@/context/userContext";
import { Calculator, FileText, Home, LogOut, Package, ShoppingCart, User, Users } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";

const adminMenus = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/dashboard"
  },
  {
    title: "Kelola Barang",
    icon: Package,
    href: "/dashboard/barang"
  },
  {
    title: "Kelola User",
    icon: User,
    href: "/dashboard/users"
  },
  {
    title: "Kelola Pelanggan",
    icon: Users,
    href: "/dashboard/pelanggan"
  },
  {
    title: "Laporan Penjualan",
    icon: FileText,
    href: "/dashboard/laporan-penjualan"
  }
]

export default function Sidebar() {
  const sidebarOpen = true;
  const { pathname } = useLocation();
  const { setToken, setUser } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    navigate("/login");
  }

  return <div
    className="fixed left-0 top-0 h-screen transition-all duration-300 bg-gray-200 w-64">
    <nav className="px-2 flex flex-col justify-between h-full py-4">
      <div>
        <div className="px-2 py-2 text-sm font-medium text-gray-400">
          CASHIER MENU
        </div>
        <div className="space-y-1">
          <Link to={"/kasir"}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${pathname === "/kasir"
              ? "bg-blue-600 text-white"
              : "hover:bg-gray-300 cursor-pointer"
              }`}
          >
            <Calculator size={20} className="mr-3" />
            Kasir
          </Link>
        </div>
        <div className="px-2 py-2 text-sm font-medium text-gray-400">
          ADMIN MENU
        </div>
        <div className="space-y-1">
          {adminMenus.map(menu =>
            <Link to={menu.href}
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${pathname === menu.href
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-300 cursor-pointer"
                }`}
            >
              <menu.icon size={20} className="mr-3" />
              {menu.title}
            </Link>
          )}
        </div>
      </div>

      <div className="px-2">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-2 py-2 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
        >
          <LogOut size={20} className="mr-3" />
          {sidebarOpen && "Logout"}
        </button>
      </div>
    </nav>
  </div>
}
