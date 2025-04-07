import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import profilePic from "../assets/profile.jpg";

const roles = [
  "MERN Stack Developer",
  "Web Full Stack Developer",
  "Software Developer",
];

const About = () => {
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handlePreview = (filePath) => {
    window.open(filePath, '_blank');
  };

  const handleDownload = (filePath, fileName) => {
    const link = document.createElement("a");
    link.href = filePath;
    link.download = fileName;
    link.click();
  };

  return (
    <section id="about" className="py-24 px-6 md:px-16 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* ✅ Profile Image */}
        <motion.img
          src={profilePic}
          alt="Profile"
          className="w-48 h-48 md:w-56 md:h-56 rounded-full shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        />

        {/* ✅ Text Section */}
        <div className="text-center md:text-left">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            Hi, I'm <span className="text-blue-500">Ganesh Ekhe</span>
          </motion.h2>

          {/* 🔵 Animated Role */}
          <motion.p
            className="text-lg text-gray-700 dark:text-gray-300 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            A passionate{" "}
            <motion.span
              key={currentRole}
              className="text-blue-500 font-semibold"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              {roles[currentRole]}
            </motion.span>
          </motion.p>

          {/* ✅ Professional Description */}
          <motion.p
            className="text-lg text-gray-700 dark:text-gray-300 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            With expertise in JavaScript, React.js, Node.js, Express.js, and MongoDB, I build scalable and efficient web applications.
          </motion.p>

          {/* ✅ Resume Buttons - Responsive Fix */}
          <div className="mt-6 flex flex-wrap gap-4 justify-center md:justify-start">
            <motion.button
              onClick={() => handleDownload('/Ganesh-Tukaram-Ekhe-Mern-Resume.pdf', 'Ganesh_Ekhe_Resume.pdf')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Resume
            </motion.button>

            <motion.button
              onClick={() => handlePreview('/Ganesh-Tukaram-Ekhe-Mern-Resume.pdf')}
              className="px-6 py-3 bg-orange-500 text-white rounded-lg shadow-md hover:bg-gray-700 transition w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Preview Resume
            </motion.button>
          </div>

          {/* ✅ Certificates Section */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Diploma in MERN Stack / Web Full Stack Development
            </h3>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <motion.button
                onClick={() => handlePreview('/web.pdf')}
                className="px-6 py-3 bg-emerald-700 text-white rounded-lg shadow-md hover:bg-green-700 transition w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Preview Certificate
              </motion.button>
              

              <motion.button
                onClick={() => handleDownload('/web.pdf', 'web.pdf')}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download Certificate
              </motion.button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
