import React from "react";
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, Mountain, X } from "lucide-react";

const links = [
  { to: "/", label: "Início" },
  { to: "/hospedagens", label: "Hospedagens" },
  { to: "/admin", label: "Admin" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-icon">
            <Mountain size={24} />
          </span>
          <span>
            <strong>Aurora Stay</strong>
            <small>ICELAND</small>
          </span>
        </Link>

        <nav className="desktop-nav">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <Link to="/login" className="btn btn-light desktop-only">
          Entrar
        </Link>

        <button
          className="mobile-menu"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="mobile-nav container">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="mobile-link"
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className="btn btn-primary full"
          >
            Entrar
          </Link>
        </div>
      )}
    </header>
  );
}
