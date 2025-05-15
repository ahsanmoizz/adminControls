// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRoute from "./AdminRoutes";

import Unauthorized from "./unauthorized";
import AdminSidebar from "./AdminSideBar";

import AdminFees from "./AdminFee";
import AdminNonEvmFees from "./AdminNonEvmFee";
import AdminWithdrawFees from "./AdminWithdrawFeeEVM";
import AdminPayments from "./AdminPayments";
import AdminSubscriptionPlans from "./AdminSubscriptionPanel";
import AdminPanel from "./AdminPanel";
import SuperAdminPanel from "./superAdminPanel";
import AdminTxViewer from "./AdminTransactionViewer";
function App() {
  return (
    <Router>
      <Routes>

        {/* Unauthorized route */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <AdminRoute>
              <div className="flex">
                <AdminSidebar />
                <div className="flex-1 p-4 bg-gray-100 min-h-screen">
                  <Routes>
                    <Route path="fees" element={<AdminFees />} />
                    <Route path="non-evm-fees" element={<AdminNonEvmFees />} />
                    <Route path="withdraw-evm" element={<AdminWithdrawFees />} />
                    <Route path="payments" element={<AdminPayments />} />
                    <Route path="subscriptions" element={<AdminSubscriptionPlans />} />
                    <Route path="users" element={<AdminPanel />} />
                    <Route path="transactions" element={<AdminTxViewer />} />
                    <Route path="super" element={<SuperAdminPanel />} />
                  </Routes>
                </div>
              </div>
            </AdminRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
