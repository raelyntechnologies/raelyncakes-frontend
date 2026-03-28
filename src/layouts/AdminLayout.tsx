import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/authSlice";

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const currentUser = useAppSelector(selectCurrentUser);

  // Simple check - in a real app, you'd check for admin role
  // For demo, allow access if logged in or allow guest access
  // if (!currentUser) {
  //   return <Navigate to="/login" replace />;
  // }

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      
      <motion.main
        initial={false}
        animate={{ marginLeft: collapsed ? 72 : 256 }}
        className="min-h-screen p-6 transition-all duration-300"
      >
        <Outlet />
      </motion.main>
    </div>
  );
};

export default AdminLayout;
