import { useLayoutEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { MapPin, Star, Users } from "lucide-react";
import { stays } from "../data/stays.js";
import { applyStayImageFallback } from "../utils/imageFallback.js";

function forceDetailsToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export default function StayDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const stay = stays.find((item) => item.id === Number(id));

  useLayoutEffect(() => {
    forceDetailsToTop();

    const animationFrame = window.requestAnimationFrame(forceDetailsToTop);
    const timer = window.setTimeout(forceDetailsToTop, 180);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(timer);
    };
  }, [id]);

  if (!stay) {
    return (
      <section className="container section">
        <h1>Hospedagem não encontrada</h1>
      </section>
    );
  }

  const bookingUrl = `/reserva/${stay.id}${location.search}`;

  return (
    <section className="container section">
      <div className="details-topbar">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Voltar
        </button>
      </div>

      <div className="details-grid">
        <div>
          <img
            src={stay.image}
            alt={stay.name}
            className="details-image"
            onError={(event) => applyStayImageFallback(event, stay.id)}
          />
        </div>

        <div className="details-content">
          <span className="pill">{stay.type}</span>
          <h1>{stay.name}</h1>
          <p className="muted">
            <MapPin size={18} />
            {stay.location}
          </p>
          <p className="muted">
            <Users size={18} />
            Até {stay.guests} hóspedes
          </p>
          <p className="rating-large">
            <Star size={18} fill="currentColor" />
            {stay.rating}
          </p>
          <div className="tag-list">
            {stay.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div className="details-price">${stay.price}/noite</div>
          <p className="details-description">
            Hospedagem premium localizada em uma das regiões mais procuradas da
            Islândia para observação da aurora boreal, oferecendo conforto,
            experiência exclusiva e visual panorâmico.
          </p>
          <Link to={bookingUrl} className="btn btn-primary">
            Reservar agora
          </Link>
        </div>
      </div>
    </section>
  );
}
