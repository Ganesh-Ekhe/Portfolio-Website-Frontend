import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:5100/api/projects");
      const data = await response.json();

      if (data.success && Array.isArray(data.projects)) {
        setProjects(data.projects);
      } else {
        console.error("Invalid project data:", data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen pt-12 pb-16 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <motion.h2 
  className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 tracking-wider 
             text-transparent bg-clip-text 
             bg-gradient-to-r from-blue-600 via-purple-500 to-orange-400 
             drop-shadow-xl font-poppins"
  initial={{ opacity: 0, y: -50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, type: 'spring', stiffness: 100 }}
>
   My Projects
</motion.h2>



      {loading ? (
        <p className="text-center text-gray-400 animate-pulse">Loading projects...</p>
      ) : (
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.length === 0 ? (
              <p className="text-gray-400 text-center col-span-3">No projects found.</p>
            ) : (
              projects.map((project, index) => (
                <motion.div 
                  key={project._id} 
                  className="relative bg-gray-800 bg-opacity-70 backdrop-blur-lg border border-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transform transition-all duration-500 hover:scale-105 border-gradient"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6, type: "spring", stiffness: 80 }}
                  whileHover={{ scale: 1.05, rotate: 1 }}
                >
                  {project.image ? (
                    <motion.img 
                      src={`http://localhost:5100${project.image}`} 
                      alt={project.title} 
                      className="w-full h-48 object-cover rounded-t-2xl"
                      whileHover={{ scale: 1.03 }}
                      onError={(e) => e.target.style.display = "none"}
                    />
                  ) : (
                    <div className="h-48 bg-gray-700 flex items-center justify-center text-gray-400 text-lg">
                      No Image Available
                    </div>
                  )}

                  <div className="p-6 flex flex-col justify-between h-64">
                    <h3 className="text-2xl font-semibold mb-2 text-white truncate hover:text-blue-400 transition duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-sm line-clamp-3 overflow-hidden">
                      {project.description}
                    </p>
                    <p className="text-sm font-semibold mt-3 bg-gradient-to-r from-cyan-400 to-green-400 text-transparent bg-clip-text">
                      {project.techStack}
                    </p>

                    <div className="flex justify-between mt-5">
                      <motion.a 
                        href={project.liveLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white bg-blue-500 px-4 py-2 rounded-lg shadow hover:bg-blue-400 transform transition-all duration-300 hover:scale-110"
                        whileHover={{ scale: 1.1 }}
                      >
                        Live Demo
                      </motion.a>
                      <motion.a 
                        href={project.githubLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white bg-gray-700 px-4 py-2 rounded-lg shadow hover:bg-gray-600 transform transition-all duration-300 hover:scale-110"
                        whileHover={{ scale: 1.1 }}
                      >
                        GitHub
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
