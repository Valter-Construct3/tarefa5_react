import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "10px 20px",
      backgroundColor: "#222",
      color: "#fff"
    }}>
      <h2>TMDB React</h2>
      <div>
        <Link to="/" style={{ color: "#fff", marginRight: "10px" }}>Início</Link>
        <Link to="/favorites" style={{ color: "#fff" }}>Favoritos</Link>
      </div>
    </nav>
  );
};

export default Navbar;
