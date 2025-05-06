import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import Top10Flags from './TopCounty';
import earthImage from '../assets/earth.png';
// Optional: Import particles if you want that effect
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useCallback } from 'react';

export default function HomePage() {
  const containerRef = useRef(null);
  const [isBuffering, setIsBuffering] = useState(true);
  const spinnerAnimation = useAnimation();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.2]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  
  // Start the buffering animation loop
  useEffect(() => {
    if (isBuffering) {
      // Create a continuous rotation animation
      spinnerAnimation.start({
        rotate: 360,
        transition: { 
          duration: 1.5, 
          ease: "linear", 
          loop: Infinity 
        }
      });
      
      // Simulate loading completion after 4 seconds
      const timer = setTimeout(() => {
        setIsBuffering(false);
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [isBuffering, spinnerAnimation]);
  
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, type: "spring" }
    })
  };

  const cardVariants = {
    offscreen: { y: 100, opacity: 0 },
    onscreen: (i = 1) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        delay: i * 0.1,
        duration: 0.8
      }
    })
  };

  // Optional: Particle initialization if you're using react-tsparticles
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
   }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative min-h-screen bg-gradient-to-b from-[#2a165d] via-[#1a174b] to-[#1e1c3a] flex flex-col overflow-hidden"
    >
      {/* Scroll Progress Indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-purple-500 z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      />
      
      {/* Background Decorations */}
      {/* Main glow */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <div className="w-[800px] h-[800px] rounded-full bg-blue-500/20 opacity-30 blur-[100px]" />
      </div>
      
      {/* Additional glows */}
      <div className="pointer-events-none absolute top-1/3 left-1/4 z-0">
        <div className="w-[300px] h-[300px] rounded-full bg-purple-500/30 opacity-20 blur-[80px]" />
      </div>
      <div className="pointer-events-none absolute bottom-1/4 right-1/3 z-0">
        <div className="w-[250px] h-[250px] rounded-full bg-pink-500/30 opacity-20 blur-[60px]" />
      </div>
      
      {/* Floating elements */}
      <motion.div 
        className="absolute top-[15%] right-[10%] w-6 h-6 rounded-full bg-pink-400/50"
        animate={{
          y: [0, -20, 0],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-[20%] left-[15%] w-4 h-4 rounded-full bg-blue-400/50"
        animate={{
          y: [0, 20, 0],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute top-[40%] left-[5%] w-8 h-8 rounded-full bg-purple-300/40"
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0],
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Optional: Particle Background */}
       <Particles
        className="absolute inset-0 z-0"
        init={particlesInit}
        options={{
          background: { color: { value: "transparent" } },
          fullScreen: { enable: false },
          particles: {
            color: { value: "#ffffff" },
            number: { value: 40, density: { enable: true, area: 800 } },
            opacity: { value: 0.2 },
            size: { value: 1.5 },
            move: { enable: true, speed: 0.4 },
          },
        }}
      /> 
      
      {/* Hero Section with scroll-linked animations */}
      <section className="relative z-10 container mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12">
        <motion.div
          className="flex-1"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{ opacity }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg">
            Explore Countries <span className="text-pink-400">Worldwide</span>
          </h1>
          <p className="text-xl text-purple-200 mb-8 max-w-xl">
            Search, filter, and discover detailed information about every country using the free REST Countries API. Fast, beautiful, and interactive!
          </p>
          <Link to="/search">
            <motion.button
              whileHover={{ scale: 1.08 }}
              className="bg-gradient-to-r from-pink-500 to-purple-500 px-10 py-4 rounded-full text-xl font-semibold text-white shadow-2xl hover:shadow-pink-300/30 transition"
            >
              Start Exploring
            </motion.button>
          </Link>
        </motion.div>

        {/* Earth Image with Buffering Animation */}
        <motion.div
          className="flex-1 flex items-center justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{ scale }}
          custom={2}
        >
          <div className="relative w-80 h-80 bg-gradient-to-br from-purple-500/80 to-blue-500/80 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/10 backdrop-blur-lg overflow-hidden">
            {/* Blue Glow behind Earth */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 rounded-full bg-blue-500/30 blur-md" />
            </div>
            
            {/* Earth Image */}
            <motion.img 
              src={earthImage} 
              alt="Earth" 
              className="w-64 h-64 object-cover rounded-full relative z-10"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: isBuffering ? 0.7 : 1,
                scale: isBuffering ? 0.95 : 1,
                rotate: isBuffering ? 0 : 360
              }}
              transition={{ 
                opacity: { duration: 0.5 },
                scale: { duration: 0.5 },
                rotate: { duration: 60, ease: "linear", repeat: Infinity }
              }}
            />
            
            {/* Buffering Spinner */}
            {isBuffering && (
              <>
                {/* Outer spinner */}
                <motion.div 
                  className="absolute inset-0 w-full h-full border-4 border-transparent border-t-white/30 border-r-white/30 rounded-full"
                  animate={spinnerAnimation}
                />
                
                {/* Inner spinner */}
                <motion.div 
                  className="absolute inset-4 w-[calc(100%-32px)] h-[calc(100%-32px)] border-4 border-transparent border-t-pink-400/60 border-l-pink-400/60 rounded-full"
                  animate={{
                    rotate: -360,
                    transition: { duration: 2, ease: "linear", loop: Infinity }
                  }}
                />
                
                {/* Loading Text */}
                <div className="absolute bottom-6 text-white font-medium tracking-wider text-sm">
                  LOADING...
                </div>
              </>
            )}
            
            {/* Decorative dots (still visible after loading) */}
            <span className="absolute top-8 left-20 w-4 h-4 bg-pink-400 rounded-full opacity-70 animate-pulse"></span>
            <span className="absolute bottom-10 right-14 w-3 h-3 bg-blue-400 rounded-full opacity-60 animate-pulse"></span>
            <span className="absolute top-24 right-8 w-2 h-2 bg-purple-300 rounded-full opacity-80 animate-pulse"></span>
          </div>
        </motion.div>
      </section>
      
      {/* Popular This Week Section */}
      <section className="relative z-10 py-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl font-bold text-white tracking-wider">
            Popular this week
          </h2>
        </motion.div>
        
        {/* Background glow for flags section */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
          <div className="w-[700px] h-[300px] rounded-full bg-blue-600/20 opacity-30 blur-[70px]" />
        </div>
        
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, margin: "-100px" }}
          className="relative z-10"
        >
          <Top10Flags />
        </motion.div>
      </section>
      
      {/* Features Section */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <motion.h2 
          className="text-3xl font-bold text-white text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Explore Features
        </motion.h2>
        
        {/* Background glow for features section */}
        <div className="pointer-events-none absolute top-1/2 right-1/4 z-0">
          <div className="w-[400px] h-[400px] rounded-full bg-purple-600/20 opacity-20 blur-[90px]" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Search Countries", icon: "🔍", color: "from-purple-600 to-blue-500" },
            { title: "Filter by Region", icon: "🌎", color: "from-pink-600 to-purple-500" },
            { title: "Detailed Information", icon: "📊", color: "from-blue-500 to-teal-400" }
          ].map((card, i) => (
            <motion.div
              key={i}
              className={`bg-gradient-to-br ${card.color} p-8 rounded-2xl shadow-xl border border-white/10 backdrop-blur-sm`}
              variants={cardVariants}
              custom={i}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: false, amount: 0.3 }}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
              <p className="text-white/80">
                Discover everything you need to know about countries around the world.
              </p>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Footer Glow */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-40 z-0">
        <div className="w-full h-full bg-gradient-to-t from-purple-900/30 to-transparent" />
      </div>
    </div>
  );
}
