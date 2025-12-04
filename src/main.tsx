import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import AuthLayout from './layout/AuthLayout'
import GuestLayout from './layout/GuestLayout'
import Login from './Pages/Login'
import AdminDashboard from './Pages/Dashboard/AdminDashboard'
import KelolaBarang from './Pages/Dashboard/KelolaBarang'
import KelolaUser from './Pages/Dashboard/KelolaUser'
import KelolaPelanggan from './Pages/Dashboard/KelolaPelanggan'
import LaporanPenjualan from './Pages/Dashboard/LaporanPenjualan'
import Cashier from './Pages/Cashier'
import { UserContextProvider } from './context/userContext'
import TambahBarang from './Pages/Dashboard/TambahBarang'
import EditBarang from './Pages/Dashboard/EditBarang'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path='/dashboard' element={<AdminDashboard />} />
            <Route path='/dashboard/barang' element={<KelolaBarang />} />
            <Route path='/dashboard/barang/tambah' element={<TambahBarang />} />
            <Route path='/dashboard/barang/edit/:id' element={<EditBarang />} />
            <Route path='/dashboard/users' element={<KelolaUser />} />
            <Route path='/dashboard/pelanggan' element={<KelolaPelanggan />} />
            <Route path='/dashboard/laporan-penjualan' element={<LaporanPenjualan />} />
            <Route path='/kasir' element={<Cashier />} />
          </Route>
          <Route element={<GuestLayout />}>
            <Route path='/login' element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  </StrictMode>,
)
