import { motion } from "framer-motion";



const Home = () => {
  return (
    <div 
  className="h-screen flex items-center justify-center bg-cover bg-center relative" 
  style={{ backgroundImage: `url('/photo1.avif')` }}
>

      {/* ✅ Dark Overlay for Better Text Visibility */}
      <div className="absolute inset-0 "></div>

     
    </div>
  );
};

export default Home;
