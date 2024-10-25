import { Link } from 'react-router-dom';
import './footer-style.css';

export const Footer = () => {
  return (
    <footer className="conteiner-footer">
        <section className="footer-grid">
          <article>
            <h3>Sobre Jona-BlockBuster</h3>
            <p>
              Una plataforma de peliculas donde te permitira pasar un tiempo en familia.
              Recuerda que ver peliculas piratas es lo mejor *U* ATTE: El Jona
            </p>
          </article>

          <article>
            <h3>Navegación Rapidos</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/top-rated">Butaca</Link></li>
              <li><Link to="/new-releases"></Link></li>
              <li><Link to="/genres">Genres</Link></li>
            </ul>
          </article>

          <article>
            <h3>Contactate con Jonatan</h3>
            <div className="social-icons">
              <a href="#"></a>
              <a href="#"></a>
              <a href="#"></a>
              <a href="#"></a>
            </div>
          </article>

          <article>
            <h3>Noticias y novedades</h3>
            <p>Ingresa tu Correo electronico si deseas recibir todo lo nuevo sobre tus peliculas favoritas.</p>
            <form className="newsletter-form" >
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletter-input"
              />
              <button
                type="submit"
                className="newsletter-button"
              >
              </button>
            </form>
          </article>
        </section>

        <section className="footer-bottom">
          <p>&copy; 2024 <strong>Jonatan-BlockBuster</strong>. Todos los derechos reservados.</p>
        </section>
    </footer>
  );
};