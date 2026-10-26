import { ArrowLeft, Building2 } from 'lucide-react';

export default function Header({ companyId, onHome }) {
  const companyName = companyId === 'empire-bsb'
    ? 'Empire BSB'
    : companyId.split('-').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');

  return (
    <header className="sticky top-0 z-20 border-b border-neutral-800 bg-[#0a0a0a]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#f2d46e] via-[#d4af37] to-[#8d6e16] text-xl font-black text-black">E</span>
          <div>
            <p className="text-sm font-extrabold tracking-[0.18em] text-white">EMPIRE</p>
            <p className="text-[10px] uppercase tracking-[0.18em] text-neutral-500">Área de credenciamento</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs text-neutral-300 sm:inline-flex">
            <Building2 className="h-3.5 w-3.5 text-[#d4af37]" /> {companyName}
          </span>
          <button onClick={onHome} className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-neutral-400 transition hover:bg-white/5 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Página inicial
          </button>
        </div>
      </div>
    </header>
  );
}
