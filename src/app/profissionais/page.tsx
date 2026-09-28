import { FeatureCard } from "@/components/feature-card";
import { professionals } from "@/data/site-content";

export default function ProfessionalsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-12">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Profissionais</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-950">Disponibilidade, reputação e área de cobertura</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          Camada inicial de marketplace com perfis profissionais, badges, distância de atendimento
          e dados preparados para integração com mapa e agenda real.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {professionals.map((professional) => (
          <FeatureCard
            key={professional.name}
            eyebrow={professional.badge}
            title={professional.name}
            description={`${professional.rating} • ${professional.area} • ${professional.eta}`}
          />
        ))}
      </div>
    </div>
  );
}
