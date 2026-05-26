import { Link } from 'react-router-dom'
import { LockKeyhole, Mail } from 'lucide-react'

export default function Login() {
  return (
    <main className="login-page">
      <section className="login-card">
        <p className="eyebrow">Acesso</p>
        <h1>Entrar na plataforma</h1>
        <p>Área demonstrativa para usuário, anfitrião ou administrador.</p>
        <form>
          <label><span><Mail size={17} /> E-mail</span><input placeholder="admin@aurorastay.com" /></label>
          <label><span><LockKeyhole size={17} /> Senha</span><input type="password" placeholder="••••••••" /></label>
          <button className="btn btn-primary full" type="button">Entrar</button>
        </form>
        <Link to="/">Voltar ao início</Link>
      </section>
    </main>
  )
}
