import { useLocation } from "react-router-dom";
export default function DashboardPage() {
  const location = useLocation();
  console.log("DashboardPage", location.pathname);
  return <h1>Dashboard</h1>;
}
