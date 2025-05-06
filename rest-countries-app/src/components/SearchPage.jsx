import React, { useEffect, useState } from "react";
import CountryStats from "./CountryStats";
import CountrySearchBar from "./CountrySearchBar";
import RegionFilter from "./RegionPage";
import CountriesPage from "./CountryList";

export default function SearchPage() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("user")
  );

  // Fetch by region or all on mount/region change
  useEffect(() => {
    if (!search) {
      setIsLoading(true);
      const url = selectedRegion
        ? `https://restcountries.com/v3.1/region/${selectedRegion}`
        : "https://restcountries.com/v3.1/all";
      fetch(url)
        .then(res => res.json())
        .then(data => {
          setCountries(data.sort((a, b) => a.name.common.localeCompare(b.name.common)));
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    }
  }, [selectedRegion, search]);

  // Fetch by name when searching
  useEffect(() => {
    if (search) {
      setIsLoading(true);
      fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(search)}`)
        .then(res => res.ok ? res.json() : [])
        .then(data => {
          setCountries(Array.isArray(data) ? data : []);
          setIsLoading(false);
        })
        .catch(() => {
          setCountries([]);
          setIsLoading(false);
        });
    }
  }, [search]);

  // Define filtered countries based on search and selectedRegion
  const filtered = countries.filter(c => {
    const matchesSearch = c.name.common.toLowerCase().includes(search.toLowerCase());
    const matchesRegion = !selectedRegion || c.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a083d] via-[#1e0b4d] to-[#2a165d] text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          World Explorer
        </h2>
        <CountryStats countries={countries} />
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            <CountrySearchBar search={search} setSearch={setSearch} />
            <RegionFilter selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} />
          </div>
          {isLoading && (
            <div className="col-span-full text-center text-pink-400">
              Loading countries...
            </div>
          )}
          
        </div>
        <CountriesPage countries={filtered} loggedIn={loggedIn} />
      </div>
    </div>
  );
}
