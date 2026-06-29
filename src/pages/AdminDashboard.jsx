import React from "react";
import {
  Activity,
  BarChart3,
  CalendarCheck,
  Database,
  Hotel,
  Info,
  Plus,
  RefreshCcw,
  Users,
} from "lucide-react";
import { dashboardStats, recentBookings } from "../data/dashboard.js";
import { stays } from "../data/stays.js";

export default function AdminDashboard() {
  const averageCapacity = Math.round(
    stays.reduce((total, stay) => total + stay.guests, 0) / stays.length,
  );
  const featuredRegions = new Set(stays.map((stay) => stay.location)).size;

  return (
    <main className="page-light admin-page">
      <section className="container admin-header admin-header-modern">
        <div>
          <div className="admin-demo-badge">
            <Activity size={16} /> Ambiente de demonstração
          </div>
          <p className="eyebrow">Painel administrativo</p>
          <h1>Aurora Stay Control Center</h1>
          <p>
            Visão gerencial do catálogo, reservas simuladas e indicadores do
            protótipo acadêmico.
          </p>
        </div>

        <button
          className="btn btn-primary"
          type="button"
          disabled
          title="Funcionalidade planejada para uma versão com backend"
        >
          <Plus size={18} /> Nova hospedagem
        </button>
      </section>

      <section className="container admin-notice" role="note">
        <Info size={20} />
        <div>
          <strong>Dados demonstrativos</strong>
          <span>
            Este painel não está conectado a banco de dados. As ações de gestão
            permanecem desativadas até a implementação do backend.
          </span>
        </div>
      </section>

      <section className="container admin-stats">
        {dashboardStats.map((item) => (
          <article className="stat-card" key={item.label}>
            <span>{item.trend}</span>
            <strong>{item.value}</strong>
            <p>{item.label}</p>
            <small>{item.helper}</small>
          </article>
        ))}
      </section>

      <section className="container admin-insights">
        <article>
          <Hotel size={22} />
          <div>
            <strong>{stays.length}</strong>
            <span>itens estáveis no catálogo</span>
          </div>
        </article>
        <article>
          <Database size={22} />
          <div>
            <strong>{featuredRegions}</strong>
            <span>regiões representadas</span>
          </div>
        </article>
        <article>
          <Users size={22} />
          <div>
            <strong>{averageCapacity}</strong>
            <span>hóspedes de capacidade média</span>
          </div>
        </article>
        <article>
          <RefreshCcw size={22} />
          <div>
            <strong>Estável</strong>
            <span>dados não mudam ao recarregar</span>
          </div>
        </article>
      </section>

      <section className="container admin-grid">
        <article className="admin-panel admin-bookings-panel">
          <div className="admin-panel-heading">
            <h2>
              <BarChart3 /> Reservas recentes
            </h2>
            <span>Simulação</span>
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
                        className={
                          booking.status === "Confirmada"
                            ? "status ok"
                            : "status wait"
                        }
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
        </article>

        <article className="admin-panel side-panel admin-actions-panel">
          <div className="admin-panel-heading">
            <h2>
              <Hotel /> Gestão rápida
            </h2>
            <span>Em breve</span>
          </div>

          <button type="button" disabled>
            <Hotel size={18} />
            <span>
              Gerenciar hospedagens
              <small>Cadastro e edição futura</small>
            </span>
          </button>
          <button type="button" disabled>
            <Users size={18} />
            <span>
              Ver usuários
              <small>Controle de perfis futuro</small>
            </span>
          </button>
          <button type="button" disabled>
            <CalendarCheck size={18} />
            <span>
              Exportar relatório
              <small>Disponível com persistência</small>
            </span>
          </button>

          <div className="admin-highlight">
            <Users /> Catálogo preparado para evolução com autenticação e banco
            de dados.
          </div>
        </article>
      </section>
    </main>
  );
}
