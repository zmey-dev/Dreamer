import React, { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  X,
  UserPlus,
} from "lucide-react";
import { truncateText } from "../utils/truncateTitle";
import { useDispatch, useSelector } from "react-redux";
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from "../store/slices/userSlice";
import toast from "react-hot-toast";
import { UserModal } from "./UserModal";
import { getAllProjects } from "../store/slices/projectSlice";
import { SubmitReviewModal } from "./SubmitReviewModal";
import { createReviewForUser } from "../store/slices/reviewSlice";

const UserTable = ({ users }) => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth.user);

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUserID, setSelectedUserID] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({});

  const itemsPerPage = 5;
  const selectedUser = users.find((user) => user.id === selectedUserID);

  useEffect(() => {
    // Load users data
    dispatch(getAllUsers());
    if (auth.role === "executive") dispatch(getAllProjects());
  }, [dispatch, auth]);

  useEffect(() => {
    setTotalPages(
      Math.ceil((users && users.length > 0 ? users.length : 1) / 5)
    );
  }, [users]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const paginatedUsers = users?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const onSave = (user) => {
    dispatch(updateUser(user));
  };

  const submitReview = (review) => {
    dispatch(createReviewForUser(review));
  };

  const handleAddUser = () => {
    if (newUser.name && newUser.email && newUser.role) {
      const userToAdd = {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      };
      dispatch(createUser(userToAdd)).then(() => {
        setShowAddModal(false);
        setNewUser({});
      });
    } else {
      toast.error("Please fill all fields");
    }
  };

  const handleDeleteUser = async (id) => {
    const result = await confirm("Are you sure you want to delete this user?");
    if (result) dispatch(deleteUser(id));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">User Management</h1>
          {auth.role === "executive" && (
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
            >
              <UserPlus size={20} />
              Add User
            </button>
          )}
        </div>

        {/* Table */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-6 py-3 text-left">No</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Team</th>
                <th className="px-6 py-3 text-left">Advisory Projects</th>
                <th className="px-6 py-3 text-left">Role</th>
                {auth.role == "executive" && (
                  <th className="px-6 py-3 text-left"></th>
                )}
              </tr>
            </thead>
            <tbody>
              {paginatedUsers?.map((user, index) => (
                <tr
                  key={user.id}
                  onClick={() => {
                    setSelectedUserID(user.id);
                    setShowModal(true);
                  }}
                  className="border-b border-gray-700 hover:bg-gray-700 cursor-pointer"
                >
                  <td className="px-6 py-4">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.team?.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {user?.internal_advisory_projects?.map((p) => (
                        <span
                          key={p.id}
                          className="bg-blue-600 text-white px-2 py-1 rounded text-sm"
                        >
                          {p.name}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">{user.role}</td>
                  {auth.role == "executive" && (
                    <td className="px-6 py-4 w-12">
                      <Trash2
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteUser(user.id);
                        }}
                        size={20}
                        className="cursor-pointer w-8 h-8 p-2 rounded-lg hover:bg-black/30 text-red-500"
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50"
          >
            <ChevronLeft size={20} />
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Detail Modal */}
        {showModal &&
          (auth?.role === "executive" ? (
            <UserModal
              user={selectedUser}
              isOpen={showModal}
              onSave={onSave}
              onClose={() => setShowModal(false)}
            />
          ) : (
            <SubmitReviewModal
              user={selectedUser}
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              submitReview={submitReview}
            />
          ))}

        {/* Add User Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Add New User</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 hover:bg-gray-700 rounded"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    value={newUser.name || ""}
                    onChange={(e) =>
                      setNewUser({ ...newUser, name: e.target.value })
                    }
                    className="w-full bg-gray-700 rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={newUser.email || ""}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                    className="w-full bg-gray-700 rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Role</label>
                  <select
                    value={newUser.role || ""}
                    onChange={(e) =>
                      setNewUser({ ...newUser, role: e.target.value })
                    }
                    className="w-full bg-gray-700 rounded-lg px-3 py-2"
                  >
                    <option value="">Select Role</option>
                    <option value="executive">Executive</option>
                    <option value="manager">Manager</option>
                    <option value="user">User</option>
                  </select>
                </div>

                <button
                  onClick={handleAddUser}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg w-full justify-center mt-6"
                >
                  <Plus size={20} />
                  Add User
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTable;
