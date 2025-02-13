import React, { useState, useEffect, useMemo } from "react";
import { X, Plus, Trash2, Search } from "lucide-react";
import { useSelector } from "react-redux";

export function TeamModal({ team, isOpen, onClose, onSave }) {
  const users = useSelector((state) => state.user.users);

  const AVAILABLE_MEMBERS = users.filter((user) => user.team === null);
  const [name, setName] = useState("");
  const [manager, setManager] = useState(null);
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [managerSearchQuery, setManagerSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [showManagerResults, setShowManagerResults] = useState(false);

  useEffect(() => {
    if (team) {
      setName(team.name);
      setMembers(team.members);
      setManager(team.manager);
    } else {
      setName("");
      setMembers([]);
      setManager(null);
    }
    setSearchQuery("");
    setShowResults(false);
  }, [team]);

  const filteredManagerCandidates = useMemo(() => {
    if (!managerSearchQuery.trim()) return [];

    const query = managerSearchQuery.toLowerCase();
    return AVAILABLE_MEMBERS.filter((member) => member.role === "manager")
      .filter(
        (member) =>
          member.name.toLowerCase().includes(query) ||
          member.role.toLowerCase().includes(query) ||
          member.email.toLowerCase().includes(query)
      )
      .slice(0, 5); // Limit to 5 results
  }, [managerSearchQuery]);

  const filteredMembers = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    return AVAILABLE_MEMBERS.filter((member) => member.role === "user")
      .filter(
        (member) =>
          member.name.toLowerCase().includes(query) ||
          member.role.toLowerCase().includes(query) ||
          member.email.toLowerCase().includes(query)
      )
      .slice(0, 5); // Limit to 5 results
  }, [searchQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: team?.id,
      name,
      member_ids: members.map((member) => member.id),
      manager_id: manager.id,
    });
    onClose();
  };

  const addMember = (memberID) => {
    const member = users.find((user) => user.id === memberID);
    if (member && !members.some((m) => m.id === memberID)) {
      setMembers([...members, member]);
    }
    setSearchQuery("");
    setShowResults(false);
  };

  const removeMember = (index) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">
            {team ? "Edit Team" : "New Team"}
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
            <label className="block text-gray-300 mb-2">Team Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Team Manager</label>
          </div>
          <div className="relative">
            {manager ? (
              <div className="flex items-center justify-between bg-gray-700 rounded px-3 py-2">
                <span className="text-white">{manager.name}</span>
                <button
                  type="button"
                  onClick={() => setManager(null)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center bg-gray-700 rounded">
                  <Search size={20} className="text-gray-400 ml-2" />
                  <input
                    type="text"
                    value={managerSearchQuery}
                    onChange={(e) => {
                      setManagerSearchQuery(e.target.value);
                      setShowManagerResults(true);
                    }}
                    onFocus={() => setShowManagerResults(true)}
                    placeholder="Search for manager..."
                    className="flex-1 bg-transparent text-white px-3 py-2 focus:outline-none"
                  />
                </div>

                {showManagerResults && filteredManagerCandidates.length > 0 && (
                  <div className="absolute w-full mt-1 bg-gray-700 rounded-lg shadow-lg z-10 max-h-60 overflow-auto">
                    {filteredManagerCandidates.map((member) => (
                      <button
                        key={member.id}
                        type="button"
                        onClick={() => setManager(member)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-600 focus:outline-none"
                      >
                        <div className="text-white">{member.name}</div>
                        <div className="text-gray-400 text-sm">
                          {member.role} • {member.email}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Members</label>
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
                  placeholder="Search members..."
                  className="flex-1 bg-transparent text-white px-3 py-2 focus:outline-none"
                />
              </div>

              {showResults && filteredMembers?.length > 0 && (
                <div className="absolute w-full mt-1 bg-gray-700 rounded-lg shadow-lg z-10 max-h-60 overflow-auto">
                  {filteredMembers.map((member) => (
                    <button
                      key={member.id}
                      type="button"
                      onClick={() => addMember(member.id)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-600 focus:outline-none"
                    >
                      <div className="text-white">{member.name}</div>
                      <div className="text-gray-400 text-sm">
                        {member.email} • {member.role}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2 mt-4">
              {members.map((member, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-700 rounded px-3 py-2"
                >
                  <span className="text-white">{member.name}</span>
                  <button
                    type="button"
                    onClick={() => removeMember(index)}
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
