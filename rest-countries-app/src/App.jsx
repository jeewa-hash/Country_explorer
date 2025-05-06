import React, { useState } from 'react'; // ✅ Import useState here
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import HomePage from './components/HomePage';
import SearchPage from './components/SearchPage';
import RegionPage from './components/RegionPage';
import { Footer } from './components/Footer';
import FavoritePage from './components/FavoritePage';
function App() {
  const [loggedIn, setLoggedIn] = useState(() => {
    return !!localStorage.getItem("user");
  });

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/region" element={<RegionPage />} />
        <Route path="/features" element={<FavoritePage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
