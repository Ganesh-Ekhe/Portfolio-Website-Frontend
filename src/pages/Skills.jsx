import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaGitAlt } from "react-icons/fa";
import { SiMongodb, SiExpress, SiTailwindcss, SiBootstrap } from "react-icons/si";

const skills = [
  { name: "React.js", icon: <FaReact className="text-blue-400" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
  { name: "MongoDB", icon: <SiMongodb className="text-green-400" /> },
  { name: "Express.js", icon: <SiExpress className="text-gray-400" /> },
  { name: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
  { name: "HTML5", icon: <FaHtml5 className="text-orange-500" /> },
  { name: "CSS3", icon: <FaCss3Alt className="text-blue-500" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="text-teal-400" /> },
  { name: "Bootstrap", icon: <SiBootstrap className="text-purple-600" /> },
  { name: "Git", icon: <FaGitAlt className="text-red-500" /> },
];

const Skills = () => {
  return (
    <section className="min-h-screen pt-28 pb-16 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
      {/* Section Title */}
      <motion.h2 
        className="text-4xl font-extrabold text-center mb-12 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-yellow-500"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        My Skills
      </motion.h2>

      {/* Skills Grid */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10">
          {skills.map((skill, index) => (
            <motion.div 
              key={index}
              className="flex flex-col items-center justify-center p-6 bg-gray-900 bg-opacity-80 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-lg shadow-blue-500/20 hover:shadow-2xl transform transition-all duration-500 hover:scale-105"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <div className="text-5xl mb-3">{skill.icon}</div>
              <h3 className="text-lg font-mono font-semibold text-gray-200">{skill.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;