import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Search,
  SlidersHorizontal,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { stays } from "../data/stays.js";
import StayCard from "../components/StayCard.jsx";

const ITEMS_PER_PAGE = 8;

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
  "Snæfellsnes",
  "Mývatn",
];

const categories = [
  { value: "Todas", label: "Todas" },
  { value: "aurora", label: "Aurora" },
  { value: "luxo", label: "Luxo" },
  { value: "premium", label: "Premium" },
  { value: "romantico", label: "Romântico" },
  { value: "familia", label: "Família" },
  { value: "economico", label: "Econômico" },
];

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
  const [category, setCategory] = useState(
    () => searchParams.get("categoria") ?? "Todas",
  );
  const [sort, setSort] = useState(
    () => searchParams.get("ordem") ?? "recomendadas",
  );
  const [page, setPage] = useState(() => {
    const requestedPage = Number(searchParams.get("pagina"));
    return Number.isInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;
  });

  function updateSearchParam(key, value, resetPage = true) {
    const nextParams = new URLSearchParams(searchParams);

    if (value) {
      nextParams.set(key, value);
    } else {
      nextParams.delete(key);
    }

    if (resetPage) {
      nextParams.delete("pagina");
      setPage(1);
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

  function handleCategoryChange(value) {
    setCategory(value);
    updateSearchParam("categoria", value === "Todas" ? "" : value);
  }

  function handleSortChange(value) {
    setSort(value);
    updateSearchParam("ordem", value === "recomendadas" ? "" : value);
  }

  function handlePageChange(nextPage) {
    setPage(nextPage);
    updateSearchParam("pagina", String(nextPage), false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function clearFilters() {
    setSearch("");
    setRegion("Todas");
    setMinimumGuests("");
    setCategory("Todas");
    setSort("recomendadas");
    setPage(1);
    setSearchParams({}, { replace: true });
  }

  const filteredStays = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    const result = stays.filter((stay) => {
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

      const matchesCategory =
        category === "Todas" || stay.category === category;

      return (
        matchesSearch && matchesRegion && matchesGuests && matchesCategory
      );
    });

    return [...result].sort((first, second) => {
      if (sort === "menor-preco") return first.price - second.price;
      if (sort === "maior-preco") return second.price - first.price;
      if (sort === "avaliacao") {
        return Number(second.rating) - Number(first.rating);
      }
      if (sort === "capacidade") return second.guests - first.guests;
      return first.id - second.id;
    });
  }, [category, minimumGuests, region, search, sort]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredStays.length / ITEMS_PER_PAGE),
  );
  const currentPage = Math.min(page, totalPages);
  const firstItemIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedStays = filteredStays.slice(
    firstItemIndex,
    firstItemIndex + ITEMS_PER_PAGE,
  );

  const detailsParams = new URLSearchParams(searchParams);
  detailsParams.delete("pagina");
  detailsParams.delete("ordem");
  const queryString = detailsParams.toString();

  const hasActiveFilters =
    Boolean(search) ||
    region !== "Todas" ||
    Boolean(minimumGuests) ||
    category !== "Todas" ||
    sort !== "recomendadas";

  return (
    <section className="section-light stays-page">
      <div className="container catalog-heading">
        <div>
          <p className="eyebrow">Catálogo</p>
          <h1>Encontre seu refúgio na Islândia</h1>
          <p>
            Explore {stays.length} opções demonstrativas com filtros por região,
            perfil da viagem e capacidade.
          </p>
        </div>
        <div className="catalog-heading-badge">
          <Sparkles size={20} />
          Dados estáveis para demonstração
        </div>
      </div>

      <div className="container stays-layout">
        <aside className="filter-card modern-filter-card">
          <div className="filter-card-header">
            <div>
              <span>Pesquisa personalizada</span>
              <h2>
                <SlidersHorizontal size={22} />
                Filtros
              </h2>
            </div>
            {hasActiveFilters && (
              <button
                className="filter-clear-icon"
                type="button"
                onClick={clearFilters}
                aria-label="Limpar todos os filtros"
                title="Limpar filtros"
              >
                <X size={18} />
              </button>
            )}
          </div>

          <div className="filter-group">
            <label htmlFor="stay-search">Buscar hospedagem</label>
            <div className="filter-control">
              <Search size={18} />
              <input
                id="stay-search"
                type="search"
                placeholder="Nome, cidade ou experiência"
                value={search}
                onChange={(event) => handleSearchChange(event.target.value)}
              />
            </div>
          </div>

          <div className="filter-group">
            <label htmlFor="stay-region">Região</label>
            <div className="filter-control">
              <MapPin size={18} />
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
          </div>

          <div className="filter-group">
            <label htmlFor="stay-guests">Capacidade mínima</label>
            <div className="filter-control">
              <Users size={18} />
              <select
                id="stay-guests"
                value={minimumGuests}
                onChange={(event) => handleGuestsChange(event.target.value)}
              >
                <option value="">Qualquer quantidade</option>
                <option value="2">2 hóspedes</option>
                <option value="4">4 hóspedes</option>
                <option value="6">6 hóspedes</option>
                <option value="8">8 hóspedes</option>
              </select>
            </div>
          </div>

          <div className="filter-group">
            <span className="filter-label">Perfil da viagem</span>
            <div className="filter-chips">
              {categories.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  className={category === item.value ? "active" : ""}
                  onClick={() => handleCategoryChange(item.value)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-count" aria-live="polite">
            <strong>{filteredStays.length}</strong>
            <span>hospedagem(ns) encontrada(s)</span>
          </div>

          {hasActiveFilters && (
            <button
              className="btn btn-dark full"
              type="button"
              onClick={clearFilters}
            >
              <X size={17} /> Limpar filtros
            </button>
          )}
        </aside>

        <div className="catalog-results">
          <div className="catalog-toolbar">
            <div>
              <strong>
                {filteredStays.length === 0
                  ? "Nenhum resultado"
                  : `${firstItemIndex + 1}–${Math.min(
                      firstItemIndex + ITEMS_PER_PAGE,
                      filteredStays.length,
                    )} de ${filteredStays.length}`}
              </strong>
              <span>Resultados do catálogo</span>
            </div>

            <label className="sort-control" htmlFor="stay-sort">
              <ArrowUpDown size={17} />
              <select
                id="stay-sort"
                value={sort}
                onChange={(event) => handleSortChange(event.target.value)}
              >
                <option value="recomendadas">Recomendadas</option>
                <option value="menor-preco">Menor preço</option>
                <option value="maior-preco">Maior preço</option>
                <option value="avaliacao">Melhor avaliação</option>
                <option value="capacidade">Maior capacidade</option>
              </select>
            </label>
          </div>

          <div className="stay-grid catalog-grid">
            {paginatedStays.length > 0 ? (
              paginatedStays.map((stay) => (
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
                <button
                  className="btn btn-dark"
                  type="button"
                  onClick={clearFilters}
                >
                  Limpar filtros
                </button>
              </div>
            )}
          </div>

          {filteredStays.length > ITEMS_PER_PAGE && (
            <nav className="pagination" aria-label="Paginação das hospedagens">
              <button
                type="button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Página anterior"
              >
                <ChevronLeft size={18} />
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    className={currentPage === pageNumber ? "active" : ""}
                    onClick={() => handlePageChange(pageNumber)}
                    aria-current={
                      currentPage === pageNumber ? "page" : undefined
                    }
                  >
                    {pageNumber}
                  </button>
                ),
              )}

              <button
                type="button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Próxima página"
              >
                <ChevronRight size={18} />
              </button>
            </nav>
          )}
        </div>
      </div>
    </section>
  );
}
