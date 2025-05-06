import React, { useRef, useState } from "react";
import CountryCard from "./CountryCard";
import AlphaNav from "./AlphaNav";

export default function CountryGrid({ countries }) {
  // Group countries by first letter
  const grouped = countries.reduce((acc, country) => {
    const letter = country.name.common[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(country);
    return acc;
  }, {});
  const letters = Object.keys(grouped).sort();

  // Refs for scrolling
  const sectionRefs = useRef({});
  const [activeLetter, setActiveLetter] = useState(letters[0] || "A");

  const handleJump = (letter) => {
    setActiveLetter(letter);
    if (sectionRefs.current[letter]) {
      sectionRefs.current[letter].scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {letters.map((letter) => (
          <React.Fragment key={letter}>
            <div
              ref={el => (sectionRefs.current[letter] = el)}
              id={`section-${letter}`}
              className="col-span-full mt-8 mb-2"
            >
              <h2 className="text-2xl font-extrabold text-pink-400 tracking-widest">{letter}</h2>
              <div className="h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mb-4" />
            </div>
            {grouped[letter].map((country) => (
              <CountryCard key={country.cca3} country={country} />
            ))}
          </React.Fragment>
        ))}
      </div>
      <AlphaNav onJump={handleJump} activeLetter={activeLetter} />
    </div>
  );
}
