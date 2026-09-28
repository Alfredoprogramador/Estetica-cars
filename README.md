# CarClean Pro

PWA de limpeza automotiva com foco em **agendamentos**, **pagamentos**, **avaliações**, **chat**, **geolocalização**, **painel administrativo** e **conformidade com a LGPD**.

## Stack adotada

- **Frontend:** Next.js (App Router) + React + TailwindCSS
- **PWA:** `manifest.webmanifest` + `service-worker.js` + página offline
- **Backend alvo:** Supabase (PostgreSQL, Auth, Realtime, Storage, Edge Functions)
- **Pagamentos:** Stripe, Mercado Pago e Pix via funções serverless
- **Deploy alvo:** Vercel + Supabase

## O que esta base entrega

- Landing page responsiva do produto
- Rotas iniciais para:
  - `/agendamentos`
  - `/profissionais`
  - `/chat`
  - `/admin`
  - `/privacidade`
  - `/offline`
- Registro de service worker para suporte offline básico
- Manifest do PWA e ícone do aplicativo
- Cliente Supabase pronto para uso com variáveis públicas
- Estrutura inicial do Supabase:
  - `supabase/migrations/20260928000000_initial_schema.sql`
  - `supabase/functions/create-payment-session`
  - `supabase/functions/export-user-data`
  - `supabase/functions/delete-user-data`
  - `supabase/functions/send-appointment-notification`
- Documento visível de LGPD na rota `/privacidade`

## Banco de dados modelado

A migration inicial cobre as tabelas essenciais do domínio:

- `users`
- `cars`
- `services`
- `professional_profiles`
- `professional_availability`
- `appointments`
- `payments`
- `reviews`
- `messages`
- `notifications`
- `audit_logs`
- `consents`

Também inclui:

- tipos `enum` para estados críticos
- gatilhos de `updated_at`
- índices principais
- políticas iniciais de **Row Level Security (RLS)**

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Como rodar localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Scripts disponíveis

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Próximos passos naturais

1. Conectar autenticação real com Supabase Auth
2. Persistir catálogo, agenda e perfis profissionais no banco
3. Integrar gateways de pagamento reais nas Edge Functions
4. Ativar Realtime, push notifications e mapa de profissionais
5. Adicionar testes automatizados para fluxos críticos
6. Integrar observabilidade (Sentry/LogRocket) e CI/CD
