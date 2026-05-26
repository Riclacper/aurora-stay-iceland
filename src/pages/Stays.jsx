import React from "react";
import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { stays } from "../data/stays.js";
import StayCard from "../components/StayCard.jsx";

export default function Stays() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("Todas");

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

  const filteredStays = stays.filter((stay) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      stay.name.toLowerCase().includes(searchText) ||
      stay.location.toLowerCase().includes(searchText) ||
      stay.type.toLowerCase().includes(searchText) ||
      stay.category.toLowerCase().includes(searchText) ||
      stay.tags.some((tag) => tag.toLowerCase().includes(searchText));

    const matchesRegion =
      region === "Todas" ||
      stay.location.toLowerCase().includes(region.toLowerCase());

    return matchesSearch && matchesRegion;
  });

  return (
    <section className="section-light">
      <div className="container stays-layout">
        <aside className="filter-card">
          <h2>
            <SlidersHorizontal size={22} />
            Filtros
          </h2>

          <div className="filter-group">
            <label>Buscar</label>
            <input
              type="text"
              placeholder="Nome, cidade ou categoria"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>Região</label>
            <select value={region} onChange={(e) => setRegion(e.target.value)}>
              {regions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-count">
            {filteredStays.length} hospedagem(ns) encontrada(s)
          </div>

          {(search || region !== "Todas") && (
            <button
              className="btn btn-dark full"
              type="button"
              onClick={() => {
                setSearch("");
                setRegion("Todas");
              }}
            >
              Limpar filtros
            </button>
          )}
        </aside>

        <div className="stay-grid">
          {filteredStays.length > 0 ? (
            filteredStays.map((stay) => <StayCard key={stay.id} stay={stay} />)
          ) : (
            <div className="empty-state">
              <h2>Nenhuma hospedagem encontrada</h2>
              <p>Tente buscar por outra região, nome ou categoria.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
