import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Contact from "./components/Contact";
import Login from "./components/Login";
import AdminDashboard from "./pages/AdminDashoard";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";




const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="pt-16">
        <Routes> {/* Changed from Switch to Routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} /> {/* 404 NotFound route */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
