# Aurora Stay Iceland

Plataforma web responsiva para descoberta e simulação de reservas de hospedagens na Islândia, com foco em experiências para observação da aurora boreal.

## Aplicação

- Produção: https://aurora-stay-iceland.vercel.app/
- Documentação completa: [docs/DOCUMENTACAO_DO_PROJETO.md](docs/DOCUMENTACAO_DO_PROJETO.md)
- Portfólio: https://portfolio-ricardo-lacerda.vercel.app/#projetos

## Sobre o projeto

O Aurora Stay Iceland é um protótipo acadêmico desenvolvido como SPA com React e Vite. A aplicação simula uma jornada completa de pesquisa, comparação e reserva, além de apresentar um dashboard administrativo analítico.

O projeto atual utiliza dados locais. Não há backend, banco de dados, autenticação real ou processamento de pagamentos.

## Funcionalidades atuais

- página inicial com busca por destino, datas e hóspedes;
- 60 hospedagens demonstrativas com dados estáveis;
- filtros por texto, região, capacidade e perfil da viagem;
- ordenação por preço, avaliação e capacidade;
- paginação com 8 cards por página;
- detalhes de cada hospedagem;
- fallback automático para imagens indisponíveis;
- reserva demonstrativa com validação e cálculo de valores;
- confirmação com código `AST-XXXXXX`;
- dashboard com KPIs, gráficos interativos e tabela de reservas;
- interações por mouse, toque e teclado;
- layout responsivo;
- footer com créditos profissionais;
- deploy SPA na Vercel.

## Tecnologias

- React 19;
- Vite 7;
- React Router DOM 7;
- Framer Motion;
- Lucide React;
- CSS;
- GitHub;
- Vercel.

## Rotas

| Rota | Finalidade |
|---|---|
| `/` | página inicial |
| `/hospedagens` | catálogo e filtros |
| `/hospedagens/:id` | detalhes da hospedagem |
| `/reserva/:id` | reserva demonstrativa |
| `/admin` | dashboard administrativo |
| `/login` | tela visual de acesso |

## Estrutura principal

```text
src/
├── components/
├── data/
├── layouts/
├── pages/
├── styles/
├── utils/
├── App.jsx
└── main.jsx
```

A descrição detalhada da arquitetura, fluxos, filtros, dashboard, validações, deploy, manutenção e roadmap está em:

[Consultar a documentação completa](docs/DOCUMENTACAO_DO_PROJETO.md)

## Instalação

```bash
git clone https://github.com/Riclacper/aurora-stay-iceland.git
cd aurora-stay-iceland
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

O projeto ainda não possui scripts separados para lint ou testes automatizados.

## Escopo demonstrativo

A aplicação não deve ser utilizada para coletar informações reais de hóspedes. O fluxo de reserva não transmite nem persiste os dados preenchidos e não solicita informações financeiras.

## Próximas evoluções

- ESLint e testes automatizados;
- backend Node.js;
- MongoDB;
- autenticação;
- persistência de reservas;
- disponibilidade real;
- pagamentos;
- painel administrativo operacional.

## Autor

**Ricardo Lacerda Pereira**  
ADS035N-5P-2026.1-RLP

- GitHub: https://github.com/Riclacper
- LinkedIn: https://www.linkedin.com/in/ricardo-lacerda-pereira/
- Portfólio: https://portfolio-ricardo-lacerda.vercel.app/#projetos

Projeto acadêmico — Aurora Stay Iceland © 2026
