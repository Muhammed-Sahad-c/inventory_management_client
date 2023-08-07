import "./assets/styles/common.css";
import ErrorPage from './pages/ErrorPage';
import LoginPage from "./pages/LoginPage";
import ProductsPage from './pages/ProductsPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from "./protected-route/ProtectedRoute";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={< LoginPage />} />
          <Route element={<ProtectedRoute route={"/login"} />}>
            <Route path="/" element={< DashboardPage />} />
            <Route path="/inventory" element={< ProductsPage />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
