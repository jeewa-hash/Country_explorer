// RegionFilter.jsx
import React from "react";
import { motion } from "framer-motion";

const regions = [
  { name: "Africa", emoji: "🌍", color: "from-yellow-600 to-orange-500" },
  { name: "Americas", emoji: "🌎", color: "from-green-500 to-emerald-500" },
  { name: "Asia", emoji: "🌏", color: "from-red-500 to-pink-500" },
  { name: "Europe", emoji: "🏰", color: "from-blue-500 to-purple-500" },
  { name: "Oceania", emoji: "🐠", color: "from-cyan-500 to-blue-500" },
];

export default function RegionFilter({ selectedRegion, setSelectedRegion }) {
  return (
    <motion.div 
      className="flex flex-wrap gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {regions.map(region => (
        <button
          key={region.name}
          onClick={() => setSelectedRegion(prev => 
            prev === region.name ? "" : region.name
          )}
          className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all 
            ${selectedRegion === region.name 
              ? `bg-gradient-to-r ${region.color} text-white shadow-lg`
              : "bg-white/10 hover:bg-white/20 text-purple-200"}
          `}
        >
          <span className="text-xl">{region.emoji}</span>
          {region.name}
        </button>
      ))}
    </motion.div>
  );
}
