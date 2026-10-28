import React from 'react';
import { ArrowRight, MessageCircle, ShieldCheck, Zap, Layers, Sparkles } from 'lucide-react';
import { getDirectWhatsAppContactUrl, DISPLAY_PHONE_NUMBER } from '../lib/whatsapp';
import heroImage from '../assets/images/universo_3d_hero_1793140899131.jpg';

interface HeroProps {
  onExploreCatalog: () => void;
  theme: 'dark' | 'light';
}

export const Hero: React.FC<HeroProps> = ({ onExploreCatalog, theme }) => {
  return (
    <section
      id="inicio"
      className={`relative min-h-[660px] lg:min-h-[760px] flex items-center overflow-hidden transition-colors duration-300 ${
        theme === 'dark' ? 'bg-[#07090e]' : 'bg-slate-900 text-white'
      }`}
    >
      {/* 
        IMAGE SPANNING THE ENTIRE RIGHT SIDE (COSTADO DERECHO) with shading that darkens towards the left
      */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[56%] overflow-hidden z-0">
        <img
          src={heroImage}
          alt="Impresora 3D Universo 3D trabajando con filamento de alta precisión"
          className="w-full h-full object-cover object-center scale-[1.03] transition-transform duration-1000 hover:scale-105"
          loading="eager"
        />

        {/* 
          Sombreado que se oscurece progresivamente hacia la izquierda para resaltar el texto con máximo contraste
        */}
        <div
          className={`absolute inset-0 bg-gradient-to-l from-black/20 via-[#07090e]/75 to-[#07090e] pointer-events-none ${
            theme === 'light' ? 'lg:to-slate-900' : 'lg:to-[#07090e]'
          }`}
        />
        {/* Sombra vertical inferior para fundir con la siguiente sección */}
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#07090e] via-[#07090e]/60 to-transparent pointer-events-none" />
        {/* Sombra superior para la barra de navegación */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#07090e]/90 to-transparent pointer-events-none" />

        {/* Floating telemetry badge positioned over the 3D printer image on the right */}
        <div className="hidden sm:flex absolute bottom-8 right-8 z-10 bg-[#07090e]/85 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-3.5 items-center gap-3 shadow-2xl">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white tracking-wide">Impresión Activa</span>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-800/40">FDM 0.05mm</span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono mt-0.5">
              Extrusor: 215°C · Cama: 60°C · Velocidad: 250mm/s
            </p>
          </div>
        </div>
      </div>

      {/* Hero Content: Placed on the LEFT side with high contrast over the darkened shading */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-28 lg:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Hero Typography, Badges & CTAs with deep contrast */}
          <div className="lg:col-span-7 relative z-20">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-6 shadow-lg backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Taller de Impresión 3D & Insumos</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight text-white leading-[1.12] mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
              Tus ideas cobran vida en el{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 drop-shadow-[0_2px_14px_rgba(34,211,238,0.4)]">
                Universo 3D
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed mb-8 max-w-xl font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              Figuras articuladas de colección, decoración geométrica moderna, prototipos mecánicos y bobinas de filamento.
              Impresión con precisión milimétrica y atención directa por WhatsApp con presupuestos al instante.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <button
                onClick={onExploreCatalog}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-sm transition-all shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 active:scale-[0.98] cursor-pointer"
              >
                <span>Ver Productos</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={getDirectWhatsAppContactUrl('¡Hola Universo 3D! 👋 Quiero consultar sobre modelos 3D disponibles y pedidos personalizados.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-500/40 hover:border-emerald-400 font-semibold text-sm transition-all shadow-lg shadow-black/40 active:scale-[0.98] backdrop-blur-sm"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                <span>Consultar por WhatsApp</span>
              </a>
            </div>

            {/* Key Value Points */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 backdrop-blur-xs">
              <div>
                <p className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight drop-shadow">0.05mm</p>
                <p className="text-xs text-slate-300 mt-0.5">Resolución ultra fina</p>
              </div>
              <div>
                <p className="font-display text-2xl sm:text-3xl font-bold text-cyan-400 tracking-tight drop-shadow">+1.500</p>
                <p className="text-xs text-slate-300 mt-0.5">Piezas entregadas</p>
              </div>
              <div>
                <p className="font-display text-2xl sm:text-3xl font-bold text-indigo-400 tracking-tight drop-shadow">24-48h</p>
                <p className="text-xs text-slate-300 mt-0.5">Despacho express</p>
              </div>
            </div>

          </div>

          {/* Right spacer on desktop so the image and its telemetry stay visible */}
          <div className="hidden lg:block lg:col-span-5" />

        </div>
      </div>
    </section>
  );
};
