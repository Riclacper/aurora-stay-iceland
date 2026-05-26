import React from "react";
import { Mountain, Globe, Mail } from "lucide-react";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-column footer-brand-column">
          <div className="footer-brand">
            <Mountain size={24} />
            <div>
              <strong>Aurora Stay Iceland</strong>
              <span>Luxury Nordic Experience</span>
            </div>
          </div>

          <p className="footer-description">
            Plataforma premium para descoberta e reservas de hospedagens
            exclusivas nas regiões mais incríveis da Islândia.
          </p>

          <div className="footer-socials">
            <button type="button">
              <Globe size={18} />
            </button>

            <button type="button">
              <Mail size={18} />
            </button>
          </div>
        </div>

        <div className="footer-column">
          <h4>Navegação</h4>
          <a href="/">Início</a>
          <a href="/hospedagens">Hospedagens</a>
          <a href="/admin">Control Center</a>
        </div>

        <div className="footer-column">
          <h4>Tecnologias</h4>
          <span>React + Vite</span>
          <span>Node.js</span>
          <span>MongoDB</span>
          <span>Arquitetura SPA</span>
        </div>

        <div className="footer-column">
          <h4>Projeto acadêmico</h4>
          <span>UX/UI moderno</span>
          <span>Filtros inteligentes</span>
          <span>Protótipo funcional</span>
          <span>Hospedagem futura</span>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Aurora Stay Iceland. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
