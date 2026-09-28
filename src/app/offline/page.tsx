import Link from "next/link";

export default function OfflinePage() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-start justify-center gap-6 px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Modo offline</p>
      <h1 className="text-4xl font-semibold text-slate-950">Você está sem conexão no momento.</h1>
      <p className="text-lg leading-8 text-slate-600">
        O CarClean Pro mantém páginas essenciais em cache para consulta de serviços, perfil e histórico.
        Quando a conexão voltar, as ações pendentes poderão ser sincronizadas.
      </p>
      <Link
        href="/"
        className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        Voltar para a home
      </Link>
    </div>
  );
}
