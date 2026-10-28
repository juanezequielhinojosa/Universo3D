import React from 'react';
import { Layers, ShieldCheck, Heart, Sparkles, MapPin, Award, CheckCircle } from 'lucide-react';
import { DISPLAY_PHONE_NUMBER, getDirectWhatsAppContactUrl } from '../lib/whatsapp';

interface AboutSectionProps {
  theme: 'dark' | 'light';
}

export const AboutSection: React.FC<AboutSectionProps> = ({ theme }) => {
  return (
    <section
      id="nosotros"
      className={`py-20 border-t transition-colors duration-300 ${
        theme === 'dark' ? 'bg-[#07090e] border-[#182030]' : 'bg-white border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Conocé Universo 3D</span>
            </div>

            <h2
              className={`text-3xl sm:text-4xl font-bold font-display tracking-tight leading-tight ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}
            >
              Pasión por el detalle, la ingeniería y el universo maker
            </h2>

            <p
              className={`text-sm leading-relaxed ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              En <strong>Universo 3D</strong> nacimos con una misión clara: convertir modelos digitales
              y archivos STL en piezas tangibles de la más alta resistencia y belleza estética.
              Contamos con un taller equipado con granja de impresoras FDM de alta velocidad (CoreXY)
              y estaciones de resina UV 8K para miniaturas y prototipos técnicos.
            </p>

            <p
              className={`text-sm leading-relaxed ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              Desde San Pedro, Jujuy, abastecemos a aficionados, empresas y coleccionistas de todo el país.
              Cada pedido se verifica manualmente: analizamos adherencia de capas, peso, tolerancias y acabado
              antes de coordinar la entrega o envío.
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'Control de calidad por microscopio en boquillas',
                'Filamentos vírgenes sellados al vacío con desecante',
                'Atención directa de maker a cliente por WhatsApp',
                'Garantía de reimpresión si la pieza tiene fallas',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-xs">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <a
                href={getDirectWhatsAppContactUrl('¡Hola! Me gustaría conocer más sobre su taller de impresión Universo 3D.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-500 hover:text-cyan-400 underline underline-offset-4"
              >
                <span>Escribinos a nuestro WhatsApp Oficial →</span>
              </a>
            </div>
          </div>

          {/* Right Visual Stats Card */}
          <div className="lg:col-span-5">
            <div
              className={`p-8 rounded-3xl border relative overflow-hidden shadow-xl ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-[#0e1322] to-[#12192d] border-[#222c42]'
                  : 'bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono font-semibold text-cyan-500 uppercase tracking-wider">
                  Métricas del Taller
                </span>
                <Award className="w-5 h-5 text-amber-400" />
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <span className={`text-2xl font-bold font-display ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      +1.500 piezas
                    </span>
                    <span className="text-xs text-emerald-500 font-semibold font-mono">100% Calidad</span>
                  </div>
                  <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                    Figuras articuladas, piezas funcionales y engranajes entregados.
                  </p>
                </div>

                <div className={`pt-4 border-t ${theme === 'dark' ? 'border-[#1e273a]' : 'border-slate-200'}`}>
                  <div className="flex justify-between items-baseline mb-1">
                    <span className={`text-2xl font-bold font-display ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      12 Impresoras
                    </span>
                    <span className="text-xs text-cyan-400 font-semibold font-mono">CoreXY + Resina 8K</span>
                  </div>
                  <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                    Capacidad productiva en paralelo para entregas sin demoras.
                  </p>
                </div>

                <div className={`pt-4 border-t ${theme === 'dark' ? 'border-[#1e273a]' : 'border-slate-200'}`}>
                  <div className="flex justify-between items-baseline mb-1">
                    <span className={`text-2xl font-bold font-display ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      4.9 / 5.0 ★
                    </span>
                    <span className="text-xs text-amber-400 font-semibold font-mono">+120 Reseñas</span>
                  </div>
                  <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                    Satisfacción verificada en envíos y atención personalizada.
                  </p>
                </div>
              </div>

              <div className={`mt-6 pt-5 border-t flex items-center gap-2 text-xs ${
                theme === 'dark' ? 'border-[#1e273a] text-slate-400' : 'border-slate-200 text-slate-600'
              }`}>
                <MapPin className="w-4 h-4 text-cyan-500 shrink-0" />
                <span>Taller físico en Jujuy con envíos a todo el país</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
