import React, { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { TeamModal } from "./TeamModal";
import { useDispatch, useSelector } from "react-redux";
import {
  createTeam,
  deleteTeam,
  getAllTeams,
  updateTeam,
} from "../../../store/slices/teamSlice";

const ITEMS_PER_PAGE = 5;

const Team = () => {
  const dispatch = useDispatch();

  const teams = useSelector((state) => state.team.teams);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTeam, setSelectedTeam] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalPages = Math.ceil(teams.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedTeams = teams.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    dispatch(getAllTeams());
  }, [dispatch]);

  const handleSave = (teamData) => {
    if (selectedTeam) {
      dispatch(updateTeam(teamData));
    } else {
      dispatch(createTeam(teamData));
    }
  };

  const handleDelete = async (id) => {
    const result = await confirm("Are you sure you want to delete this team?");
    if (result) dispatch(deleteTeam(id));
  };

  const openModal = (team) => {
    setSelectedTeam(team);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Team Management</h1>
          <button
            onClick={() => openModal()}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus size={20} />
            New Team
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <table className="w-full text-center">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-6 py-3 text-left">No</th>
                <th className="px-6 py-3 text-left">Team Name</th>
                <th className="px-6 py-3 text-left">Manager</th>
                <th className="px-6 py-3 text-left">Members</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedTeams.map((team, index) => (
                <tr
                  key={team.id}
                  onClick={() => openModal(team)}
                  className="border-t border-gray-700 hover:bg-gray-700 cursor-pointer"
                >
                  <td className="px-6 py-4">{startIndex + index + 1}</td>
                  <td className="px-6 py-4">{team.name}</td>
                  <td className="px-6 py-4">{team.manager.name}</td>
                  <td className="px-6 py-4">
                    {team.members.map((member) => member.name).join(", ")}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(team.id);
                      }}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>

      <TeamModal
        team={selectedTeam}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTeam(null);
        }}
        onSave={handleSave}
      />
    </div>
  );
};

export default Team;
