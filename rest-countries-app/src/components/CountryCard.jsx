import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaRegStar } from "react-icons/fa";

export default function CountryCard({ country, loggedIn, onFavoriteToggle, isFavorite }) {
  const [showModal, setShowModal] = useState(false);
  const [fullDetails, setFullDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch full details when modal opens
  useEffect(() => {
    if (showModal) {
      setLoading(true);
      fetch(`https://restcountries.com/v3.1/alpha/${country.cca3}`)
        .then(res => res.json())
        .then(data => {
          // API returns an array
          setFullDetails(Array.isArray(data) ? data[0] : data);
        })
        .catch(() => setFullDetails(null))
        .finally(() => setLoading(false));
    }
  }, [showModal, country.cca3]);

  // Use fullDetails if available, else fallback to prop
  const details = fullDetails || country;

  return (
    <>
      <motion.div
        className="relative cursor-pointer rounded-xl overflow-hidden shadow-lg group h-40 w-40 mx-auto"
        style={{
          minWidth: "160px",
          minHeight: "160px",
          background: `linear-gradient(135deg, #2a165d 60%, #1a174b 100%)`,
        }}
        whileHover={{ scale: 1.06, boxShadow: "0 4px 32px #f472b6aa" }}
        onClick={() => setShowModal(true)}
      >
        {/* Flag as background */}
        <img
          src={country.flags.png}
          alt={country.name.common}
          className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-95 transition"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-purple-900/40 to-transparent" />
        
        {/* Country Name */}
        <div className="absolute bottom-4 left-0 w-full text-center z-10">
          <span className="text-white text-lg font-extrabold tracking-wide drop-shadow-lg uppercase">
            {country.name.common}
          </span>
        </div>

        {/* Favorite Icon */}
        {loggedIn && (
          <button
            className="absolute top-3 left-3 z-10 text-yellow-400 bg-black/40 rounded-full p-1 hover:text-yellow-300 transition"
            onClick={(e) => {
              e.stopPropagation();
              onFavoriteToggle(country);
            }}
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? <FaStar size={22} /> : <FaRegStar size={22} />}
          </button>
        )}

        {/* Decorative neon dot */}
        <div className="absolute top-3 right-3 w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
      </motion.div>

      {/* Modal for details */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            data-testid="country-modal"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="relative bg-gradient-to-br from-[#2a165d] to-[#1a174b] rounded-2xl p-8 max-w-md w-full text-white shadow-2xl"
              initial={{ scale: 0.9, y: 60 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 60 }}
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute top-5 right-5 text-xl bg-purple-900/80 w-8 h-8 rounded-full flex items-center justify-center hover:bg-pink-500 transition"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                ×
              </button>
              <div className="flex flex-col items-center">
                <img
                  src={details.flags?.png}
                  alt={details.name?.common}
                  className="w-24 h-16 object-cover rounded shadow mb-4"
                />
                <h2 className="text-3xl font-bold mb-2">{details.name?.common}</h2>
                <div className="text-pink-300 font-semibold mb-4">{details.region}</div>
                {loading ? (
                  <div className="text-center text-pink-400 py-8">Loading details...</div>
                ) : (
                  <div className="w-full text-left space-y-2 text-base">
                    <p>
                      <span className="font-bold text-purple-300">Official Name:</span>{" "}
                      {details.name?.official || "N/A"}
                    </p>
                    <p>
                      <span className="font-bold text-purple-300">Capital:</span>{" "}
                      {details.capital?.[0] || "N/A"}
                    </p>
                    <p>
                      <span className="font-bold text-purple-300">Population:</span>{" "}
                      {details.population?.toLocaleString() || "N/A"}
                    </p>
                    <p>
                      <span className="font-bold text-purple-300">Area:</span>{" "}
                      {details.area?.toLocaleString() || "N/A"} km²
                    </p>
                    <p>
                      <span className="font-bold text-purple-300">Languages:</span>{" "}
                      {details.languages ? Object.values(details.languages).join(", ") : "N/A"}
                    </p>
                    <p>
                      <span className="font-bold text-purple-300">Borders:</span>{" "}
                      {details.borders ? details.borders.join(", ") : "None"}
                    </p>
                    <p>
                      <span className="font-bold text-purple-300">Timezones:</span>{" "}
                      {details.timezones ? details.timezones.join(", ") : "N/A"}
                    </p>
                    <p>
                      <span className="font-bold text-purple-300">Continents:</span>{" "}
                      {details.continents ? details.continents.join(", ") : "N/A"}
                    </p>
                  </div>
                )}
                <a
                  href={details.maps?.googleMaps}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-block bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-2 rounded-full font-bold text-white shadow hover:scale-105 transition"
                >
                  View on Map
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
