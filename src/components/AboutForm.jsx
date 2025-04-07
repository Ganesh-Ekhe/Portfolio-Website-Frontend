import { useState } from "react";

const AboutForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [resume, setResume] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);
    if (profilePic) formData.append("profilePic", profilePic);
    if (resume) formData.append("resume", resume);

    if (typeof onSubmit === "function") {
      onSubmit(formData); // backend ला फॉर्म डेटा पाठव
    } else {
      console.error("onSubmit is not a function");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md" encType="multipart/form-data">
      <h2 className="text-xl font-bold mb-4">Update About Info</h2>

      {/* Name */}
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* Bio */}
      <div className="mb-4">
        <label className="block text-gray-700">Bio</label>
        <textarea
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          required
        />
      </div>

      {/* Profile Picture Upload */}
      <div className="mb-4">
        <label className="block text-gray-700">Profile Picture</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setProfilePic(e.target.files[0])}
        />
      </div>

      {/* Resume PDF Upload */}
      <div className="mb-4">
        <label className="block text-gray-700">Resume PDF</label>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setResume(e.target.files[0])}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save
      </button>
    </form>
  );
};

export default AboutForm;
