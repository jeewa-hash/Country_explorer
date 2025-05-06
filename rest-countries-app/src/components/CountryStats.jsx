// CountryStats.jsx
import React from "react";
import { motion } from "framer-motion";

export default function CountryStats({ countries }) {
  if (!countries.length) return null;

  const stats = [
    {
      title: "Total Countries",
      value: countries.length,
      icon: "🌐",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Most Populous",
      value: [...countries].sort((a, b) => b.population - a.population)[0].name.common,
      icon: "👥",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Largest Area",
      value: [...countries].sort((a, b) => b.area - a.area)[0].name.common,
      icon: "📌",
      color: "from-orange-500 to-yellow-500"
    }
  ];

  return (
    <motion.div 
      className="grid md:grid-cols-3 gap-6 mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {stats.map((stat, index) => (
        <div 
          key={stat.title}
          className={`bg-gradient-to-br ${stat.color} p-6 rounded-2xl shadow-xl`}
        >
          <div className="flex items-center gap-4">
            <span className="text-4xl">{stat.icon}</span>
            <div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm opacity-80">{stat.title}</div>
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  );
}
