import React, { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  X,
  ProjectorIcon,
} from "lucide-react";
import { truncateText } from "../../../utils/truncateTitle";
import { useDispatch, useSelector } from "react-redux";
import {
  createProject,
  deleteProject,
  getAllProjects,
  updateProject,
} from "../../../store/slices/projectSlice";
import toast from "react-hot-toast";
import { ProjectModal } from "./ProjectModal";
import { getAllTeams } from "../../../store/slices/teamSlice";

const Project = () => {
  const dispatch = useDispatch();

  const projects = useSelector((state) => state.project.projects);

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const itemsPerPage = 5;

  useEffect(() => {
    // Load projects data
    dispatch(getAllProjects());
    dispatch(getAllTeams());
  }, [dispatch]);

  useEffect(() => {
    setTotalPages(
      Math.ceil((projects && projects.length > 0 ? projects.length : 1) / 5)
    );
  }, [projects]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const paginatedProjects = projects?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSave = (projectData) => {
    if (selectedProject) {
      dispatch(updateProject(projectData));
    } else {
      dispatch(createProject(projectData));
    }
  };

  const handleDelete = async (id) => {
    const result = await confirm("Are you sure you want to delete this team?");
    if (result) dispatch(deleteProject(id));
  };

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Project Management</h1>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
          >
            <Plus size={20} />
            Add Project
          </button>
        </div>

        {/* Table */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-6 py-3 text-left">No</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Description</th>
                <th className="px-6 py-3 text-left">Team</th>
                <th className="px-6 py-3 text-left">Creator</th>
                <th className="px-6 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProjects?.map((project, index) => (
                <tr
                  key={project.id}
                  onClick={() => {
                    setSelectedProject(project);
                    setIsModalOpen(true);
                  }}
                  className="border-b border-gray-700 hover:bg-gray-700 cursor-pointer"
                >
                  <td className="px-6 py-4">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="px-6 py-4">{project.name}</td>
                  <td className="px-6 py-4">{project.description}</td>
                  <td className="px-6 py-4">
                    {project.teams?.map((team) => team.name).join(", ")}
                  </td>
                  <td className="px-6 py-4">{project.creator?.name}</td>
                  <td className="px-6 py-4 w-12">
                    <Trash2
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(project.id);
                      }}
                      size={20}
                      className="cursor-pointer w-8 h-8 p-2 rounded-lg hover:bg-black/30 text-red-500"
                    />
                  </td>
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

        {/* Add Project Modal */}
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProject(undefined);
          }}
          onSave={handleSave}
        />
      </div>
    </div>
  );
};

export default Project;
