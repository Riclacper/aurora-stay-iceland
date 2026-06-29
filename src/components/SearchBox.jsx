import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, CalendarDays, Users, MapPin } from "lucide-react";

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

function parseDateInput(value) {
  return new Date(`${value}T12:00:00`);
}

export default function SearchBox({ compact = false }) {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState(() =>
    formatDateInput(addDays(new Date(), 7)),
  );
  const [checkOut, setCheckOut] = useState(() =>
    formatDateInput(addDays(new Date(), 14)),
  );
  const [guests, setGuests] = useState("2");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const today = formatDateInput(new Date());
  const minimumCheckOut = checkIn
    ? formatDateInput(addDays(parseDateInput(checkIn), 1))
    : today;

  const destinations = [
    "Reykjavík",
    "Vík",
    "Höfn",
    "Akureyri",
    "Costa Sul",
    "Sudeste",
    "Capital",
    "Norte",
    "Westfjords",
    "Golden Circle",
    "Blue Lagoon",
  ];

  const filteredDestinations = destinations.filter((item) =>
    item.toLowerCase().includes(destination.toLowerCase()),
  );

  function handleCheckInChange(value) {
    setCheckIn(value);

    if (value && (!checkOut || checkOut <= value)) {
      setCheckOut(formatDateInput(addDays(parseDateInput(value), 1)));
    }
  }

  function handleSearch() {
    const params = new URLSearchParams();

    if (destination.trim()) params.set("destino", destination.trim());
    if (checkIn) params.set("checkin", checkIn);
    if (checkOut) params.set("checkout", checkOut);
    if (guests) params.set("hospedes", guests);

    navigate(`/hospedagens?${params.toString()}`);
  }

  return (
    <div className={compact ? "search-box compact" : "search-box"}>
      <label className="destination-field">
        <span>
          <MapPin size={16} />
          Destino
        </span>

        <div className="destination-wrapper">
          <input
            name="destination"
            placeholder="Reykjavík, Vík, Höfn..."
            value={destination}
            autoComplete="off"
            onChange={(event) => {
              setDestination(event.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
          />

          {showSuggestions && destination.length > 0 && (
            <div className="destination-suggestions">
              {filteredDestinations.length > 0 ? (
                filteredDestinations.map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => {
                      setDestination(item);
                      setShowSuggestions(false);
                    }}
                    className="destination-item"
                  >
                    {item}
                  </button>
                ))
              ) : (
                <div className="destination-empty">
                  Nenhum destino encontrado
                </div>
              )}
            </div>
          )}
        </div>
      </label>

      <label>
        <span>
          <CalendarDays size={16} />
          Check-in
        </span>

        <input
          name="checkin"
          type="date"
          value={checkIn}
          min={today}
          onChange={(event) => handleCheckInChange(event.target.value)}
        />
      </label>

      <label>
        <span>
          <CalendarDays size={16} />
          Check-out
        </span>

        <input
          name="checkout"
          type="date"
          value={checkOut}
          min={minimumCheckOut}
          onChange={(event) => setCheckOut(event.target.value)}
        />
      </label>

      <label>
        <span>
          <Users size={16} />
          Hóspedes
        </span>

        <select
          name="guests"
          value={guests}
          onChange={(event) => setGuests(event.target.value)}
        >
          <option value="1">1 hóspede</option>
          <option value="2">2 hóspedes</option>
          <option value="4">4 hóspedes</option>
          <option value="6">6 hóspedes</option>
          <option value="8">8 hóspedes</option>
        </select>
      </label>

      <button className="btn btn-primary" type="button" onClick={handleSearch}>
        <Search size={18} />
        Buscar
      </button>
    </div>
  );
}
