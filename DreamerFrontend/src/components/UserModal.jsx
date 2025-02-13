import React, { useState, useEffect } from "react";
import { X, Check, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { ReviewCard } from "./ReviewCard";

const USER_ROLES = ["executive", "manager", "user"];

export function UserModal({ user, isOpen, onClose, onSave }) {
  const availableProjects = useSelector((state) => state.project.projects);

  const [role, setRole] = useState(user.role);
  const [internal_advisory_projects, setAdvisoryProjects] = useState(
    user.internal_advisory_projects
  );
  const [reviews, setReviews] = useState(user.reviews || []);
  const [showTeams, setShowTeams] = useState(false);

  useEffect(() => {
    setRole(user.role);
    setAdvisoryProjects(user.internal_advisory_projects);
    setReviews(user.reviews || []);
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: user.id,
      role,
      advisory_project_ids: internal_advisory_projects.map(
        (project) => project.id
      ),
    });
    onClose();
  };

  const toggleProject = (project) => {
    if (internal_advisory_projects.map((p) => p.id).includes(project.id)) {
      setAdvisoryProjects(
        internal_advisory_projects.filter((t) => t.id !== project.id)
      );
    } else {
      setAdvisoryProjects([...internal_advisory_projects, project]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">{user.name}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col space-y-4"
        >
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {USER_ROLES.map((r) => (
                <option key={r} value={r}>
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Advisory Projects
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowTeams(!showTeams)}
                className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {internal_advisory_projects.length === 0 ? (
                  <span className="text-gray-400">
                    Select internal_advisory_projects...
                  </span>
                ) : (
                  <span>
                    {internal_advisory_projects
                      .map((project) => project.name)
                      .join(", ")}
                  </span>
                )}
              </button>

              {showTeams && (
                <div className="absolute w-full mt-1 bg-gray-700 rounded-lg shadow-lg z-10 max-h-60 overflow-auto">
                  {availableProjects.map((project) => (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => toggleProject(project)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-600 flex items-center justify-between"
                    >
                      <span className="text-white">{project.name}</span>
                      {internal_advisory_projects
                        .map((p) => p.id)
                        .includes(project.id) && (
                        <Check size={16} className="text-blue-400" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {internal_advisory_projects.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {internal_advisory_projects.map((project) => (
                  <span
                    key={project.id}
                    className="bg-blue-600 text-white px-2 py-1 rounded-lg text-sm flex items-center gap-1"
                  >
                    {project.name}
                    <button
                      type="button"
                      onClick={() => toggleProject(project)}
                      className="hover:text-red-300"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Reviews
            </label>
            {reviews.length > 0 ? (
              <div className="space-y-3">
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-4">No reviews yet</p>
            )}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
