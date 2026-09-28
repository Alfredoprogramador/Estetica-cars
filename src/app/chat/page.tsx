import { FeatureCard } from "@/components/feature-card";

const chatCapabilities = [
  "Mensagens de texto em tempo real com Supabase Realtime",
  "Suporte a imagens, anexos e fila offline para envio posterior",
  "Notificações push quando o profissional responde",
  "Histórico por appointment para manter contexto do serviço",
] as const;

export default function ChatPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-12">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Chat</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-950">Comunicação em tempo real entre cliente e profissional</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          A base do projeto já separa o domínio de mensagens por atendimento, com suporte a anexos,
          notificações e funcionamento resiliente em cenários offline-first.
        </p>
      </div>

      <FeatureCard
        eyebrow="Realtime"
        title="Capacidades planejadas para a conversa"
        description="O módulo foi estruturado para evoluir com Supabase Realtime, storage e push notifications."
      >
        <ul className="space-y-3 text-sm leading-6 text-slate-600">
          {chatCapabilities.map((item) => (
            <li key={item} className="rounded-2xl bg-slate-50 px-4 py-3">
              {item}
            </li>
          ))}
        </ul>
      </FeatureCard>
    </div>
  );
}
