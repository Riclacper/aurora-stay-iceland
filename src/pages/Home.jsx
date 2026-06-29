import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Compass,
  Globe2,
  MapPinned,
  ShieldCheck,
  Snowflake,
  Sparkles,
} from "lucide-react";
import { stays } from "../data/stays.js";
import StayCard from "../components/StayCard.jsx";
import SearchBox from "../components/SearchBox.jsx";
import SectionTitle from "../components/SectionTitle.jsx";

export default function Home() {
  const regions = new Set(stays.map((stay) => stay.location)).size;

  return (
    <main>
      <section className="hero">
        <div className="hero-bg" />
        <div className="container hero-grid">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="hero-kicker">
              <Snowflake size={18} /> Turismo inteligente na Islândia
            </div>
            <h1>Hospedagens exclusivas para viver a aurora boreal.</h1>
            <p className="hero-text">
              Encontre cabanas, lodges e experiências nórdicas em regiões
              estratégicas, com busca simples e uma jornada de reserva
              demonstrativa completa.
            </p>
            <SearchBox />
            <div className="hero-actions">
              <Link to="/hospedagens" className="btn btn-primary">
                Explorar hospedagens <ArrowRight size={18} />
              </Link>
              <a href="#destaques" className="btn btn-ghost">
                Ver recomendações
              </a>
            </div>
          </motion.div>

          <motion.div
            className="hero-card"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://images.unsplash.com/photo-1504851149312-7a075b496cc7?auto=format&fit=crop&w=1400&q=82"
              alt="Aurora boreal sobre uma paisagem da Islândia"
            />
            <div className="floating-card">
              <strong>{stays.length}</strong>
              <span>
                hospedagens demonstrativas organizadas em um catálogo estável
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container trust-section" aria-label="Diferenciais">
        <div className="trust-item">
          <ShieldCheck /> Reserva demonstrativa segura
        </div>
        <div className="trust-item">
          <Globe2 /> Experiência internacional
        </div>
        <div className="trust-item">
          <BadgeCheck /> Curadoria visual premium
        </div>
      </section>

      <section className="container home-overview" aria-label="Resumo do catálogo">
        <article>
          <Compass size={22} />
          <div>
            <strong>{stays.length}</strong>
            <span>hospedagens disponíveis</span>
          </div>
        </article>
        <article>
          <MapPinned size={22} />
          <div>
            <strong>{regions}</strong>
            <span>destinos e regiões</span>
          </div>
        </article>
        <article>
          <Sparkles size={22} />
          <div>
            <strong>4,5+</strong>
            <span>avaliação demonstrativa</span>
          </div>
        </article>
      </section>

      <section className="section-light" id="destaques">
        <div className="container">
          <div className="home-section-heading">
            <SectionTitle
              eyebrow="Destaques"
              title="Hospedagens recomendadas"
              text="Uma seleção inicial com propostas diferentes de conforto, localização e experiência na Islândia."
            />
            <Link to="/hospedagens" className="catalog-text-link">
              Ver catálogo completo <ArrowRight size={17} />
            </Link>
          </div>

          <div className="stay-grid">
            {stays.slice(0, 6).map((stay) => (
              <StayCard key={stay.id} stay={stay} />
            ))}
          </div>

          <div className="home-catalog-cta">
            <div>
              <span>Mais opções para explorar</span>
              <h2>Compare todas as {stays.length} hospedagens do protótipo.</h2>
              <p>
                Use filtros modernos por região, capacidade, categoria, preço e
                avaliação.
              </p>
            </div>
            <Link to="/hospedagens" className="btn btn-primary">
              Abrir catálogo <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
