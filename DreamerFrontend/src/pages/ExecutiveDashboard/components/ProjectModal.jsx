import React, { useState, useEffect, useMemo } from "react";
import { X, Plus, Trash2, Search } from "lucide-react";
import { useSelector } from "react-redux";

export function ProjectModal({ project, isOpen, onClose, onSave }) {
  const teams = useSelector((state) => state.team.teams);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (project) {
      setName(project.name);
      setDescription(project.description);
      setSelectedTeams(project.teams);
    } else {
      setName("");
      setDescription("");
      setSelectedTeams([]);
    }
    setSearchQuery("");
    setShowResults(false);
  }, [project]);

  const filteredTeams = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    return teams
      .filter((team) => team.name.toLowerCase().includes(query))
      .slice(0, 5); // Limit to 5 results
  }, [searchQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: project?.id,
      name,
      description,
      team_ids: selectedTeams.map((team) => team.id),
    });
    onClose();
  };

  const addTeam = (team) => {
    if (team && !selectedTeams.some((t) => t.id === team.id)) {
      setSelectedTeams([...selectedTeams, team]);
    }
    setSearchQuery("");
    setShowResults(false);
  };

  const removeTeam = (index) => {
    setSelectedTeams(selectedTeams.filter((_, i) => i !== index));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">
            {project ? "Edit Project" : "New Project"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Project Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">
              Project Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Teams</label>
            <div className="relative">
              <div className="flex items-center bg-gray-700 rounded">
                <Search size={20} className="text-gray-400 ml-2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowResults(true);
                  }}
                  onFocus={() => setShowResults(true)}
                  placeholder="Search teams..."
                  className="flex-1 bg-transparent text-white px-3 py-2 focus:outline-none"
                />
              </div>

              {showResults && filteredTeams?.length > 0 && (
                <div className="absolute w-full mt-1 bg-gray-700 rounded-lg shadow-lg z-10 max-h-60 overflow-auto">
                  {filteredTeams.map((team) => (
                    <button
                      key={team.id}
                      type="button"
                      onClick={() => addTeam(team)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-600 focus:outline-none"
                    >
                      <div className="text-white">{team.name}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2 mt-4">
              {selectedTeams.map((team, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-700 rounded px-3 py-2"
                >
                  <span className="text-white">{team.name}</span>
                  <button
                    type="button"
                    onClick={() => removeTeam(index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
