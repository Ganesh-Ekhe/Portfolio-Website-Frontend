import { useState } from "react";
import axios from "axios";

const SkillsForm = ({ fetchSkills }) => {
  const [formData, setFormData] = useState({
    name: "",
    icon: "",
    category: "",
    level: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5100/api/skills", formData);
      alert("Skill added successfully");
      setFormData({ name: "", icon: "", category: "", level: "" });
      if (fetchSkills) fetchSkills(); // Refresh skill list
    } catch (err) {
      console.error("Error adding skill", err);
      alert("Something went wrong while adding skill");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 p-6 rounded-xl shadow-md space-y-4 max-w-md mx-auto mt-10"
    >
      <h2 className="text-xl font-bold text-white mb-4">Add New Skill</h2>

      <div>
        <label className="block text-gray-300 mb-1">Skill Name</label>
        <input
          type="text"
          name="name"
          placeholder="React.js"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-gray-800 text-white"
          required
        />
      </div>

      <div>
        <label className="block text-gray-300 mb-1">Icon (React Icon name)</label>
        <input
          type="text"
          name="icon"
          placeholder="FaReact"
          value={formData.icon}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-gray-800 text-white"
          required
        />
      </div>

      <div>
        <label className="block text-gray-300 mb-1">Category</label>
        <input
          type="text"
          name="category"
          placeholder="Frontend / Backend / Tools"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-gray-800 text-white"
        />
      </div>

      <div>
        <label className="block text-gray-300 mb-1">Level (e.g., Beginner, Intermediate, Expert)</label>
        <input
          type="text"
          name="level"
          placeholder="Expert"
          value={formData.level}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-gray-800 text-white"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded"
      >
        Add Skill
      </button>
    </form>
  );
};

export default SkillsForm;
