import Link from "next/link";

export function AppFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 py-10 md:grid-cols-3">
        <div>
          <h2 className="text-lg font-semibold">CarClean Pro</h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Base inicial pronta para evolução com Supabase, pagamentos online,
            notificações, LGPD e operação em múltiplos papéis.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Operação</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            <li>Clientes, profissionais e administradores</li>
            <li>Agendamentos, pagamentos e reputação</li>
            <li>Observabilidade, auditoria e cache offline</li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Políticas</h2>
          <div className="mt-3 flex flex-col gap-2 text-sm text-slate-400">
            <Link href="/privacidade" className="hover:text-white">
              Política de privacidade e direitos LGPD
            </Link>
            <a
              href="https://supabase.com/docs"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              Documentação Supabase
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
