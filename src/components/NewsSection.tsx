import React, { useState } from 'react';
import { Sparkles, Download, Play, Check, ArrowRight, ExternalLink } from 'lucide-react';
import { getDirectWhatsAppContactUrl, DISPLAY_PHONE_NUMBER } from '../lib/whatsapp';

interface NewsSectionProps {
  theme: 'dark' | 'light';
}

export const NewsSection: React.FC<NewsSectionProps> = ({ theme }) => {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const isDark = theme === 'dark';

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 5000);
    }, 1200);
  };

  const newsCards = [
    {
      tag: 'Nuevo Filamento',
      title: 'Llegó la Serie Silk Tricolor Camaleón',
      date: 'Octubre 2026',
      desc: 'Extrusión simultánea de tres tonos metálicos (Oro, Púrpura y Cian) que cambian según el ángulo de luz.',
      actionText: 'Consultar stock',
      actionUrl: getDirectWhatsAppContactUrl('¡Hola! Quiero consultar disponibilidad del nuevo filamento Silk Tricolor.')
    },
    {
      tag: 'Lanzamiento STL',
      title: 'Colección Criaturas Articuladas V2',
      date: 'Nuevo Drop',
      desc: 'Nuevos modelos con tolerancias optimizadas para imprimir sin soportes y con bisagras ultra resistentes.',
      actionText: 'Ver detalles',
      actionUrl: getDirectWhatsAppContactUrl('¡Hola! Me interesan los nuevos modelos de criaturas articuladas V2.')
    },
    {
      tag: 'Taller & Servicios',
      title: 'Servicio de Escaneo 3D de Repuestos',
      date: 'Disponible',
      desc: 'Digitalizamos piezas físicas desgastadas para reconstruirlas y reimprimirlas en PETG de alta durabilidad.',
      actionText: 'Cotizar escaneo',
      actionUrl: getDirectWhatsAppContactUrl('¡Hola! Quisiera cotizar el servicio de escaneo e impresión de un repuesto.')
    }
  ];

  return (
    <section
      id="novedades"
      className={`py-20 border-t transition-colors duration-300 ${
        isDark ? 'bg-[#090c14] border-[#1b2234]' : 'bg-slate-50 border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs uppercase font-mono font-semibold tracking-widest text-cyan-500 mb-2">
            Últimos Lanzamientos & Videos
          </p>
          <h2
            className={`text-3xl sm:text-4xl font-bold font-display tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Novedades del Universo 3D
          </h2>
          <p
            className={`text-sm mt-3 ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Mirá nuestro contenido en video, nuevos modelos articulados y recursos gratuitos para la comunidad.
          </p>
        </div>

        {/* 
          FEATURED YOUTUBE VIDEO SECTION
          URL: https://www.youtube.com/watch?v=3UITi160m30
        */}
        <div
          className={`mb-14 p-6 sm:p-8 rounded-3xl border relative overflow-hidden transition-all shadow-2xl ${
            isDark
              ? 'bg-gradient-to-br from-[#0c111e] via-[#0e1526] to-[#121b30] border-cyan-500/30 shadow-cyan-950/20'
              : 'bg-white border-slate-200 shadow-xl'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Video Embed */}
            <div className="lg:col-span-7">
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-[#232d44] shadow-2xl bg-black">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube-nocookie.com/embed/3UITi160m30"
                  title="Universo 3D - Video de Novedades e Impresión 3D"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Right: Video Information & CTAs */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-semibold uppercase tracking-wider">
                <Play className="w-3.5 h-3.5 fill-rose-500" />
                <span>Video Oficial en YouTube</span>
              </div>

              <h3
                className={`text-2xl font-bold font-display tracking-tight leading-tight ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                Conocé lo nuevo en impresión 3D y tecnología maker
              </h3>

              <p
                className={`text-xs leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                Te mostramos el funcionamiento de nuestras máquinas en acción, consejos de calibración,
                nuevos acabados con filamentos especiales y el proceso detrás de cada figura y pieza técnica.
              </p>

              <div
                className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                  isDark ? 'bg-[#090d16] border-[#1b2336]' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Resolución mostrada:</span>
                  <span className="font-mono text-cyan-500 font-semibold">1080p Full HD</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Canal & Comunidad:</span>
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Universo 3D</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="https://www.youtube.com/watch?v=3UITi160m30"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition-colors shadow-md shadow-rose-600/30"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Ver en YouTube</span>
                </a>

                <a
                  href={getDirectWhatsAppContactUrl('¡Hola Universo 3D! Vi su video de YouTube y quiero consultar por impresiones.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-colors ${
                    isDark
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                  }`}
                >
                  <span>Consultar por WhatsApp</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Free STL Starter Pack Download Banner */}
        <div
          className={`mb-12 p-8 rounded-3xl border relative overflow-hidden transition-all shadow-xl ${
            isDark
              ? 'bg-gradient-to-r from-cyan-950/40 via-[#0e1424] to-indigo-950/40 border-cyan-500/30'
              : 'bg-gradient-to-r from-cyan-50 via-white to-indigo-50 border-cyan-200'
          }`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30 uppercase tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                Descarga Gratuita del Mes
              </span>
              <h3 className={`text-2xl font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Pack Inicial Maker: 10 Modelos STL + Guía de Slicing
              </h3>
              <p className={`text-xs max-w-xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Archivos probados y calibrados para Ender, Bambu Lab, Prusa y Artillery.
                Incluye perfiles de impresión recomendados para PLA y PETG.
              </p>
            </div>

            <div className="flex flex-col items-center shrink-0">
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/30 active:scale-95 transition-all cursor-pointer"
              >
                {downloading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Preparando archivos...</span>
                  </>
                ) : downloaded ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>¡Descarga Iniciada! 📦</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Descargar Pack STL Gratis</span>
                  </>
                )}
              </button>
              {downloaded && (
                <span className="text-[11px] text-emerald-500 mt-2 font-medium animate-fade-in">
                  ✓ Pack enviado. Si no inicia automáticamente, pedilo por nuestro WhatsApp.
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 3 News Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsCards.map((n, i) => (
            <div
              key={i}
              className={`p-6 rounded-2xl border flex flex-col justify-between transition-all hover:-translate-y-1 ${
                isDark
                  ? 'bg-[#0d111c] border-[#1e2638] hover:border-cyan-500/40'
                  : 'bg-white border-slate-200 hover:border-cyan-400 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs text-cyan-500 font-mono mb-3">
                  <span className="font-semibold">{n.tag}</span>
                  <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>{n.date}</span>
                </div>
                <h4 className={`text-base font-bold font-display mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {n.title}
                </h4>
                <p className={`text-xs leading-relaxed mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {n.desc}
                </p>
              </div>

              <a
                href={n.actionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-500 hover:text-cyan-400 pt-3 border-t border-slate-200 dark:border-[#1b2234]"
              >
                <span>{n.actionText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
