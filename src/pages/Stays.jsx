import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import { stays } from "../data/stays.js";
import StayCard from "../components/StayCard.jsx";

export default function Stays() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(
    () => searchParams.get("destino") ?? "",
  );
  const [region, setRegion] = useState(
    () => searchParams.get("regiao") ?? "Todas",
  );
  const [minimumGuests, setMinimumGuests] = useState(
    () => searchParams.get("hospedes") ?? "",
  );

  const regions = [
    "Todas",
    "Reykjavík",
    "Vík",
    "Höfn",
    "Akureyri",
    "Costa Sul",
    "Westfjords",
    "Golden Circle",
    "Blue Lagoon",
    "Sudeste",
    "Norte",
  ];

  function updateSearchParam(key, value) {
    const nextParams = new URLSearchParams(searchParams);

    if (value) {
      nextParams.set(key, value);
    } else {
      nextParams.delete(key);
    }

    setSearchParams(nextParams, { replace: true });
  }

  function handleSearchChange(value) {
    setSearch(value);
    updateSearchParam("destino", value.trim());
  }

  function handleRegionChange(value) {
    setRegion(value);
    updateSearchParam("regiao", value === "Todas" ? "" : value);
  }

  function handleGuestsChange(value) {
    setMinimumGuests(value);
    updateSearchParam("hospedes", value);
  }

  function clearFilters() {
    setSearch("");
    setRegion("Todas");
    setMinimumGuests("");
    setSearchParams({}, { replace: true });
  }

  const filteredStays = stays.filter((stay) => {
    const searchText = search.trim().toLowerCase();

    const matchesSearch =
      !searchText ||
      stay.name.toLowerCase().includes(searchText) ||
      stay.location.toLowerCase().includes(searchText) ||
      stay.type.toLowerCase().includes(searchText) ||
      stay.category.toLowerCase().includes(searchText) ||
      stay.tags.some((tag) => tag.toLowerCase().includes(searchText));

    const matchesRegion =
      region === "Todas" ||
      stay.location.toLowerCase().includes(region.toLowerCase());

    const matchesGuests =
      !minimumGuests || stay.guests >= Number(minimumGuests);

    return matchesSearch && matchesRegion && matchesGuests;
  });

  const queryString = searchParams.toString();
  const hasActiveFilters =
    Boolean(search) ||
    region !== "Todas" ||
    Boolean(minimumGuests) ||
    Boolean(queryString);

  return (
    <section className="section-light">
      <div className="container stays-layout">
        <aside className="filter-card">
          <h2>
            <SlidersHorizontal size={22} />
            Filtros
          </h2>

          <div className="filter-group">
            <label htmlFor="stay-search">Buscar</label>
            <input
              id="stay-search"
              type="text"
              placeholder="Nome, cidade ou categoria"
              value={search}
              onChange={(event) => handleSearchChange(event.target.value)}
            />
          </div>

          <div className="filter-group">
            <label htmlFor="stay-region">Região</label>
            <select
              id="stay-region"
              value={region}
              onChange={(event) => handleRegionChange(event.target.value)}
            >
              {regions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="stay-guests">Mínimo de hóspedes</label>
            <select
              id="stay-guests"
              value={minimumGuests}
              onChange={(event) => handleGuestsChange(event.target.value)}
            >
              <option value="">Qualquer quantidade</option>
              <option value="1">1 hóspede</option>
              <option value="2">2 hóspedes</option>
              <option value="4">4 hóspedes</option>
              <option value="6">6 hóspedes</option>
              <option value="8">8 hóspedes</option>
            </select>
          </div>

          <div className="filter-count" aria-live="polite">
            {filteredStays.length} hospedagem(ns) encontrada(s)
          </div>

          {hasActiveFilters && (
            <button
              className="btn btn-dark full"
              type="button"
              onClick={clearFilters}
            >
              Limpar filtros
            </button>
          )}
        </aside>

        <div className="stay-grid">
          {filteredStays.length > 0 ? (
            filteredStays.map((stay) => (
              <StayCard
                key={stay.id}
                stay={stay}
                queryString={queryString}
              />
            ))
          ) : (
            <div className="empty-state">
              <h2>Nenhuma hospedagem encontrada</h2>
              <p>
                Tente buscar por outra região, nome, categoria ou capacidade.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
