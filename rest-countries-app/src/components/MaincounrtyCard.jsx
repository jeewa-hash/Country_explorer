import React from "react";
import CountryGrid from "./CountryGrid";

export default function CountriesPage({ countries }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2a165d] via-[#1a174b] to-[#1e1c3a] p-8">
      <h1 className="text-4xl font-bold text-white text-center mb-8">COUNTRIES EXPLORER</h1>
      <CountryGrid countries={countries} />
      <div className="text-center mt-20 mb-8">
        <h2 className="text-5xl font-bold text-white">THANK YOU</h2>
        <p className="text-purple-300 text-lg">FOR YOUR ATTENTION</p>
      </div>
    </div>
  );
}
