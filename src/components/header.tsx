import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HeaderNavProps } from "../interfaces/interfaces";
import Logotipo from "../assets/movies/logo-blockBuster.png";
import Search from "../assets/movies/search.svg";



export function HeaderNav({ updateQuery }: HeaderNavProps) {
  const [localSearchKey, setLocalSearchKey] = useState<string>("");
  const navigate = useNavigate();

  const handleSearchSubmit = (event:any) => {
    event.preventDefault()
    updateQuery(localSearchKey)
    navigate( `/search-movie?=${localSearchKey}`)
    setLocalSearchKey("")
  };

    return(
        <header className="nav-container-header">
        <Link to="/" className="custom-link">
          <img src={Logotipo} alt="Logotipo" className="full-logo" />
        </Link>
        <nav className="header-nav">
          <span>
            <Link to="" className="custom-link">
              <p>Todos</p>
            </Link>
          </span>
          <span>
            <Link to="most-valued" className="custom-link">
              <p>Más valoradas</p>  
            </Link>
          </span>
          <span>
            <Link to="less-valued" className="custom-link">
              <p>Menos valoradas</p>
            </Link>
          </span >
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