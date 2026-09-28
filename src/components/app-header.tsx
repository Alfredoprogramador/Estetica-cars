import Link from "next/link";

const navigation = [
  { href: "/", label: "Visão geral" },
  { href: "/agendamentos", label: "Agendamentos" },
  { href: "/profissionais", label: "Profissionais" },
  { href: "/chat", label: "Chat" },
  { href: "/admin", label: "Admin" },
  { href: "/privacidade", label: "LGPD" },
];

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="flex items-center gap-3 text-slate-950">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500 text-lg font-bold text-white">
            CC
          </span>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">
              CarClean Pro
            </p>
            <p className="text-sm text-slate-600">Marketplace PWA para estética automotiva</p>
          </div>
        </Link>
        <nav className="hidden flex-wrap items-center gap-2 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
