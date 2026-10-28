import React from 'react';
import { Star, MessageCircle, CheckCircle2, Quote } from 'lucide-react';
import { DISPLAY_PHONE_NUMBER } from '../lib/whatsapp';

interface TestimonialsSectionProps {
  theme: 'dark' | 'light';
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ theme }) => {
  const testimonials = [
    {
      quote:
        'La calidad del Dragón Articulado es increíble. Cada articulación encaja perfecta y el acabado seda brilla con la luz. La atención por WhatsApp fue súper rápida.',
      author: 'Laura G.',
      role: 'Coleccionista · San Salvador de Jujuy',
      product: 'Dragón Articulado Imperial',
      rating: 5,
    },
    {
      quote:
        'Encargué la lámpara de litofanía personalizada con una foto familiar para el cumpleaños de mi pareja. Quedó espectacular, se nota la dedicación en cada capa.',
      author: 'Mario R.',
      role: 'Cliente verificado · Salta',
      product: 'Lámpara Lunar LED',
      rating: 5,
    },
    {
      quote:
        'Como aficionado que imprime todos los días, agradezco encontrar filamento que no se enrede y con tolerancia dimensional precisa de ±0.02mm. 100% recomendado.',
      author: 'Elena P.',
      role: 'Maker 3D · Córdoba',
      product: 'Filamento PLA+ 1kg',
      rating: 5,
    },
    {
      quote:
        'Me diseñaron e imprimieron un engranaje para una máquina que ya no tiene repuestos. Salvó el equipo y funciona hace meses sin desgaste.',
      author: 'Carlos M.',
      role: 'Técnico Mecánico · Jujuy',
      product: 'Pieza Técnica a Medida (PETG)',
      rating: 5,
    },
  ];

  return (
    <section
      id="opiniones"
      className={`py-20 border-t transition-colors duration-300 ${
        theme === 'dark' ? 'bg-[#07090e] border-[#182030]' : 'bg-white border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs uppercase font-mono font-semibold tracking-widest text-cyan-500 mb-2">
            Opiniones Reales
          </p>
          <h2
            className={`text-3xl sm:text-4xl font-bold font-display tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}
          >
            Lo que Dicen Nuestros Clientes
          </h2>
          <p
            className={`text-sm mt-3 ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Makers, diseñadores y coleccionistas que confían en las piezas de Universo 3D.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                theme === 'dark'
                  ? 'bg-[#0c101a] border-[#1e2538] hover:border-cyan-500/40'
                  : 'bg-slate-50 border-slate-200 hover:border-cyan-400 shadow-xs'
              }`}
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p
                  className={`text-xs italic leading-relaxed mb-4 ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  "{t.quote}"
                </p>
              </div>

              {/* Author footer */}
              <div
                className={`pt-4 border-t ${
                  theme === 'dark' ? 'border-[#1b2234]' : 'border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-display font-bold text-xs ${
                      theme === 'dark' ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {t.author}
                  </span>
                  <span className="text-[10px] text-emerald-500 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Verificado
                  </span>
                </div>
                <p
                  className={`text-[11px] mt-0.5 ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  {t.role}
                </p>
                <p className="text-[10px] text-cyan-500 font-mono mt-1">
                  Pedido: {t.product}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom review CTA */}
        <div
          className={`mt-12 p-6 rounded-2xl border text-center max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 ${
            theme === 'dark'
              ? 'bg-[#0f1422] border-[#222c42]'
              : 'bg-cyan-50 border-cyan-200'
          }`}
        >
          <div className="text-left">
            <h4
              className={`font-display font-bold text-sm ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}
            >
              ¿Ya recibiste tu pedido de Universo 3D?
            </h4>
            <p
              className={`text-xs mt-0.5 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              Envíanos una foto de tu pieza a nuestro WhatsApp y la compartimos en nuestras redes.
            </p>
          </div>
          <span className="text-xs font-bold text-amber-400 shrink-0 font-mono">
            ★ 4.9 de 5.0
          </span>
        </div>

      </div>
    </section>
  );
};
