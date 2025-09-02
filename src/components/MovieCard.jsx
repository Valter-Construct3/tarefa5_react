import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie, onToggleFavorite, isFavorite }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "10px",
        margin: "10px",
        width: "180px",
        textAlign: "center",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        transition: "transform 0.2s, box-shadow 0.2s",
        backgroundColor: "#f9f9f9",
        cursor: "pointer"
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.3)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
      }}
    >

<img
  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
  alt={movie.title}
  style={{
    width: "100%",
    height: "270px",
    borderRadius: "10px",
    marginBottom: "10px",
    objectFit: "cover"
  }}
/>

      <h3 style={{ fontSize: "16px", margin: "5px 0" }}>
        {movie.title} ({movie.release_date?.slice(0, 4)})
      </h3>
      <div>
        <button
          onClick={() => onToggleFavorite(movie)}
          style={{
            padding: "5px 10px",
            marginBottom: "5px",
            backgroundColor: isFavorite ? "#f26b6b" : "#3498db",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          {isFavorite ? "Remover" : "Favorito"}
        </button>
        <div>
          <Link to={`/details/${movie.id}`} style={{ textDecoration: "none", color: "#2c3e50", fontWeight: "bold" }}>
            Detalhes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
