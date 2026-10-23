import React from 'react';
import { Phone, Users, Image, CheckSquare } from 'lucide-react';

export default function Header({ activeTab, setActiveTab }) {
  return (
    <header className="border-b border-neutral-800 bg-[#0A0A0A]/90 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        
        {/* LOGO EMPIRE */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg gold-gradient-bg flex items-center justify-center font-black text-black text-xl shadow-md">
            E
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-wider gold-gradient-text">EMPIRE</h1>
            <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold">Equipes para Eventos</p>
          </div>
        </div>

        {/* NAVEGAÇÃO PRINCIPAL */}
        <nav className="flex items-center gap-1 bg-neutral-900/80 p-1 rounded-xl border border-neutral-800">
          <button
            onClick={() => setActiveTab('tasks')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition ${activeTab === 'tasks' ? 'gold-gradient-bg text-black font-bold' : 'text-neutral-400 hover:text-white'}`}
          >
            <CheckSquare className="w-4 h-4" /> Gestão de Tarefas
          </button>
          
          <button
            onClick={() => setActiveTab('media')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition ${activeTab === 'media' ? 'gold-gradient-bg text-black font-bold' : 'text-neutral-400 hover:text-white'}`}
          >
            <Image className="w-4 h-4" /> Banco de Fotos & Vídeos
          </button>
        </nav>

        {/* BOTÃO CONTATO */}
        <a 
          href="https://wa.me/5561982387738" 
          target="_blank" 
          rel="noreferrer"
          className="hidden sm:flex items-center gap-2 border border-[#D4AF37]/50 text-[#D4AF37] px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#D4AF37] hover:text-black transition"
        >
          <Phone className="w-3.5 h-3.5" /> Vamos Conversar
        </a>

      </div>
    </header>
  );
}