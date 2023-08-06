import ErrorPage from './pages/ErrorPage';
import LoginPage from "./pages/LoginPage";
import Dashboard from './pages/Dashboard';
import ProtectedRoute from "./protected-route/ProtectedRoute";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={< LoginPage />} />
          <Route element={<ProtectedRoute route={"/login"} />}>
            <Route path="/" element={< Dashboard />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
