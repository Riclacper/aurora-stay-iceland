import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, CalendarDays, Users, MapPin } from "lucide-react";

export default function SearchBox({ compact = false }) {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("2026-08-21");
  const [checkOut, setCheckOut] = useState("2026-08-28");
  const [guests, setGuests] = useState("2");
  const [showSuggestions, setShowSuggestions] = useState(false);

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

  function handleSearch() {
    const params = new URLSearchParams();

    if (destination) params.set("destino", destination);
    if (checkIn) params.set("checkin", checkIn);
    if (checkOut) params.set("checkout", checkOut);
    if (guests) params.set("hospedes", guests);

    navigate(`/hospedagens?${params.toString()}`);
  }

  return (
    <div className={compact ? "search-box compact" : "search-box"}>
      {/* DESTINO */}
      <label className="destination-field">
        <span>
          <MapPin size={16} />
          Destino
        </span>

        <div className="destination-wrapper">
          <input
            placeholder="Reykjavík, Vík, Höfn..."
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
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

      {/* CHECK-IN */}
      <label>
        <span>
          <CalendarDays size={16} />
          Check-in
        </span>

        <input
          type="date"
          value={checkIn}
          min="2026-01-01"
          onChange={(e) => setCheckIn(e.target.value)}
        />
      </label>

      {/* CHECK-OUT */}
      <label>
        <span>
          <CalendarDays size={16} />
          Check-out
        </span>

        <input
          type="date"
          value={checkOut}
          min={checkIn}
          onChange={(e) => setCheckOut(e.target.value)}
        />
      </label>

      {/* HÓSPEDES */}
      <label>
        <span>
          <Users size={16} />
          Hóspedes
        </span>

        <select value={guests} onChange={(e) => setGuests(e.target.value)}>
          <option value="1">1 hóspede</option>
          <option value="2">2 hóspedes</option>
          <option value="4">4 hóspedes</option>
          <option value="6">6 hóspedes</option>
          <option value="8">8 hóspedes</option>
        </select>
      </label>

      {/* BOTÃO */}
      <button className="btn btn-primary" type="button" onClick={handleSearch}>
        <Search size={18} />
        Buscar
      </button>
    </div>
  );
}
