import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        
        {/* ✅ Logo & Branding */}
        <div className="mb-6 md:mb-0">
          <h2 className="text-3xl font-extrabold tracking-wide">
            <span className="text-blue-600">Gα</span>
            <span className="text-orange-500">ηєѕн</span>
          </h2>
          <p className="text-sm text-gray-400 mt-1">MERN Stack Developer | Freelance Available</p>
        </div>

        {/* ✅ Navigation Links (React Router) */}
        <ul className="flex space-x-6 text-gray-400 text-sm">
          <li>
            <Link to="/" className="hover:text-blue-400 transition duration-300">Home</Link>
          </li>
          <li>
            <Link to="/projects" className="hover:text-blue-400 transition duration-300">Projects</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-blue-400 transition duration-300">About</Link>
          </li>
          <li>
            <Link to="/skills" className="hover:text-blue-400 transition duration-300">Skills</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-blue-400 transition duration-300">Contact</Link>
          </li>
        </ul>

        {/* ✅ Social Media Icons */}
        <div className="flex space-x-5 mt-4 md:mt-0">
          <a href="https://github.com/Ganesh-Ekhe" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300 text-xl">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/ganesh-ekhe-23b68b272" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition duration-300 text-xl">
            <FaLinkedin />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition duration-300 text-xl">
            <FaTwitter />
          </a>
          <a href="mailto:ganeshekhe99@gmail.com" className="text-gray-400 hover:text-red-500 transition duration-300 text-xl">
            <FaEnvelope />
          </a>
          <a href="https://wa.me/your-phone-number" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-500 transition duration-300 text-xl">
            <FaWhatsapp />
          </a>
        </div>
      </div>

      {/* ✅ Copyright */}
      <div className="mt-6 text-center text-gray-500 text-xs">
        © {new Date().getFullYear()} Gαηєѕн. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
