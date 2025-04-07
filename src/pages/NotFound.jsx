// src/pages/NotFound.jsx
import React from 'react';
import Home from './Home';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Contact from '../components/Contact';
import Login from '../components/Login';

const NotFound = () => {
  return (
    <div >
      <Home/>
      <About/>
      <Skills/>
      <Projects/>
      <Contact/>
      <Login/>
    </div>
  );
};

export default NotFound;
