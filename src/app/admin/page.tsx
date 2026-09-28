import { FeatureCard } from "@/components/feature-card";
import { adminCapabilities } from "@/data/site-content";

export default function AdminPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-12">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Administração</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-950">Painel operacional e de governança</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          Este espaço centraliza as responsabilidades administrativas, desde gestão de marketplace até
          métricas, cupons e auditoria de consentimento.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {adminCapabilities.map((capability) => (
          <FeatureCard
            key={capability}
            eyebrow="Admin"
            title={capability}
            description="Estrutura preparada para conectores de dados, filtros e automações do painel."
          />
        ))}
      </div>
    </div>
  );
}
