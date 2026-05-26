import React from "react";
import { BarChart3, Hotel, Plus, Users } from "lucide-react";
import { dashboardStats, recentBookings } from "../data/dashboard.js";

export default function AdminDashboard() {
  return (
    <main className="page-light">
      <section className="container admin-header">
        <div>
          <p className="eyebrow">Painel administrativo</p>
          <h1>Aurora Stay Control Center</h1>
          <p>
            Controle gerencial de reservas, hospedagens, clientes e desempenho
            da plataforma.
          </p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} /> Nova hospedagem
        </button>
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

      <section className="container admin-grid">
        <article className="admin-panel">
          <h2>
            <BarChart3 /> Reservas recentes
          </h2>
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
                  <tr key={booking.guest}>
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

        <article className="admin-panel side-panel">
          <h2>
            <Hotel /> Gestão rápida
          </h2>
          <button>Gerenciar hospedagens</button>
          <button>Ver usuários</button>
          <button>Exportar relatório</button>
          <div className="admin-highlight">
            <Users /> 1.8k usuários cadastrados no protótipo
          </div>
        </article>
      </section>
    </main>
  );
}
