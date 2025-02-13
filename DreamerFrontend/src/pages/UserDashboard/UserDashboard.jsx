import { useState, useEffect } from "react";
import {
  Users,
  Briefcase,
  ClipboardList,
  Settings,
  LogOut,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import { useNavigate, useParams } from "react-router-dom";
import MyProfile from "../../components/MyProfile";
import User from "./components/User";
import MyReview from "../../components/MyReview";
import Review from "../../components/Review";

const PageList = [
  {
    page: "users",
    title: "Users",
    icon: Users,
    component: <User />,
  },
  {
    page: "myreviews",
    title: "Reviews About Me",
    icon: ClipboardList,
    component: <MyReview />,
  },
  {
    page: "reviews",
    title: "Reviews",
    icon: ClipboardList,
    component: <Review />,
  },
  {
    page: "myprofile",
    title: "MyProfile",
    icon: Settings,
    component: <MyProfile />,
  },
];

export default function ExecutiveDashboard() {
  const dispatch = useDispatch();
  const naviagte = useNavigate();
  const { page } = useParams();

  const [activeTab, setActiveTab] = useState("users");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial data loading
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    // Load data based on active tab
    setLoading(false);
  };

  const handleSignOut = async () => {
    await dispatch(logout());
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <div className="fixed w-64 h-full bg-gray-800 p-4">
        <div className="flex flex-col h-full">
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-blue-500">Manager Portal</h1>
            <nav className="space-y-2">
              {PageList.map((item) => (
                <button
                  key={item.page}
                  onClick={() => {
                    naviagte(`/user/${item.page}`);
                  }}
                  className={`flex items-center space-x-2 w-full p-2 rounded-lg transition-colors ${
                    page === item.page ? "bg-blue-600" : "hover:bg-gray-700"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </button>
              ))}
            </nav>
          </div>
          <button
            onClick={handleSignOut}
            className="mt-auto flex items-center space-x-2 w-full p-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-64 p-8">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
          </div>
        ) : (
          <div className="space-y-6">
            {PageList.find((item) => item.page === page)?.component}
          </div>
        )}
      </div>
    </div>
  );
}
