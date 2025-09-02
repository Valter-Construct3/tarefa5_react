import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, []);

  const handleToggleFavorite = (movie) => {
    const updated = favorites.filter(f => f.id !== movie.id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Meus Favoritos</h1>
      {favorites.length === 0 && <p>Nenhum favorito ainda.</p>}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {favorites.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onToggleFavorite={handleToggleFavorite}
            isFavorite={true}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
