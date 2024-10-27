import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useMovieStore } from "../stores/movie-store";

import Logotipo from "../assets/movies/logo-blockBuster.png";
import Search from "../assets/movies/search.svg";

const NAV_LINKS = [
  { path: "/", label: "Todos" },
  { path: "/most-valued", label: "Más valoradas" },
  { path: "/less-valued", label: "Menos valoradas" },
  { path: "/cartelera", label: "Cartelera" },
];

export function HeaderNav(): JSX.Element {
  const { 
    setQuery,
  } = useMovieStore()

  const [localSearchKey, setLocalSearchKey] = useState<string>("");
  const navigate = useNavigate();

  const handleSearchSubmit = (event:any): void => {
    event.preventDefault()
      setQuery(localSearchKey)
      if(localSearchKey){
        const formattedTitle = localSearchKey.replace(/\s+/g, '_');
        navigate(`/search-movie?query=${formattedTitle}`);
      }
      setLocalSearchKey("");
  };

    return(
        <header className="nav-container-header">
        <Link to="/" className="custom-link">
          <img src={Logotipo} alt="Logotipo" className="full-logo" />
        </Link>
        <nav className="header-nav">
          {NAV_LINKS.map((link) => (
            <span key={link.path}>
              <Link to={link.path} className="custom-link">
                <p>{link.label}</p>
              </Link>
            </span>
          ))}
        </nav>
        <form className="function-header-nav" onSubmit={handleSearchSubmit}>
          <input
            type="input"
            placeholder="Busca tu película favorita"
            value={localSearchKey}
            onChange={(e) => setLocalSearchKey(e.target.value)}
          />
          <img
            src={Search}
            alt="Buscar"
            onClick={handleSearchSubmit}
            />
        </form>
      </header>
    )
}