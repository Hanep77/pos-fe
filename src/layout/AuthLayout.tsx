import Sidebar from "@/components/Sidebar";
import { Navigate, Outlet, useLocation } from "react-router";
// import { useUserContext } from "../context/userContext";

export default function AuthLayout() {
  // const { token } = useUserContext()
  const { pathname } = useLocation();
  const activeUser = "admin";
  const sidebarOpen = true;

  // if (!token) {
  //   return <Navigate to={"/login"} />
  // }

  if (!pathname.startsWith("/dashboard")) {
    return <Outlet />
  }

  return <div className="flex h-screen">
    <Sidebar />

    <div
      className={`flex-1 ${sidebarOpen ? "ml-64" : "ml-16"
        } transition-all duration-300`}
    >
      {/* Header */}
      <header className="">
        <div className="flex justify-between items-center p-4 px-6">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-800">
              Admin Panel
            </h1>
          </div>

          <div className="flex items-center space-x-2">
            <span className="ml-2 text-sm font-medium text-gray-700">
              {activeUser === "admin" ? "Admin" : "Kasir"}
            </span>
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              {activeUser === "admin" ? "A" : "K"}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 px-6">
        <Outlet />
      </main>
    </div>
  </div>
}
