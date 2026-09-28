import { FeatureCard } from "@/components/feature-card";

const bookingSteps = [
  {
    title: "Seleção do serviço",
    description: "Cliente escolhe serviço, veículo e local do atendimento com geolocalização.",
  },
  {
    title: "Match com profissional",
    description: "Consulta disponibilidade, raio de atendimento, avaliação e tempo estimado de chegada.",
  },
  {
    title: "Pagamento antecipado",
    description: "Fluxo preparado para Stripe, Mercado Pago e Pix com split de pagamento e comprovante.",
  },
  {
    title: "Execução e pós-serviço",
    description: "Atualização de status, notificações push/e-mail, fotos antes/depois e avaliação final.",
  },
] as const;

export default function BookingsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-12">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Agendamentos</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-950">Fluxo operacional do atendimento</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          Estrutura inicial do domínio de agendamento com disponibilidade, regras de cancelamento,
          pagamento antecipado e notificações para cliente e profissional.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {bookingSteps.map((step, index) => (
          <FeatureCard
            key={step.title}
            eyebrow={`Etapa ${index + 1}`}
            title={step.title}
            description={step.description}
          />
        ))}
      </div>
    </div>
  );
}
