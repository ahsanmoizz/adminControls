import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user")); 

  return user?.role === "admin" || user?.role === "superadmin" ? (
    children
  ) : (
    <Navigate to="/unauthorized" />
  );
};

export default AdminRoute;
