import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Star, Users } from "lucide-react";

export default function StayCard({ stay }) {
  return (
    <article className="stay-card">
      <Link to={`/hospedagens/${stay.id}`} className="stay-image-wrap">
        <img
          src={stay.image}
          alt={stay.name}
          className="stay-image"
          onError={(e) => {
            e.currentTarget.src = `https://picsum.photos/seed/fallback-${stay.id}/900/600`;
          }}
        />{" "}
        <span className="price-badge">${stay.price}/noite</span>
      </Link>
      <div className="stay-content">
        <div className="stay-topline">
          <span className="pill">{stay.type}</span>
          <span className="rating">
            <Star size={16} fill="currentColor" /> {stay.rating}
          </span>
        </div>
        <h3>{stay.name}</h3>
        <p className="muted">
          <MapPin size={16} /> {stay.location}
        </p>{" "}
        <p className="muted">
          <Users size={16} /> Até {stay.guests} hóspedes
        </p>
        <div className="tag-list">
          {stay.tags.slice(0, 3).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <Link to={`/hospedagens/${stay.id}`} className="btn btn-dark full">
          Ver detalhes
        </Link>
      </div>
    </article>
  );
}
