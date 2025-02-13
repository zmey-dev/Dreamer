import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import ExecutiveDashboard from "./pages/ExecutiveDashboard/ExecutiveDashboard";
import ManagerDashboard from "./pages/ManagerDashboard/ManagerDashboard";
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import { setUser } from "./store/slices/authSlice";
import useConfirm from "./hook/useConfirm";
import { ConfirmModal } from "./components/ConfirmModal";

const App = () => {
  const naviagte = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  //useSelector
  const loading = useSelector((state) => state.auth.loading);
  const auth_user = useSelector((state) => state.auth.user);

  const token = localStorage.getItem("token");
  const user = JSON.parse(sessionStorage.getItem("user"));

  const { confirm, isOpen, message, handleConfirm, handleCancel } =
    useConfirm();
  window.confirm = confirm;
  useEffect(() => {
    if (token && user) {
      dispatch(setUser(user));
    }
    window.toast = toast;
  }, []);

  useEffect(() => {
    switch (auth_user?.role) {
      case "executive":
        naviagte("/executive/users");
        break;
      case "manager":
        naviagte("/manager/users");
        break;
      case "user":
        naviagte("/user/users");
        break;
      default:
        naviagte("/login");
        break;
    }
  }, [auth_user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Routes>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route path="/executive/:page" element={<ExecutiveDashboard />} />
        <Route path="/manager/:page" element={<ManagerDashboard />} />
        <Route path="/user/:page" element={<UserDashboard />} />
      </Routes>
      {isOpen && (
        <ConfirmModal
          message={message}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default App;
