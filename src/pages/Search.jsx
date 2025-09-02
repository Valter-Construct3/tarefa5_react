import React, { useState, useEffect } from "react";
import api from "../api/tmdb";
import MovieCard from "../components/MovieCard";
import Favorites from "../components/Favorites";

const Search = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1)
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  const fetchMoviesFromApi = async (p = page, q = query) => {
    setLoading(true);
    setError("");
    try {
      const res = q
        ? await api.get("/search/movie", { params: { query: q, page: p } })
        : await api.get("/movie/popular", { params: { page: p } });
      setMovies(res.data.results || []);
      setTotalPages(res.data.total_pages);
    } catch (err) {
      console.error(err);
      setError("Erro ao buscar filmes");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoviesFromApi(page, query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, query]);

  const handleToggleFavorite = (movie) => {
    const exists = favorites.find((f) => f.id === movie.id);
    const updated = exists
      ? favorites.filter((f) => f.id !== movie.id)
      : [...favorites, movie];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    // o useEffect vai realizar a busca com (page=1, query)
  };

  return (
    <div style={{ padding: "20px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      {/* Header estilizado */}
      <div style={{
        backgroundColor: "#222",
        color: "#fff",
        padding: "20px",
        textAlign: "center",
        borderRadius: "0 0 10px 10px",
        marginBottom: "20px"
      }}>
        <h1 style={{ margin: 0, fontSize: "28px" }}>Busca de Filmes</h1>
      </div>

      {/* Formulário de busca estilizado*/}
      <form onSubmit={handleSearch} style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Digite o nome do filme"
          style={{
            padding: "10px",
            width: "320px",
            borderRadius: "5px 0 0 5px",
            border: "1px solid #ccc",
            fontSize: "16px"
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 15px",
            borderRadius: "0 5px 5px 0",
            border: "none",
            backgroundColor: "#3498db",
            color: "#fff",
            fontSize: "16px",
            cursor: "pointer"
          }}
        >
          Pesquisar
        </button>
      </form>

      {loading && <p style={{ textAlign: "center" }}>Carregando...</p>}
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}

      {/* Grid de filmes */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: "16px",
        alignItems: "start",
        marginBottom: "20px"
      }}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onToggleFavorite={handleToggleFavorite}
            isFavorite={!!favorites.find((f) => f.id === movie.id)}
          />
        ))}
      </div>

      {movies.length > 0 && (


        <div style={{ display: "flex", justifyContent: "center", gap: "10px", alignItems: "center", marginBottom: "20px" }}>
  <button
    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
    disabled={page === 1}
    style={{
      padding: "8px 12px",
      backgroundColor: page === 1 ? "#f16969" : "#3498db",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: page === 1 ? "not-allowed" : "pointer"
    }}
  >
    Anterior
  </button>

  <span> Página {page} </span>

  <button
    onClick={() => setPage(prev => (prev < totalPages ? prev + 1 : prev))}
    disabled={page >= totalPages}
    style={{
      padding: "8px 12px",
      backgroundColor: page >= totalPages ? "#cccccc" : "#3498db",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: page >= totalPages ? "not-allowed" : "pointer"
    }}
  >
    Próxima
  </button>
</div>

      )}


      

      <Favorites favorites={favorites} onToggleFavorite={handleToggleFavorite} />
    </div>
  );
};

export default Search;
