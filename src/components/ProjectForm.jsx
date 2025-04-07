import { useState, useEffect } from "react";

const API_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_DEV_API_URL
    : import.meta.env.VITE_API_URL;

const ProjectForm = ({ fetchProjects, editingProject, setEditingProject }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  // Pre-fill form when editing
  useEffect(() => {
    if (editingProject) {
      setTitle(editingProject.title || "");
      setDescription(editingProject.description || "");
      setTechStack(editingProject.techStack || "");
      setLiveLink(editingProject.liveLink || "");
      setGithubLink(editingProject.githubLink || "");
      setPreview(editingProject.image || "");
      setImage(null);
    }
  }, [editingProject]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = editingProject?.image || "";

    if (image) {
      const formData = new FormData();
      formData.append("image", image);

      try {
        const res = await fetch(`${API_URL}/api/upload`, {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (!data.success) throw new Error("Image upload failed");
        imageUrl = data.imageUrl;
      } catch (error) {
        console.error("Image Upload Error:", error);
        return;
      }
    }

    const payload = {
      title,
      description,
      techStack,
      image: imageUrl,
      liveLink,
      githubLink,
    };

    try {
      const url = editingProject
        ? `${API_URL}/api/projects/${editingProject._id}`
        : `${API_URL}/api/projects`;

      const method = editingProject ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!result.success) throw new Error("Failed to save project");

      fetchProjects(); // Refresh list
      setEditingProject(null); // Reset edit mode
      setTitle("");
      setDescription("");
      setTechStack("");
      setLiveLink("");
      setGithubLink("");
      setImage(null);
      setPreview("");
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {editingProject ? "Edit Project" : "Add Project"}
      </h2>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Project Title"
        required
        className="w-full p-2 border rounded"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Project Description"
        required
        className="w-full p-2 border rounded mt-2"
      />
      <input
        type="text"
        value={techStack}
        onChange={(e) => setTechStack(e.target.value)}
        placeholder="Tech Stack (e.g. React, Node)"
        required
        className="w-full p-2 border rounded mt-2"
      />
      <input
        type="text"
        value={liveLink}
        onChange={(e) => setLiveLink(e.target.value)}
        placeholder="Live Demo Link"
        className="w-full p-2 border rounded mt-2"
      />
      <input
        type="text"
        value={githubLink}
        onChange={(e) => setGithubLink(e.target.value)}
        placeholder="GitHub Link"
        className="w-full p-2 border rounded mt-2"
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="w-full p-2 border rounded mt-2"
      />
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-full h-32 object-cover rounded mt-2"
        />
      )}

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mt-4"
      >
        {editingProject ? "Update Project" : "Save Project"}
      </button>
    </form>
  );
};

export default ProjectForm;
