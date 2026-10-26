import { useState } from 'react';
import { ArrowDown, ArrowRight, BadgeCheck, Building2, ChevronRight, Lock, QrCode, Users } from 'lucide-react';

const workflow = [
  {
    number: '01',
    title: 'Cada empresa tem seu link',
    description: 'O código da organização leva a equipe diretamente para a área de credenciamento correspondente.',
    icon: Building2,
  },
  {
    number: '02',
    title: 'A equipe preenche o cadastro',
    description: 'Os dados e a foto são reunidos em um fluxo simples, pensado para funcionários e gestores.',
    icon: Users,
  },
  {
    number: '03',
    title: 'A credencial ganha forma',
    description: 'A evolução prevista inclui crachás com QR Code para abrir o perfil autorizado de cada profissional.',
    icon: QrCode,
  },
];

export default function LandingPage({ onEnterCompany }) {
  const [companyCode, setCompanyCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const code = companyCode.trim().toLowerCase();
    if (!code) {
      setError('Informe o código recebido da sua empresa.');
      return;
    }
    if (!/^[a-z0-9-]{2,64}$/.test(code)) {
      setError('Use apenas letras, números e hífen no código da empresa.');
      return;
    }
    setError('');
    onEnterCompany(code);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#080808] text-white">
      <header className="relative z-10 border-b border-white/[0.08]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-5 lg:px-8">
          <a href="#inicio" className="flex items-center gap-3" aria-label="Credenciamento Empire, início">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#f2d46e] via-[#d4af37] to-[#8d6e16] text-xl font-black text-black">E</span>
            <span>
              <span className="block text-sm font-extrabold tracking-[0.18em]">EMPIRE</span>
              <span className="block text-[10px] uppercase tracking-[0.22em] text-neutral-500">Credenciamento</span>
            </span>
          </a>
          <nav aria-label="Navegação principal" className="hidden items-center gap-7 text-sm text-neutral-400 md:flex">
            <a href="#como-funciona" className="transition hover:text-white">Como funciona</a>
            <a href="#para-empresas" className="transition hover:text-white">Para empresas</a>
            <a href="https://empirebsb.vercel.app/" target="_blank" rel="noreferrer" className="transition hover:text-white">Site da Empire <ChevronRight className="ml-1 inline h-3.5 w-3.5" /></a>
          </nav>
          <a href="#acesso" className="rounded-lg border border-[#d4af37]/50 px-4 py-2.5 text-xs font-bold text-[#f0d579] transition hover:bg-[#d4af37]/10">
            Acessar minha empresa
          </a>
        </div>
      </header>

      <section id="inicio" className="relative isolate">
        <div aria-hidden="true" className="pointer-events-none absolute -right-48 -top-40 -z-10 h-[36rem] w-[36rem] rounded-full bg-[#d4af37]/[0.08] blur-[110px]" />
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-32">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/25 bg-[#d4af37]/[0.07] px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#ead27d]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" /> Desenvolvido a partir da operação Empire
            </div>
            <h1 className="max-w-3xl text-4xl font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-[4.25rem]">
              Sua equipe organizada desde o <span className="gold-gradient-text">primeiro cadastro.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-neutral-400 sm:text-lg sm:leading-8">
              Um espaço de credenciamento para empresas que trabalham com equipes, eventos e operações em campo. Cada organização começa pelo seu próprio link.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#acesso" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#f0d579] via-[#d4af37] to-[#a9821e] px-5 py-3.5 text-sm font-extrabold text-black transition hover:brightness-110">
                Acessar área da empresa <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#como-funciona" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3.5 text-sm font-semibold text-neutral-200 transition hover:border-white/25">
                Conhecer o fluxo <ArrowDown className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-5 text-xs text-neutral-600">A Empire BSB é a primeira operação apresentada nesta plataforma.</p>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div aria-hidden="true" className="absolute inset-8 rounded-[2rem] bg-[#d4af37]/10 blur-3xl" />
            <div className="relative rounded-[1.75rem] border border-white/10 bg-[#101010] p-5 shadow-2xl shadow-black/50 sm:p-7">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d4af37]/10 text-[#e4c55c]"><Building2 className="h-5 w-5" /></span>
                  <div>
                    <p className="text-xs text-neutral-500">Área da organização</p>
                    <p className="mt-0.5 font-bold">Empire BSB</p>
                  </div>
                </div>
                <span className="rounded-full border border-emerald-900/70 bg-emerald-950/40 px-2.5 py-1 text-[10px] font-semibold text-emerald-300">CREDENCIAMENTO</span>
              </div>
              <div className="py-7">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500">Um fluxo claro para a equipe</p>
                <div className="mt-5 space-y-3">
                  {['Dados do profissional', 'Foto para identificação', 'Credencial da equipe'].map((label, index) => (
                    <div key={label} className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] p-3.5">
                      <span className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold ${index === 0 ? 'bg-[#d4af37]/15 text-[#e4c55c]' : 'bg-white/[0.05] text-neutral-500'}`}>{`0${index + 1}`}</span>
                      <span className="flex-1 text-sm text-neutral-200">{label}</span>
                      {index < 2 && <BadgeCheck className="h-4 w-4 text-neutral-600" />}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 border-t border-white/[0.08] pt-4 text-xs text-neutral-500">
                <Lock className="h-3.5 w-3.5 text-[#d4af37]" />
                <span>Ambiente da empresa identificado pelo link</span>
              </div>
              <div className="pointer-events-none absolute -bottom-4 -right-3 hidden rounded-xl border border-[#d4af37]/20 bg-[#17150e] px-4 py-3 shadow-xl sm:block">
                <p className="text-[10px] uppercase tracking-widest text-neutral-500">Próxima etapa</p>
                <p className="mt-1 flex items-center gap-2 text-xs font-semibold text-[#ead27d]"><QrCode className="h-4 w-4" /> Crachás com QR Code</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="border-y border-white/[0.07] bg-[#0d0d0d]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:py-24 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d4af37]">Um caminho simples</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Do link da empresa à credencial.</h2>
            <p className="mt-4 text-sm leading-6 text-neutral-400">O credenciamento começa com a identificação da organização e evolui junto com as necessidades da operação.</p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {workflow.map(({ number, title, description, icon: Icon }) => (
              <article key={number} className="rounded-2xl border border-white/[0.08] bg-[#111] p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-widest text-[#d4af37]">{number}</span>
                  <Icon className="h-5 w-5 text-neutral-500" />
                </div>
                <h3 className="mt-8 text-lg font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-400">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="para-empresas" className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:px-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d4af37]">Para cada operação</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Uma empresa por vez. Cada equipe no seu espaço.</h2>
          <p className="mt-4 text-sm leading-6 text-neutral-400">A plataforma está sendo preparada para atender a Empire e outras empresas, com uma entrada própria para cada organização.</p>
          <a href="https://wa.me/5561982387738?text=Ol%C3%A1%2C%20quero%20conhecer%20a%20plataforma%20de%20credenciamento%20para%20minha%20empresa." target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#ead27d] transition hover:text-white">
            Tenho interesse para minha empresa <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div id="acesso" className="rounded-2xl border border-[#d4af37]/20 bg-gradient-to-br from-[#17150e] to-[#101010] p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#d4af37]/10 text-[#e4c55c]"><Lock className="h-5 w-5" /></span>
            <div>
              <h3 className="text-lg font-bold">Já recebeu o link da sua empresa?</h3>
              <p className="mt-1 text-sm leading-6 text-neutral-400">Digite o código da organização para abrir a área de credenciamento.</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <label htmlFor="company-code" className="sr-only">Código da empresa</label>
            <input id="company-code" value={companyCode} onChange={(event) => setCompanyCode(event.target.value)} autoComplete="organization" placeholder="Ex.: empire-bsb" className="credential-input min-w-0 flex-1" />
            <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#d4af37] px-5 py-3 text-sm font-extrabold text-black transition hover:brightness-110">
              Continuar <ArrowRight className="h-4 w-4" />
            </button>
          </form>
          {error && <p role="alert" className="mt-3 text-sm text-red-300">{error}</p>}
          <p className="mt-4 text-xs leading-5 text-neutral-600">O acesso e a separação efetiva dos cadastros serão protegidos pelo backend da plataforma.</p>
        </div>
      </section>

      <footer className="border-t border-white/[0.07] bg-[#0d0d0d]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-7 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <span>© {new Date().getFullYear()} Empire · Credenciamento de equipes</span>
          <a href="https://empirebsb.vercel.app/" target="_blank" rel="noreferrer" className="transition hover:text-[#ead27d]">Conheça o site da Empire <ChevronRight className="ml-1 inline h-3.5 w-3.5" /></a>
        </div>
      </footer>
    </main>
  );
}
