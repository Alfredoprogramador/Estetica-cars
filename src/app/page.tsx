import Link from "next/link";
import { FeatureCard } from "@/components/feature-card";
import { InstallPrompt } from "@/components/install-prompt";
import {
  appConfig,
  architectureLayers,
  customerJourney,
  lgpdRights,
  professionals,
  professionalJourney,
  services,
  trustPillars,
} from "@/data/site-content";

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-12">
      <section className="grid gap-8 rounded-[2rem] bg-slate-950 px-8 py-12 text-white shadow-2xl shadow-slate-900/20 lg:grid-cols-[1.3fr_0.7fr] lg:px-12">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-300">
            Progressive Web App pronto para evoluir
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight md:text-5xl">
            {appConfig.name}: agendamentos, pagamentos, avaliações e operação completa de estética automotiva.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Base inicial pensada para conectar clientes, profissionais e administradores
            com foco em performance, segurança, compliance LGPD e experiência instalável.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/agendamentos"
              className="rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
            >
              Explorar fluxo de agendamento
            </Link>
            <Link
              href="/privacidade"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Ver política LGPD
            </Link>
          </div>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold">Módulos entregues nesta base</h2>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-300">
            <li>• Landing responsiva com foco em marketplace</li>
            <li>• Estrutura PWA com manifest e service worker</li>
            <li>• Páginas para operações, admin, chat e privacidade</li>
            <li>• Schema Supabase com RLS e funções Edge iniciais</li>
            <li>• Integração pronta para SDK do Supabase</li>
          </ul>
        </div>
      </section>

      <InstallPrompt />

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {trustPillars.map((pillar) => (
          <FeatureCard
            key={pillar.title}
            eyebrow="Pilar"
            title={pillar.title}
            description={pillar.description}
          />
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <FeatureCard
          eyebrow="Catálogo"
          title="Serviços configuráveis e escaláveis"
          description="O projeto nasce preparado para serviços avulsos, assinaturas, deslocamento automático e políticas de cancelamento."
        >
          <div className="grid gap-4">
            {services.map((service) => (
              <div key={service.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-semibold text-slate-950">{service.name}</h3>
                  <p className="text-sm font-medium text-emerald-700">{service.price}</p>
                </div>
                <p className="mt-2 text-sm text-slate-600">{service.description}</p>
                <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                  Duração média: {service.duration}
                </p>
              </div>
            ))}
          </div>
        </FeatureCard>
        <FeatureCard
          eyebrow="Marketplace"
          title="Profissionais com reputação, geolocalização e SLA"
          description="A homepage já explicita disponibilidade, badges, reputação e tempo estimado de chegada para o fluxo de escolha."
        >
          <div className="grid gap-4">
            {professionals.map((professional) => (
              <div key={professional.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-semibold text-slate-950">{professional.name}</h3>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                    {professional.badge}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-600">Avaliação média: {professional.rating}</p>
                <p className="mt-1 text-sm text-slate-600">Cobertura: {professional.area}</p>
                <p className="mt-1 text-sm text-slate-600">{professional.eta}</p>
              </div>
            ))}
          </div>
        </FeatureCard>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {architectureLayers.map((layer) => (
          <FeatureCard
            key={layer.title}
            eyebrow="Arquitetura"
            title={layer.title}
            description={layer.description}
          />
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <FeatureCard
          eyebrow="Cliente"
          title="Fluxo pensado para conversão e retenção"
          description="Do onboarding ao pós-serviço, a experiência inclui consentimento, pagamento, chat, fotos e reputação."
        >
          <ol className="space-y-3 pl-5 text-sm leading-6 text-slate-600">
            {customerJourney.map((step) => (
              <li key={step} className="list-decimal">
                {step}
              </li>
            ))}
          </ol>
        </FeatureCard>
        <FeatureCard
          eyebrow="Profissional"
          title="Operação otimizada para agenda e recorrência"
          description="A base contempla gestão de disponibilidade, cálculo de deslocamento, recebíveis e badges."
        >
          <ol className="space-y-3 pl-5 text-sm leading-6 text-slate-600">
            {professionalJourney.map((step) => (
              <li key={step} className="list-decimal">
                {step}
              </li>
            ))}
          </ol>
        </FeatureCard>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <FeatureCard
          eyebrow="Compliance"
          title="Privacidade, consentimento e auditoria"
          description="O app já apresenta a base de direitos LGPD, exportação/exclusão de dados e rastreabilidade em audit logs."
        >
          <ul className="space-y-3 text-sm leading-6 text-slate-600">
            {lgpdRights.map((item) => (
              <li key={item} className="rounded-2xl bg-slate-50 px-4 py-3">
                {item}
              </li>
            ))}
          </ul>
        </FeatureCard>
        <FeatureCard
          eyebrow="Acesso rápido"
          title="Rotas base prontas para evolução"
          description="As páginas abaixo organizam os domínios principais e servem como ponto de partida para integrações reais."
        >
          <div className="grid gap-3 text-sm font-medium text-slate-700">
            {[
              { href: "/agendamentos", label: "Agendamentos & pagamentos" },
              { href: "/profissionais", label: "Mapa e disponibilidade" },
              { href: "/chat", label: "Chat em tempo real" },
              { href: "/admin", label: "Painel administrativo" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-slate-200 px-4 py-3 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-900"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </FeatureCard>
      </section>
    </div>
  );
}
