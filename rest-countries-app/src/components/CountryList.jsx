import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import CountryCard from "./CountryCard";
import AlphaNav from "./AlphaNav";

const PAGE_SIZE = 20;

export default function CountriesPage({ countries, loggedIn }) {
  // Load favorites from localStorage for the logged-in user
  const user = JSON.parse(localStorage.getItem("user"));
  const storageKey = user ? `favorites_${user.email}` : null;
  const [favorites, setFavorites] = useState(() =>
    storageKey ? JSON.parse(localStorage.getItem(storageKey) || "[]") : []
  );
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    // Keep localStorage in sync if favorites change
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(favorites));
    }
  }, [favorites, storageKey]);

  // Group by letter
  const grouped = countries.reduce((acc, country) => {
    const letter = country.name.common[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(country);
    return acc;
  }, {});

  const letters = Object.keys(grouped).sort();
  const sectionRefs = useRef({});
  const [activeLetter, setActiveLetter] = useState(letters[0] || "A");

  const handleJump = (letter) => {
    setActiveLetter(letter);
    if (sectionRefs.current[letter]) {
      sectionRefs.current[letter].scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSeeMore = () => {
    setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, countries.length));
  };

  const handleSeeLess = () => {
    setVisibleCount(PAGE_SIZE);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Toggle favorite status
  const toggleFavorite = (country) => {
    if (!loggedIn) {
      alert("Please log in to add to favorites!");
      return;
    }
    setFavorites((prevFavorites) =>
      prevFavorites.includes(country.cca3)
        ? prevFavorites.filter((id) => id !== country.cca3)
        : [...prevFavorites, country.cca3]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2a165d] via-[#1a174b] to-[#1e1c3a] p-8">
      <h1 className="text-5xl font-bold text-white text-center mb-4">
        COUNTRIES <span className="text-pink-400">EXPLORER</span>
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {letters.map(letter => {
          const countriesInLetter = grouped[letter];
          let visibleInLetter = [];
          let countSoFar = 0;
          for (let l of letters) {
            if (l === letter) {
              if (countSoFar < visibleCount) {
                visibleInLetter = countriesInLetter.slice(0, visibleCount - countSoFar);
              }
              break;
            }
            countSoFar += grouped[l].length;
          }
          if (visibleInLetter.length === 0) return null;
          return (
            <React.Fragment key={letter}>
              <div
                ref={el => (sectionRefs.current[letter] = el)}
                id={`section-${letter}`}
                className="col-span-full mt-8 mb-2"
              >
                <h2 className="text-2xl font-extrabold text-pink-400 tracking-widest">{letter}</h2>
                <div className="h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mb-4" />
              </div>
              {visibleInLetter.map(country => (
                <CountryCard
                  key={country.cca3}
                  country={country}
                  isFavorite={favorites.includes(country.cca3)}
                  onFavoriteToggle={toggleFavorite}
                  loggedIn={loggedIn}
                />
              ))}
            </React.Fragment>
          );
        })}
      </div>
      {/* Pagination */}
      <div className="mt-16 space-y-8">
        <div className="flex justify-center">
          {visibleCount < countries.length ? (
            <button
              onClick={handleSeeMore}
              className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 px-10 py-4 rounded-full text-xl font-bold text-white shadow-xl hover:scale-105 hover:shadow-pink-300/40 transition-all duration-300"
            >
              SEE MORE <FaChevronDown className="animate-bounce" />
            </button>
          ) : countries.length > PAGE_SIZE ? (
            <button
              onClick={handleSeeLess}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 px-10 py-4 rounded-full text-xl font-bold text-white shadow-xl hover:scale-105 hover:shadow-purple-300/40 transition-all duration-300"
            >
              SEE LESS <FaChevronUp className="animate-bounce" />
            </button>
          ) : null}
        </div>
      </div>
      <AlphaNav onJump={handleJump} activeLetter={activeLetter} />
    </div>
  );
}
