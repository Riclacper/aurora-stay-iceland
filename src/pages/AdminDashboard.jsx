import { useState } from "react";
import {
  Activity,
  BarChart3,
  CalendarCheck,
  Database,
  DollarSign,
  Download,
  Hotel,
  Info,
  Percent,
  TrendingUp,
  Users,
} from "lucide-react";
import { dashboardPeriods, recentBookings } from "../data/dashboard.js";
import { stays } from "../data/stays.js";

const chartColors = {
  confirmed: "#0f766e",
  pending: "#f59e0b",
  cancelled: "#ef4444",
};

const metricIcons = {
  reservations: CalendarCheck,
  revenue: DollarSign,
  dailyRate: TrendingUp,
  occupancy: Percent,
};

function formatCompactCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function EvolutionChart({ data }) {
  const width = 720;
  const height = 250;
  const paddingX = 36;
  const paddingY = 32;
  const maximum = Math.max(...data.map((item) => item.value));
  const usableWidth = width - paddingX * 2;
  const usableHeight = height - paddingY * 2;

  const coordinates = data.map((item, index) => {
    const x =
      paddingX +
      (data.length === 1 ? 0 : (index / (data.length - 1)) * usableWidth);
    const y = height - paddingY - (item.value / maximum) * usableHeight;

    return { ...item, x, y };
  });

  const linePoints = coordinates.map(({ x, y }) => `${x},${y}`).join(" ");
  const areaPoints = `${paddingX},${height - paddingY} ${linePoints} ${
    width - paddingX
  },${height - paddingY}`;

  return (
    <div className="dashboard-line-chart">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Evolução mensal das reservas simuladas"
      >
        <defs>
          <linearGradient id="booking-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0891b2" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#0891b2" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
          const y = height - paddingY - usableHeight * ratio;
          return (
            <line
              key={ratio}
              x1={paddingX}
              y1={y}
              x2={width - paddingX}
              y2={y}
              className="chart-grid-line"
            />
          );
        })}

        <polygon points={areaPoints} fill="url(#booking-area)" />
        <polyline points={linePoints} className="chart-line" />

        {coordinates.map(({ label, value, x, y }) => (
          <g key={label}>
            <circle cx={x} cy={y} r="5" className="chart-point" />
            <text x={x} y={height - 9} textAnchor="middle" className="chart-label">
              {label}
            </text>
            <title>{`${label}: ${value} reservas`}</title>
          </g>
        ))}
      </svg>
    </div>
  );
}

