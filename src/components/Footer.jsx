import React from "react";
import { Link } from "react-router-dom";
import {
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Mountain,
} from "lucide-react";

const portfolioUrl = "https://portfolio-ricardo-lacerda.vercel.app/#projetos";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-column footer-brand-column">
          <div className="footer-brand">
            <Mountain size={26} />
            <div>
              <strong>Aurora Stay Iceland</strong>
              <span>Nordic Experience Prototype</span>
            </div>
          </div>

          <p className="footer-description">
            Protótipo acadêmico para descoberta de hospedagens e simulação de
            reservas em regiões estratégicas da Islândia.
          </p>

          <div className="footer-socials" aria-label="Links do desenvolvedor">
            <a
              href="https://github.com/Riclacper"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub de Ricardo Lacerda Pereira"
              title="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/ricardo-lacerda-pereira/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn de Ricardo Lacerda Pereira"
              title="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:ricardolacper@gmail.com"
              aria-label="Enviar e-mail para Ricardo Lacerda Pereira"
              title="E-mail"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div className="footer-column">
          <h4>Navegação</h4>
          <Link to="/">Início</Link>
          <Link to="/hospedagens">Hospedagens</Link>
          <Link to="/admin">Control Center</Link>
          <Link to="/login">Acesso administrativo</Link>
        </div>

        <div className="footer-column">
          <h4>Tecnologias atuais</h4>
          <span>React + Vite</span>
          <span>React Router</span>
          <span>Framer Motion</span>
          <span>Lucide React</span>
        </div>

        <div className="footer-column">
          <h4>Escopo do projeto</h4>
          <span>UX/UI responsivo</span>
          <span>Filtros e paginação</span>
          <span>Reserva demonstrativa</span>
          <span>Dados locais sem backend</span>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© 2026 Aurora Stay Iceland. Projeto acadêmico demonstrativo.</p>
        <p className="portfolio-credit">
          Desenvolvido por{" "}
          <a href={portfolioUrl} target="_blank" rel="noreferrer">
            Ricardo Lacerda Pereira
            <ExternalLink size={14} />
          </a>
        </p>
      </div>
    </footer>
  );
}
