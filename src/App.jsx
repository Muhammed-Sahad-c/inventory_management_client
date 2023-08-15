import "./assets/styles/common.css";
import ErrorPage from './pages/ErrorPage';
import LoginPage from "./pages/LoginPage";
import ProductsPage from './pages/ProductsPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from "./protected-route/ProtectedRoute";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Customers from "./pages/CustomersPage";
import ItemReportsPage from "./pages/ItemReportsPage";
import SaleRecordsPage from "./pages/SaleRecordsPage";
import LedgerPage from "./pages/LedgerPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={< LoginPage />} />
          <Route element={<ProtectedRoute route={"/login"} />}>
            <Route path="/" element={< DashboardPage />} />
            <Route path="/products" element={< ProductsPage />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/itemsreport" element={<ItemReportsPage />} />
            <Route path="/salesreport" element={<SaleRecordsPage />} />
            <Route path="/ledger" element={<LedgerPage />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
