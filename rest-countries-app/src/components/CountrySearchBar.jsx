// CountrySearchBar.jsx
import React from "react";
import { FiSearch } from "react-icons/fi";

export default function CountrySearchBar({ search, setSearch }) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search countries..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full px-6 py-4 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-pink-400 pr-16 text-lg"
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
        <FiSearch className="text-xl text-purple-300" />
        <span className="text-purple-300">⌘K</span>
      </div>
    </div>
  );
}
