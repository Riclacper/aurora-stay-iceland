import { Link, useParams } from 'react-router-dom'
import { CalendarDays, CreditCard, ShieldCheck, UserRound } from 'lucide-react'
import { stays } from '../data/stays.js'
import NotFound from './NotFound.jsx'

export default function Booking() {
  const { id } = useParams()
  const stay = stays.find((item) => item.id === id)
  if (!stay) return <NotFound />

  const nights = 5
  const fees = 90
  const subtotal = stay.price * nights
  const total = subtotal + fees

  return (
    <main className="page-light">
      <section className="container checkout-page">
        <div>
          <p className="eyebrow">Reserva</p>
          <h1>Finalizar reserva</h1>
          <p className="checkout-subtitle">Preencha os dados para simular a reserva da hospedagem selecionada.</p>

          <form className="checkout-form">
            <div className="form-section">
              <h2><UserRound /> Dados do hóspede</h2>
              <div className="form-grid">
                <label>Nome completo<input placeholder="Digite seu nome" /></label>
                <label>E-mail<input placeholder="email@exemplo.com" /></label>
                <label>Telefone<input placeholder="+55 81 99999-9999" /></label>
                <label>Documento<input placeholder="Passaporte ou CPF" /></label>
              </div>
            </div>
            <div className="form-section">
              <h2><CalendarDays /> Datas da viagem</h2>
              <div className="form-grid">
                <label>Check-in<input type="date" defaultValue="2026-06-10" /></label>
                <label>Check-out<input type="date" defaultValue="2026-06-15" /></label>
              </div>
            </div>
            <div className="form-section">
              <h2><CreditCard /> Pagamento</h2>
              <div className="form-grid">
                <label>Número do cartão<input placeholder="0000 0000 0000 0000" /></label>
                <label>Nome no cartão<input placeholder="Nome impresso" /></label>
                <label>Validade<input placeholder="MM/AA" /></label>
                <label>CVV<input placeholder="123" /></label>
              </div>
            </div>
          </form>
        </div>

        <aside className="summary-card">
          <img src={stay.image} alt={stay.name} />
          <h2>{stay.name}</h2>
          <p>{stay.city}, {stay.country}</p>
          <div className="summary-line"><span>${stay.price} x {nights} noites</span><strong>${subtotal}</strong></div>
          <div className="summary-line"><span>Taxas</span><strong>${fees}</strong></div>
          <div className="summary-total"><span>Total</span><strong>${total}</strong></div>
          <button className="btn btn-primary full">Confirmar reserva</button>
          <div className="secure-note"><ShieldCheck size={18} /> Pagamento seguro demonstrativo</div>
          <Link to={`/hospedagens/${stay.id}`} className="back-link">Voltar aos detalhes</Link>
        </aside>
      </section>
    </main>
  )
}
