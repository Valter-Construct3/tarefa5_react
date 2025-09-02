import React from "react";
import MovieCard from "./MovieCard";

const Favorites = ({ favorites, onToggleFavorite }) => {
  if (favorites.length === 0) return <p>Nenhum favorito ainda.</p>;

  return (
    <div>
      <h2>Filmes Favoritos</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {favorites.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onToggleFavorite={onToggleFavorite}
            isFavorite={true}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
