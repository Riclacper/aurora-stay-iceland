import { useMemo, useState } from "react";
import { Link, useLocation, useParams, useSearchParams } from "react-router-dom";
import { CalendarDays, CheckCircle2, ShieldCheck, UserRound } from "lucide-react";
import { stays } from "../data/stays.js";
import NotFound from "./NotFound.jsx";

const DAY_IN_MS = 24 * 60 * 60 * 1000;
const FEES = 90;

function formatDateInput(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function parseDate(value) {
  return new Date(`${value}T12:00:00`);
}

function isValidRange(checkIn, checkOut, today) {
  return Boolean(checkIn && checkOut && checkIn >= today && checkOut > checkIn);
}

function createInitialDates(searchParams) {
  const today = formatDateInput(new Date());
  const requestedCheckIn = searchParams.get("checkin");
  const requestedCheckOut = searchParams.get("checkout");

  if (isValidRange(requestedCheckIn, requestedCheckOut, today)) {
    return {
      checkIn: requestedCheckIn,
      checkOut: requestedCheckOut,
    };
  }

  return {
    checkIn: formatDateInput(addDays(new Date(), 7)),
    checkOut: formatDateInput(addDays(new Date(), 12)),
  };
}

export default function Booking() {
  const { id } = useParams();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const stay = stays.find((item) => item.id === Number(id));
  const initialDates = useMemo(
    () => createInitialDates(searchParams),
    [searchParams],
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    document: "",
    checkIn: initialDates.checkIn,
    checkOut: initialDates.checkOut,
  });
  const [errors, setErrors] = useState({});
  const [confirmationCode, setConfirmationCode] = useState("");

  if (!stay) return <NotFound />;

  const today = formatDateInput(new Date());
  const minimumCheckOut = formatDateInput(
    addDays(parseDate(formData.checkIn), 1),
  );
  const requestedGuests = Number(searchParams.get("hospedes"));
  const guests = requestedGuests > 0 ? requestedGuests : 2;
  const nights = Math.max(
    0,
    Math.round(
      (parseDate(formData.checkOut) - parseDate(formData.checkIn)) /
        DAY_IN_MS,
    ),
  );
  const subtotal = stay.price * nights;
  const total = subtotal + FEES;
  const disabled = Boolean(confirmationCode);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  }

  function handleCheckInChange(event) {
    const value = event.target.value;
    setFormData((current) => ({
      ...current,
      checkIn: value,
      checkOut:
        !current.checkOut || current.checkOut <= value
          ? formatDateInput(addDays(parseDate(value), 1))
          : current.checkOut,
    }));
    setErrors((current) => ({ ...current, checkIn: "", checkOut: "" }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = {};

    if (!formData.name.trim()) nextErrors.name = "Informe o nome completo.";
    if (!formData.email.trim()) {
      nextErrors.email = "Informe o e-mail.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "Informe um e-mail válido.";
    }
    if (!formData.phone.trim()) nextErrors.phone = "Informe o telefone.";
    if (!formData.document.trim()) nextErrors.document = "Informe o documento.";
    if (formData.checkIn < today) {
      nextErrors.checkIn = "O check-in não pode ser anterior a hoje.";
    }
    if (formData.checkOut <= formData.checkIn) {
      nextErrors.checkOut = "O check-out deve ser posterior ao check-in.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setConfirmationCode(
      `AST-${Math.floor(100000 + Math.random() * 900000)}`,
    );
  }

  function fieldError(name) {
    return errors[name] ? <span role="alert">{errors[name]}</span> : null;
  }

  return (
    <main className="page-light">
      <section className="container checkout-page">
        <div>
          <p className="eyebrow">Reserva</p>
          <h1>Finalizar reserva</h1>
          <p className="checkout-subtitle">
            Preencha os dados para simular a reserva da hospedagem selecionada.
          </p>

          {confirmationCode && (
            <div className="filter-note" aria-live="polite">
              <CheckCircle2 size={20} />
              Reserva demonstrativa confirmada: <strong>{confirmationCode}</strong>
            </div>
          )}

          <form
            id="booking-form"
            className="checkout-form"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="form-section">
              <h2>
                <UserRound /> Dados do hóspede
              </h2>
              <div className="form-grid">
                <label htmlFor="name">
                  Nome completo
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    required
                    autoComplete="name"
                    disabled={disabled}
                    aria-invalid={Boolean(errors.name)}
                    onChange={handleChange}
                  />
                  {fieldError("name")}
                </label>
                <label htmlFor="email">
                  E-mail
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    required
                    autoComplete="email"
                    disabled={disabled}
                    aria-invalid={Boolean(errors.email)}
                    onChange={handleChange}
                  />
                  {fieldError("email")}
                </label>
                <label htmlFor="phone">
                  Telefone
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    required
                    autoComplete="tel"
                    inputMode="tel"
                    disabled={disabled}
                    aria-invalid={Boolean(errors.phone)}
                    onChange={handleChange}
                  />
                  {fieldError("phone")}
                </label>
                <label htmlFor="document">
                  Documento
                  <input
                    id="document"
                    name="document"
                    value={formData.document}
                    required
                    autoComplete="off"
                    disabled={disabled}
                    aria-invalid={Boolean(errors.document)}
                    onChange={handleChange}
                  />
                  {fieldError("document")}
                </label>
              </div>
            </div>

            <div className="form-section">
              <h2>
                <CalendarDays /> Datas da viagem
              </h2>
              <div className="form-grid">
                <label htmlFor="checkIn">
                  Check-in
                  <input
                    id="checkIn"
                    name="checkIn"
                    type="date"
                    value={formData.checkIn}
                    min={today}
                    required
                    disabled={disabled}
                    aria-invalid={Boolean(errors.checkIn)}
                    onChange={handleCheckInChange}
                  />
                  {fieldError("checkIn")}
                </label>
                <label htmlFor="checkOut">
                  Check-out
                  <input
                    id="checkOut"
                    name="checkOut"
                    type="date"
                    value={formData.checkOut}
                    min={minimumCheckOut}
                    required
                    disabled={disabled}
                    aria-invalid={Boolean(errors.checkOut)}
                    onChange={handleChange}
                  />
                  {fieldError("checkOut")}
                </label>
              </div>
            </div>
          </form>
        </div>

        <aside className="summary-card">
          <img src={stay.image} alt={stay.name} />
          <h2>{stay.name}</h2>
          <p>{stay.location}</p>
          <div className="summary-line">
            <span>${stay.price} x {nights} noite(s)</span>
            <strong>${subtotal}</strong>
          </div>
          <div className="summary-line">
            <span>Hóspedes</span>
            <strong>{guests}</strong>
          </div>
          <div className="summary-line">
            <span>Taxas</span>
            <strong>${FEES}</strong>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <strong>${total}</strong>
          </div>
          <button
            type="submit"
            form="booking-form"
            className="btn btn-primary full"
            disabled={disabled}
          >
            {confirmationCode ? "Reserva confirmada" : "Confirmar reserva"}
          </button>
          <div className="secure-note">
            <ShieldCheck size={18} /> Simulação sem cobrança
          </div>
          <Link
            to={`/hospedagens/${stay.id}${location.search}`}
            className="back-link"
          >
            Voltar aos detalhes
          </Link>
        </aside>
      </section>
    </main>
  );
}
