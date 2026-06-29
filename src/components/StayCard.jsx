import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Star, Users } from "lucide-react";
import { applyStayImageFallback } from "../utils/imageFallback.js";

export default function StayCard({ stay, queryString = "" }) {
  const detailsUrl = queryString
    ? `/hospedagens/${stay.id}?${queryString}`
    : `/hospedagens/${stay.id}`;

  return (
    <article className="stay-card">
      <Link to={detailsUrl} className="stay-image-wrap">
        <img
          src={stay.image}
          alt={stay.name}
          className="stay-image"
          loading="lazy"
          decoding="async"
          onError={(event) => applyStayImageFallback(event, stay.id)}
        />
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
        </p>
        <p className="muted">
          <Users size={16} /> Até {stay.guests} hóspedes
        </p>
        <div className="tag-list">
          {stay.tags.slice(0, 3).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <Link to={detailsUrl} className="btn btn-dark full">
          Ver detalhes
        </Link>
      </div>
    </article>
  );
}
