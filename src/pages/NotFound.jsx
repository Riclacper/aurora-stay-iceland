import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="notfound container">
      <h1>Página não encontrada</h1>
      <p>O conteúdo solicitado não existe neste protótipo.</p>
      <Link to="/" className="btn btn-primary">Voltar ao início</Link>
    </main>
  )
}
