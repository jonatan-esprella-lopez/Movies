
import { useState } from "react";

import { ActorsList } from "./components/actors-list";
import { MovieDetails } from "./components/movie-details";
import { HeaderNav } from "../../components/header";
import { Footer } from "../../components/footer/footer";
import { VibeModal } from "./components/vibe-modal";

import "./movie-card.css";

export const MovieView = (): JSX.Element => {
  const [isModalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen(!isModalOpen);

  return (
    <section className="container-main">
      <HeaderNav />
      <MovieDetails onVibeClick={toggleModal} />
      <ActorsList />
      <VibeModal isOpen={isModalOpen} onClose={toggleModal} />
      <Footer />
    </section>
  );
};
