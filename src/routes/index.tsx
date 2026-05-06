import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import VMList from "../pages/VMList";
import UserList from "../pages/UserList";
import PublicVMList from "../pages/PublicVMList";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import AppLayout from "../layout/AppLayout";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/vms" element={<PublicVMList />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/vms" element={<VMList />} />
            <Route element={<AdminRoute />}>
              <Route path="/dashboard/users" element={<UserList />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
