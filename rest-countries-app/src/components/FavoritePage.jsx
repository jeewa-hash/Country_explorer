// FavoritePage.jsx
import React from "react";
import CountryCard from "./CountryCard";

export default function FavoritePage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const storageKey = user ? `favorites_${user.email}` : null;
  const favoriteIds = storageKey ? JSON.parse(localStorage.getItem(storageKey) || "[]") : [];

  const [countries, setCountries] = React.useState([]);

  React.useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then(res => res.json())
      .then(data => setCountries(data));
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#2a165d] via-[#1a174b] to-[#1e1c3a] p-8 flex flex-col items-center justify-center text-white text-center">
        <h1 className="text-4xl font-bold mb-6">Favorites</h1>
        <p className="text-lg text-purple-200 max-w-md">
          This feature is only available for logged-in users. Please <span className="text-pink-400 font-semibold">log in</span> to view and manage your favorite countries.
        </p>
      </div>
    );
  }

  const favoriteCountries = countries.filter(c => favoriteIds.includes(c.cca3));

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2a165d] via-[#1a174b] to-[#1e1c3a] p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">
        Your Favorite Countries
      </h1>
      {favoriteCountries.length === 0 ? (
        <div className="text-center text-purple-200">
          <p className="text-xl mb-4">You haven’t added any favorites yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {favoriteCountries.map(country => (
            <CountryCard
              key={country.cca3}
              country={country}
              isFavorite={true}
              onFavoriteToggle={() => {}}
              loggedIn={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}
