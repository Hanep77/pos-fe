import { Navigate, Outlet } from "react-router";
import { useUserContext } from "../context/userContext";

export default function GuestLayout() {
  const { user } = useUserContext()

  if (user?.role == "admin") {
    return <Navigate to={"/dashboard"} />
  }

  return <Outlet />
}
