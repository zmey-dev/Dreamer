import React, { useState } from "react";
import { User, Lock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword, updateProfile } from "../store/slices/authSlice";

const MyProfile = () => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth.user);

  const [name, setName] = useState(auth.name);
  const [email, setEmail] = useState(auth.email);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ name, email }));
    setIsEditingProfile(false);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match");
      return;
    }
    if (newPassword === currentPassword) {
      alert("New password must be different from current password");
      return;
    }
    dispatch(
      updatePassword({
        current_password: currentPassword,
        password: newPassword,
      })
    );
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsChangingPassword(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>

        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <User size={24} />
              Profile Information
            </h2>
            <button
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="text-blue-400 hover:text-blue-300"
            >
              {isEditingProfile ? "Cancel" : "Edit"}
            </button>
          </div>

          {isEditingProfile ? (
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-1">Name</label>
                <p className="text-lg">{auth.name}</p>
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Email</label>
                <p className="text-lg">{auth.email}</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Lock size={24} />
              Change Password
            </h2>
            <button
              onClick={() => {
                setIsChangingPassword(!isChangingPassword);
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
              }}
              className="text-blue-400 hover:text-blue-300"
            >
              {isChangingPassword ? "Cancel" : "Change"}
            </button>
          </div>

          {isChangingPassword && (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  minLength={8}
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  minLength={8}
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  minLength={8}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Update Password
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
