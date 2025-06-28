import { Link } from 'react-router-dom';

import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from '@/assets/icon/social-page/index';

import './footer.css';

export const Footer = () => {
  return (
    <footer className="conteiner-footer">
      <section className="footer-grid">
        <article className='footer'>
          <h3>Sobre Blockbuster</h3>
          <p>
            Una plataforma para poder ver los ultimos Trailers y támbien podras ver mucho mas de 
            tus peliculas favoritas, tiene una sacción de cartelera la simulacion para poder adquirir
            una butaca de tus peliculas favoritas.
          </p>
        </article>

        <article className='footer'>
          <h3>Navegación Rápida</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/cartelera">Cartelera</Link></li>
            <li><Link to="/new-releases">Nuevos Lanzamientos</Link></li>
          </ul>
        </article>

        {/* <article className='footer'>
          <h3>Contáctate con Jonatan</h3>
          <nav className="social-icons">
            <a href="https://facebook.com" aria-label="Facebook" title="Facebook">
              <img src={FaFacebook} alt="Facebook" />
              Facebook
            </a>
            <a href="https://twitter.com" aria-label="Twitter" title="Twitter">
              <img src={FaTwitter} alt="Twitter" />
            </a>
            <a href="https://instagram.com" aria-label="Instagram" title="Instagram">
              <img src={FaInstagram} alt="Instagram" />
            </a>
            <a href="https://youtube.com" aria-label="YouTube" title="YouTube">
              <img src={FaYoutube} alt="YouTube" />
            </a>
          </nav>
        </article> */}

        <article className='footer'>
          <h3>Noticias y Novedades</h3>
          <p>Ingresa tu correo electrónico para recibir novedades sobre los nuevos estrenos.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Ingresa tu email"
              className="newsletter-input"
              required
            />
            <button
              type="submit"
              className="newsletter-button"
            >
              Suscribirme
            </button>
          </form>
        </article>
      </section>

      <section className="footer-bottom">
        <p>&copy; 2024 <strong>Jonatan-BlockBuster</strong>. Creo que tengo derechos reservados.</p>
      </section>
    </footer>
  );
};
