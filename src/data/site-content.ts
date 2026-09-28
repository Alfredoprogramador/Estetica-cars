export const appConfig = {
  name: "CarClean Pro",
  description:
    "PWA para agendamentos, pagamentos, avaliações e gestão operacional de limpeza automotiva com foco em performance, segurança e LGPD.",
};

export const services = [
  {
    name: "Lavagem completa",
    duration: "90 min",
    price: "R$ 89",
    description: "Lavagem externa, aspiração interna, painel e acabamento premium.",
  },
  {
    name: "Higienização interna",
    duration: "120 min",
    price: "R$ 149",
    description: "Limpeza profunda de bancos, teto, carpetes e remoção de odores.",
  },
  {
    name: "Plano recorrente",
    duration: "Semanal ou mensal",
    price: "A partir de R$ 249",
    description: "Assinaturas com cashback, prioridade de agenda e preço reduzido.",
  },
] as const;

export const professionals = [
  {
    name: "Equipe Brilho Express",
    badge: "Top Cleaner",
    rating: "4.9/5",
    area: "Raio de 15 km",
    eta: "Chegada média em 22 min",
  },
  {
    name: "Detailing Prime",
    badge: "Verificado",
    rating: "4.8/5",
    area: "Raio de 25 km",
    eta: "Chegada média em 35 min",
  },
  {
    name: "Wash & Go",
    badge: "Online agora",
    rating: "4.7/5",
    area: "Raio de 10 km",
    eta: "Chegada média em 18 min",
  },
] as const;

export const trustPillars = [
  {
    title: "Agendamento inteligente",
    description: "Busca de disponibilidade, reagendamento, cancelamento com regras e visualização offline do histórico.",
  },
  {
    title: "Pagamentos integrados",
    description: "Preparado para Stripe, Mercado Pago e Pix via Edge Functions com suporte a split e reembolso.",
  },
  {
    title: "LGPD by design",
    description: "Consentimento explícito, exportação/anonimização de dados e trilha de auditoria dedicada.",
  },
  {
    title: "Operação em tempo real",
    description: "Chat, notificações push, mapa de profissionais ativos e monitoramento centralizado.",
  },
] as const;

export const customerJourney = [
  "Crie sua conta com consentimento LGPD e dados mínimos.",
  "Cadastre o veículo, escolha um serviço e encontre profissionais no raio desejado.",
  "Confirme o agendamento, pague online e acompanhe notificações em tempo real.",
  "Converse no chat, aprove o serviço com fotos antes/depois e deixe sua avaliação.",
] as const;

export const professionalJourney = [
  "Configure bio, raio de atendimento, agenda semanal e serviços disponíveis.",
  "Receba novas solicitações com cálculo de deslocamento e aceite no painel do profissional.",
  "Atualize status do atendimento, compartilhe imagens e receba o repasse do marketplace.",
  "Acompanhe avaliações, ganhos, badge Top Cleaner e previsões de demanda.",
] as const;

export const adminCapabilities = [
  "Aprovação de profissionais e gestão de usuários",
  "Métricas operacionais, receita e reputação",
  "Gestão de serviços, cupons e assinaturas",
  "Consulta de logs LGPD e auditoria de consentimento",
  "Monitoramento de notificações, disputas e reembolsos",
] as const;

export const lgpdRights = [
  "Baixar dados pessoais em formato exportável",
  "Solicitar exclusão com anonimização do que não é obrigação legal",
  "Revogar consentimento e visualizar histórico de tratamento",
  "Entender finalidades da coleta e retenção por meio da política de privacidade",
] as const;

export const architectureLayers = [
  {
    title: "Frontend PWA",
    description: "Next.js App Router, TailwindCSS, componentes acessíveis, manifest, service worker e suporte offline.",
  },
  {
    title: "Backend Supabase",
    description: "PostgreSQL, Auth, Storage, Realtime, Edge Functions, políticas RLS e RPCs seguras.",
  },
  {
    title: "Integrações externas",
    description: "Gateways de pagamento, Google Maps, push notifications, Sentry e CDN de imagens.",
  },
] as const;
