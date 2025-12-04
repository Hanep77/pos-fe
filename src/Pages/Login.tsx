import { useUserContext } from "@/context/userContext";
import { axiosClient } from "@/lib/axios";
import { Lock, Mail } from "lucide-react";
import { useState, type FormEvent } from "react";

export default function Login() {
  const { setUser, setToken } = useUserContext();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement);

    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    } as Record<string, string>;

    setLoading(true);
    await axiosClient.post("/auth/login", data)
      .then(response => {
        console.log(response);
        if (response.status == 200) {
          setUser(response.data.data)
          setToken(response.data.credentials)
        }
      })
      .catch(error => {
        if (error.status == 401) {
          alert("email atau password salah")
        }
      }).finally(() => {
        setLoading(false);
      })
  }

  return <div className="min-h-screen flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
      {/* Header */}
      <div className="bg-blue-600 p-8 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Sistem POS</h1>
        <p className="text-blue-100">Point of Sale Management System</p>
      </div>

      {/* Login Form */}
      <div className="p-8">
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                id="username"
                type="text"
                name="username"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Masukkan username Anda"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                id="password"
                type="password"
                name="password"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Masukkan password Anda"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600">Ingat saya</span>
            </label>
            <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
              Lupa password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center cursor-pointer"
          >
            {loading ? "loading" : "Login"}
          </button>
        </form>
      </div>
    </div>
  </div>
}
