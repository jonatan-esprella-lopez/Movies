import { useNavigate } from "react-router-dom";

import { Footer } from "@/components/footer/footer";
import { HeaderNav } from "@/components/header";

import NotFound from "@/assets/404.svg";
import "./no-found-page.css"

export function NotFoundPage() { 
  const navigate = useNavigate();

  const handleBackClick = () => navigate(-1);
  const goToHomePage = () => navigate("/");
  const goToMostValuedMovies = () => navigate("/most-valued");


  return(
    <main className="container-main">
        <HeaderNav />
        <section className="container-not-found">
            <img 
              src={NotFound} 
              alt="Página no encontrada" 
              className="image-notfound animated-bounce"/>
            <h2>Oops, No encontramos la página</h2>
            <p>Quizás quieras regresar o explorar algunos de nuestros contenidos recomendados.</p>
            <div className="quick-links">
                <button className="btn-1" onClick={handleBackClick}>
                    Regresar
                </button>
                <button className="btn-1" onClick={goToHomePage}>
                    Ir al Inicio
                </button>
                <button className="btn-1" onClick={goToMostValuedMovies}>
                    Películas Más Valoradas
                </button>
            </div>
        </section>
        <Footer/>
    </main>
  );
}