function StatusDonut({ statuses }) {
  const total = statuses.reduce((sum, item) => sum + item.value, 0);
  let cursor = 0;
  const gradient = statuses
    .map((item) => {
      const start = cursor;
      const end = cursor + (item.value / total) * 100;
      cursor = end;
      return `${chartColors[item.tone]} ${start}% ${end}%`;
    })
    .join(", ");

  return (
    <div className="status-chart-layout">
      <div
        className="status-donut"
        style={{ background: `conic-gradient(${gradient})` }}
        role="img"
        aria-label={`Distribuição de ${total} reservas por status`}
      >
        <div>
          <strong>{total}</strong>
          <span>reservas</span>
        </div>
      </div>

      <div className="status-legend">
        {statuses.map((item) => (
          <div key={item.label}>
            <i style={{ background: chartColors[item.tone] }} />
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

function RegionBars({ regions }) {
  const maximum = Math.max(...regions.map((item) => item.value));

  return (
    <div className="region-bars">
      {regions.map((region) => (
        <div className="region-bar-row" key={region.label}>
          <div className="region-bar-label">
            <span>{region.label}</span>
            <strong>{formatCompactCurrency(region.value)}</strong>
          </div>
          <div className="region-bar-track">
            <span style={{ width: `${(region.value / maximum) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AdminDashboard() {
  const [period, setPeriod] = useState("6m");
  const dashboard = dashboardPeriods[period];
  const averageCapacity = Math.round(
    stays.reduce((total, stay) => total + stay.guests, 0) / stays.length,
  );
  const featuredRegions = new Set(stays.map((stay) => stay.location)).size;

  return (
    <main className="page-light admin-page dashboard-page">
      <section className="container admin-header admin-header-modern dashboard-header">
        <div>
          <div className="admin-demo-badge">
            <Activity size={16} /> Ambiente de demonstração
          </div>
          <p className="eyebrow">Painel administrativo</p>
          <h1>Aurora Stay Control Center</h1>
          <p>
            Acompanhe indicadores, comportamento das reservas e desempenho do
            catálogo em uma visão executiva.
          </p>
        </div>

        <div className="dashboard-header-actions">
          <label htmlFor="dashboard-period">
            <span>Período</span>
            <select
              id="dashboard-period"
              value={period}
              onChange={(event) => setPeriod(event.target.value)}
            >
              {Object.entries(dashboardPeriods).map(([key, item]) => (
                <option key={key} value={key}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
          <button
            className="btn btn-dark"
            type="button"
            disabled
            title="Disponível após integração com backend"
          >
            <Download size={17} /> Exportar
          </button>
        </div>
      </section>

      <section className="container admin-notice" role="note">
        <Info size={20} />
        <div>
          <strong>Dados demonstrativos para análise visual</strong>
          <span>
            Os indicadores abaixo simulam um cenário operacional e não estão
            conectados a banco de dados ou pagamentos reais.
          </span>
        </div>
      </section>

      <section className="container dashboard-kpis">
        {dashboard.stats.map((item) => {
          const Icon = metricIcons[item.key];
          return (
            <article className="dashboard-kpi" key={item.key}>
              <div className="dashboard-kpi-top">
                <span className="dashboard-kpi-icon">
                  <Icon size={20} />
                </span>
                <span className="dashboard-kpi-trend">{item.trend}</span>
              </div>
              <strong>{item.value}</strong>
              <p>{item.label}</p>
              <small>{item.helper}</small>
            </article>
          );
        })}
      </section>

      <section className="container dashboard-analysis-grid">
        <article className="dashboard-panel dashboard-panel-wide">
          <div className="dashboard-panel-heading">
            <div>
              <span>Performance</span>
              <h2>
                <TrendingUp size={20} /> Evolução das reservas
              </h2>
            </div>
            <strong>{dashboard.label}</strong>
          </div>
          <EvolutionChart data={dashboard.bookingsEvolution} />
        </article>

        <article className="dashboard-panel">
          <div className="dashboard-panel-heading">
            <div>
              <span>Conversão</span>
              <h2>
                <CalendarCheck size={20} /> Status das reservas
              </h2>
            </div>
          </div>
          <StatusDonut statuses={dashboard.statuses} />
        </article>

        <article className="dashboard-panel dashboard-panel-wide">
          <div className="dashboard-panel-heading">
            <div>
              <span>Distribuição geográfica</span>
              <h2>
                <BarChart3 size={20} /> Receita por região
              </h2>
            </div>
          </div>
          <RegionBars regions={dashboard.revenueByRegion} />
        </article>

        <article className="dashboard-panel">
          <div className="dashboard-panel-heading">
            <div>
              <span>Ranking</span>
              <h2>
                <Hotel size={20} /> Mais procuradas
              </h2>
            </div>
          </div>

          <div className="top-stays-list">
            {dashboard.topStays.map((stay, index) => (
              <div key={stay.name}>
                <span className="top-stay-position">{index + 1}</span>
                <div>
                  <strong>{stay.name}</strong>
                  <small>{stay.bookings} reservas simuladas</small>
                </div>
                <span className="top-stay-rate">{stay.rate}</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="container dashboard-catalog-summary">
        <article>
          <Database size={21} />
          <div>
            <strong>{stays.length}</strong>
            <span>hospedagens no catálogo</span>
          </div>
        </article>
        <article>
          <BarChart3 size={21} />
          <div>
            <strong>{featuredRegions}</strong>
            <span>regiões representadas</span>
          </div>
        </article>
        <article>
          <Users size={21} />
          <div>
            <strong>{averageCapacity}</strong>
            <span>hóspedes de capacidade média</span>
          </div>
        </article>
        <article>
          <Hotel size={21} />
          <div>
            <strong>100%</strong>
            <span>dados estáveis no protótipo</span>
          </div>
        </article>
      </section>

      <section className="container dashboard-panel dashboard-table-panel">
        <div className="dashboard-panel-heading">
          <div>
            <span>Operação recente</span>
            <h2>
              <CalendarCheck size={20} /> Últimas reservas
            </h2>
          </div>
          <strong>{recentBookings.length} registros</strong>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Hospedagem</th>
                <th>Data</th>
                <th>Status</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking) => (
                <tr key={`${booking.guest}-${booking.date}`}>
                  <td>{booking.guest}</td>
                  <td>{booking.stay}</td>
                  <td>{booking.date}</td>
                  <td>
                    <span
                      className={`status ${
                        booking.status === "Confirmada"
                          ? "ok"
                          : booking.status === "Cancelada"
                            ? "cancel"
                            : "wait"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td>{booking.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
