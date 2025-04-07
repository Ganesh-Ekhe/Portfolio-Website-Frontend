import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaTrash, FaEdit } from "react-icons/fa";
import ProjectForm from "../components/ProjectForm";

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingProject, setEditingProject] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchProjects();
    fetchUsers();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${API_URL}/api/projects`);
      const data = await response.json();
      setProjects(Array.isArray(data.projects) ? data.projects : []);
    } catch (error) {
      console.error("Error fetching projects:", error.message);
      setProjects([]);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/api/users`);
      const data = await response.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching users:", error.message);
      setUsers([]);
    }
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const res = await fetch(`${API_URL}/api/projects/${id}`, {
        method: "DELETE",
      });
      if (res.ok) setProjects(projects.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete project error:", err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
        Admin Dashboard
      </h2>

      <ProjectForm
        fetchProjects={fetchProjects}
        editingProject={editingProject}
        setEditingProject={setEditingProject}
      />

      {/* Project Section */}
      <section className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Manage Projects
        </h3>
        <div className="grid md:grid-cols-3 gap-6 mt-4">
          {projects.map((project) => (
            <motion.div
              key={project._id}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              {project.image && (
                <img
                  src={`${API_URL}${project.image}`}
                  alt={project.title}
                  className="w-full h-40 object-cover rounded-lg"
                />
              )}
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mt-2">
                {project.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                {project.description}
              </p>
              <div className="flex justify-between mt-4">
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  Live Demo
                </a>
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500"
                >
                  GitHub
                </a>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  className="text-red-500"
                  onClick={() => deleteProject(project._id)}
                >
                  <FaTrash />
                </button>
                <button
                  className="text-yellow-500"
                  onClick={() => setEditingProject(project)}
                >
                  <FaEdit />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Users Section */}
      <section className="mt-10">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Registered Users
        </h3>
        <div className="mt-4 space-y-4">
          {users.map((user) => (
            <motion.div
              key={user._id}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
              whileHover={{ scale: 1.02 }}
            >
              <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                {user.name}
              </h4>
              <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
