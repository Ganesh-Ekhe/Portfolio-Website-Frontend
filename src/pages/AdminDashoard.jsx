import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaTrash, FaEdit } from "react-icons/fa";
import ProjectForm from "../components/ProjectForm";
import AboutForm from "../components/AboutForm";
import SkillsForm from "../components/SkillsForm";

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [abouts, setAbouts] = useState([]);
  const [skills, setSkills] = useState([]);
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    fetchProjects();
    fetchUsers();
    fetchAbouts();
    fetchSkills();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:5100/api/projects");
      const data = await response.json();
      setProjects(Array.isArray(data.projects) ? data.projects : []);
    } catch (error) {
      console.error("Error fetching projects:", error.message);
      setProjects([]);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5100/api/users");
      const data = await response.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching users:", error.message);
      setUsers([]);
    }
  };

  const fetchAbouts = async () => {
    try {
      const response = await fetch("http://localhost:5100/api/about");
      const data = await response.json();
      setAbouts(Array.isArray(data.about) ? data.about : []);
    } catch (error) {
      console.error("Error fetching about:", error.message);
      setAbouts([]);
    }
  };

  const fetchSkills = async () => {
    try {
      const response = await fetch("http://localhost:5100/api/skills");
      const data = await response.json();
      setSkills(Array.isArray(data.skills) ? data.skills : []);
    } catch (error) {
      console.error("Error fetching skills:", error.message);
      setSkills([]);
    }
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const res = await fetch(`http://localhost:5100/api/projects/${id}`, {
        method: "DELETE",
      });
      if (res.ok) setProjects(projects.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete project error:", err.message);
    }
  };

  const deleteAbout = async (id) => {
    if (!window.confirm("Delete about section?")) return;
    try {
      const res = await fetch(`http://localhost:5100/api/about/${id}`, {
        method: "DELETE",
      });
      if (res.ok) setAbouts(abouts.filter((a) => a._id !== id));
    } catch (err) {
      console.error("Delete about error:", err.message);
    }
  };

  const deleteSkill = async (id) => {
    if (!window.confirm("Delete skill?")) return;
    try {
      const res = await fetch(`http://localhost:5100/api/skills/${id}`, {
        method: "DELETE",
      });
      if (res.ok) setSkills(skills.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Delete skill error:", err.message);
    }
  };

  const addOrUpdateAbout = async (formData) => {
    try {
      const response = await fetch("http://localhost:5100/api/about", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        fetchAbouts();
      } else {
        console.error("Failed to submit about data");
      }
    } catch (error) {
      console.error("Error submitting about data:", error.message);
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
                  src={`http://localhost:5100${project.image}`}
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

      {/* About Form & List */}
      <section className="mt-10">
        <AboutForm onSubmit={addOrUpdateAbout} fetchAbouts={fetchAbouts} />
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-6">
          About Info
        </h3>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          {abouts.map((about) => (
            <motion.div
              key={about._id}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg"
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={`http://localhost:5100${about.image}`}
                alt="About"
                className="h-40 w-full object-cover rounded-md mb-2"
              />
              <h4 className="text-xl font-bold">{about.name}</h4>
              <p>{about.description}</p>
              {about.resume && (
                <a
                  href={`http://localhost:5100${about.resume}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 block mt-2"
                >
                  View Resume
                </a>
              )}
              <button
                className="text-red-500 mt-2"
                onClick={() => deleteAbout(about._id)}
              >
                <FaTrash />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skills Form & List */}
      <section className="mt-10">
        <SkillsForm fetchSkills={fetchSkills} />
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-6">
          Skills
        </h3>
        <div className="grid md:grid-cols-4 gap-4 mt-4">
          {skills.map((skill) => (
            <motion.div
              key={skill._id}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg"
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={`http://localhost:5100${skill.image}`}
                alt="Skill"
                className="h-16 w-16 object-cover rounded-full mx-auto mb-2"
              />
              <h4 className="text-center font-bold">{skill.name}</h4>
              <button
                className="text-red-500 block mx-auto mt-2"
                onClick={() => deleteSkill(skill._id)}
              >
                <FaTrash />
              </button>
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
