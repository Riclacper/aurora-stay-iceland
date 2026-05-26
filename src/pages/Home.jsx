import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Globe2,
  ShieldCheck,
  Snowflake,
} from "lucide-react";
import { stays } from "../data/stays.js";
import StayCard from "../components/StayCard.jsx";
import SearchBox from "../components/SearchBox.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import { useState } from "react";

export default function Home() {
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
              Uma plataforma web para encontrar cabanas, lodges e experiências
              premium em regiões estratégicas da Islândia.
            </p>
            <SearchBox />
            <div className="hero-actions">
              <Link to="/hospedagens" className="btn btn-primary">
                Explorar hospedagens <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="hero-card"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://images.unsplash.com/photo-1504851149312-7a075b496cc7?auto=format&fit=crop&w=1400&q=80"
              alt="Aurora boreal na Islândia"
            />
            <div className="floating-card">
              <strong>92%</strong>
              <span>chance estimada de observação em regiões recomendadas</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container trust-section">
        <div className="trust-item">
          <ShieldCheck /> Reserva segura
        </div>
        <div className="trust-item">
          <Globe2 /> Experiência internacional
        </div>
        <div className="trust-item">
          <BadgeCheck /> Curadoria premium
        </div>
      </section>

      <section className="section-light">
        <div className="container">
          <SectionTitle
            eyebrow="Destaques"
            title="Hospedagens recomendadas"
            text="Opções selecionadas para turismo, conforto e observação da aurora boreal."
          />
          <div className="stay-grid">
            {stays.slice(0, 6).map((stay) => (
              <StayCard key={stay.id} stay={stay} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
