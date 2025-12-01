import { Navigate, Outlet } from "react-router";
// import { useUserContext } from "../context/userContext";

export default function GuestLayout() {
  // const { token } = useUserContext()

  // if (token) {
  //   return <Navigate to={"/"} />
  // }
  //
  return <Outlet />
}
