import NotFound from "../../assets/404.svg";
import { HeaderNav } from "../../components/header";
import { useNavigate } from "react-router-dom";
import "./no-found-page.css"
import { Footer } from "../../components/footer/footer";

export function NotFoundPage(): JSX.Element { 
  const navigate = useNavigate();

  const handleBackClick = (): void => {
    navigate(-1); 
  };

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
                <button className="btn-1" onClick={() => navigate("/")}>
                    Ir al Inicio
                </button>
                <button className="btn-1" onClick={() => navigate("/most-valued")}>
                    Películas Más Valoradas
                </button>
            </div>
        </section>
        <Footer/>
    </main>
  );
}
