import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function Top20Flags() {
  const [flags, setFlags] = useState([]);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(res => res.json())
      .then(data => {
        const sorted = data
          .sort((a, b) => b.population - a.population)
          .slice(0, 5)
          .map(c => ({
            name: c.name.common,
            flag: c.flags.png,
            population: c.population.toLocaleString()
          }));
        setFlags(sorted);
      });
  }, []);

  return (
    <div className="flex flex-col items-center w-full mb-12">
      <h2 className="text-3xl font-extrabold text-white mb-8 tracking-widest drop-shadow-lg">
        TOP 05 POPULOUS COUNTRIES
      </h2>
      <div
        className="flex gap-6 overflow-x-auto px-6 pb-8 hide-scrollbar"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {flags.map((c, i) => (
          <CarouselCard key={c.name} {...c} index={i} />
        ))}
      </div>
    </div>
  );
}

function CarouselCard({ flag, name, population, index }) {
  return (
    <motion.div
      className="min-w-[240px] sm:min-w-[280px] lg:min-w-[320px] h-[360px] rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-pink-500 text-white shadow-2xl flex flex-col items-center justify-between p-6 scroll-snap-align-center transform hover:scale-105 transition-transform"
      style={{ scrollSnapAlign: 'center' }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6, type: 'spring' }}
    >
      <img
        src={flag}
        alt={name}
        className="w-32 h-20 object-contain drop-shadow-xl mt-4"
      />
      <div className="flex flex-col items-center mt-6 text-center">
        <h3 className="text-xl font-bold tracking-wide">{name}</h3>
        <p className="text-sm text-white/80 mt-1">Population: {population}</p>
      </div>
      <span className="mt-auto text-sm opacity-50">#{index + 1}</span>
    </motion.div>
  );
}
