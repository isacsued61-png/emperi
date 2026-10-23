import React, { useState } from 'react';
import { Plus, Trash2, Video, Image as ImageIcon, MessageSquare } from 'lucide-react';

export default function MediaManager({ media, onAddMedia, onDeleteMedia, activeUser }) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('image');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !url) return;

    onAddMedia({
      id: 'm_' + Date.now(),
      type,
      title,
      url,
      description,
      author: activeUser.name,
      date: new Date().toLocaleDateString('pt-BR')
    });

    setTitle('');
    setUrl('');
    setDescription('');
  };

  return (
    <div className="space-y-8">
      {/* PAINEL DE ADIÇÃO DE MÍDIA */}
      <div className="bg-[#111] p-6 rounded-2xl border border-neutral-800 gold-glow">
        <h3 className="text-lg font-bold text-[#D4AF37] mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5" /> Adicionar / Editar Mídia do Evento
        </h3>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-400 mb-1">Título da Foto / Vídeo</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Bastidores do Bar - Baile das Rosas"
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-[#D4AF37] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-400 mb-1">Tipo de Mídia</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-[#D4AF37] outline-none"
            >
              <option value="image">Imagem / Foto</option>
              <option value="video">Vídeo (MP4 / Webm)</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-neutral-400 mb-1">URL / Link da Imagem ou Vídeo</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://sua-imagem.com/foto.jpg ou link de arquivo"
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-[#D4AF37] outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-neutral-400 mb-1">Descrição e Texto do Bastidor</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              placeholder="Digite os textos e observações importantes sobre esta mídia..."
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-[#D4AF37] outline-none resize-none"
            />
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="gold-gradient-bg text-black font-extrabold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider hover:brightness-110 transition"
            >
              Salvar Mídia no Banco
            </button>
          </div>
        </form>
      </div>

      {/* GALERIA DE MÍDIAS */}
      <div>
        <h3 className="text-xl font-extrabold text-white mb-6">Galeria e Registros da Equipe</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {media.map((item) => (
            <div key={item.id} className="bg-[#111] border border-neutral-800 rounded-2xl overflow-hidden group hover:border-[#D4AF37]/50 transition">
              {/* REPRODUTOR DE MÍDIA */}
              <div className="relative aspect-video bg-black overflow-hidden flex items-center justify-center">
                {item.type === 'video' ? (
                  <video src={item.url} controls className="w-full h-full object-cover" />
                ) : (
                  <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                )}
                <span className="absolute top-3 left-3 bg-black/80 backdrop-blur px-2.5 py-1 rounded-full text-[10px] font-bold text-[#D4AF37] border border-[#D4AF37]/30 flex items-center gap-1">
                  {item.type === 'video' ? <Video className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                  {item.type.toUpperCase()}
                </span>
              </div>

              {/* CONTEÚDO E TEXTOS */}
              <div className="p-4 space-y-3">
                <h4 className="font-bold text-white text-base leading-snug">{item.title}</h4>
                <p className="text-xs text-neutral-400 flex items-start gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                  {item.description || 'Sem descrição cadastrada.'}
                </p>

                <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-500">
                  <span>Por: <strong className="text-neutral-300">{item.author}</strong></span>
                  <span>{item.date}</span>
                </div>

                <button
                  onClick={() => onDeleteMedia(item.id)}
                  className="w-full mt-2 py-1.5 bg-red-950/30 text-red-400 border border-red-900/40 rounded-lg text-xs font-semibold hover:bg-red-900/50 flex items-center justify-center gap-1 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Remover
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}