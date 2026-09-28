import { FeatureCard } from "@/components/feature-card";
import { lgpdRights } from "@/data/site-content";

const policyTopics = [
  {
    title: "Coleta mínima e consentimento",
    description: "O onboarding deve solicitar apenas nome, e-mail e telefone opcional, registrando consentimento versionado em `consents`.",
  },
  {
    title: "Segurança da informação",
    description: "O projeto prevê TLS em trânsito, proteção por RLS e tratamento especial para dados sensíveis como CPF/CNPJ e endereço.",
  },
  {
    title: "Direitos do titular",
    description: "Exportação, exclusão, revogação de consentimento e histórico de tratamento são tratados por Edge Functions e audit logs.",
  },
] as const;

export default function PrivacyPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-12">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">LGPD</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-950">Política de privacidade e direitos do titular</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          Esta base inclui documentação visível ao usuário e estrutura backend para consentimento,
          exportação, exclusão e auditoria de dados pessoais.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {policyTopics.map((topic) => (
          <FeatureCard key={topic.title} eyebrow="Política" title={topic.title} description={topic.description} />
        ))}
      </div>

      <FeatureCard
        eyebrow="Direitos"
        title="Como o usuário exerce seus direitos"
        description="Os fluxos abaixo devem ficar disponíveis no app e também documentados para atendimento manual quando necessário."
      >
        <ul className="space-y-3 text-sm leading-6 text-slate-600">
          {lgpdRights.map((item) => (
            <li key={item} className="rounded-2xl bg-slate-50 px-4 py-3">
              {item}
            </li>
          ))}
        </ul>
      </FeatureCard>
    </div>
  );
}
