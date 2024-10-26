import { Link } from 'react-router-dom';
import './footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from '../../assets/icon/social-page/index';

export const Footer = (): JSX.Element => {
  return (
    <footer className="conteiner-footer">
      <section className="footer-grid">
        
        <article className='footer'>
          <h3>Sobre Jona-BlockBuster</h3>
          <p>
            Una plataforma de películas que te permitirá pasar tiempo en familia.
            Recuerda: ver películas piratas es lo mejor <span role="img" aria-label="smiley">*U*</span> ATTE: El Jona
          </p>
        </article>

        <article className='footer'>
          <h3>Navegación Rápida</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/top-rated">Butaca</Link></li>
            <li><Link to="/new-releases">Nuevos Lanzamientos</Link></li>
            <li><Link to="/genres">Géneros</Link></li>
          </ul>
        </article>

        <article className='footer'>
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
        </article>

        <article className='footer'>
          <h3>Noticias y Novedades</h3>
          <p>Ingresa tu correo electrónico para recibir novedades sobre tus películas favoritas.</p>
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
        <p>&copy; 2024 <strong>Jonatan-BlockBuster</strong>. Todos los derechos reservados.</p>
      </section>
    </footer>
  );
};
