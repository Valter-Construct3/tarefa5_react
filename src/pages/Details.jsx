import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/tmdb"; // usa o cliente axios que já criamos

const Details = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get(`/movie/${id}`, {
          params: { append_to_response: "credits", language: "pt-BR" },
        });
        setMovie(res.data);
      } catch (err) {
        console.error("Details fetch error:", err);
        setError("Erro ao carregar detalhes do filme.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) return <p style={{ textAlign: "center" }}>Carregando...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;
  if (!movie) return null;

  const director = movie.credits?.crew?.find((c) => c.job === "Director")?.name || "—";
  const cast = (movie.credits?.cast || []).slice(0, 6).map((c) => c.name).join(", ") || "—";

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <Link to="/" style={{ textDecoration: "none", color: "#3498db" }}>
        ← Voltar
      </Link>

      <div style={{ display: "flex", gap: "20px", marginTop: "10px", alignItems: "flex-start" }}>
        <img
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : "https://via.placeholder.com/300x450?text=Sem+imagem"}
          alt={movie.title}
          style={{ borderRadius: "10px", maxWidth: "300px", width: "100%" }}
        />

        <div>
          <h1 style={{ marginTop: 0 }}>{movie.title}</h1>
          <p><strong>Data de lançamento:</strong> {movie.release_date ? new Date(movie.release_date).toLocaleDateString("pt-BR") : "—"}</p>
          <p><strong>Nota:</strong> {movie.vote_average ? `${movie.vote_average.toFixed(1)} / 10` : "—"}</p>
          <p><strong>Diretor:</strong> {director}</p>
          <p><strong>Elenco:</strong> {cast}</p>

          <h3>Sinopse</h3>
          <p style={{ color: "#555", lineHeight: 1.6 }}>{movie.overview || "Sinopse não disponível."}</p>
        </div>
      </div>
    </div>
  );
};

export default Details;
