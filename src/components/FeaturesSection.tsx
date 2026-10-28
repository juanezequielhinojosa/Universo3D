import React from 'react';
import { Cpu, Leaf, Truck, Wrench, ShieldCheck, Zap } from 'lucide-react';

interface FeaturesSectionProps {
  theme: 'dark' | 'light';
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ theme }) => {
  const features = [
    {
      icon: <Cpu className="w-6 h-6 text-cyan-400" />,
      title: 'Alta Precisión Milimétrica',
      desc: 'Resolución de capa desde 0.05mm en tecnología FDM y hasta 0.02mm en Resina 8K para detalles ultra definidos sin estrías visibles.',
      highlight: 'Calibración láser de boquilla'
    },
    {
      icon: <Leaf className="w-6 h-6 text-emerald-400" />,
      title: 'Materiales Ecológicos & Certificados',
      desc: 'Filamentos PLA de origen vegetal biodegradable y resinas de baja toxicidad. Respetuosos con el ambiente y seguros para interiores.',
      highlight: '100% Reciclables y no tóxicos'
    },
    {
      icon: <Truck className="w-6 h-6 text-indigo-400" />,
      title: 'Despacho Rápido 24-48h',
      desc: 'Stock permanente de insumos y piezas populares para despacho inmediato. Embalaje protegido anti-impacto para piezas delicadas.',
      highlight: 'Seguimiento en tiempo real'
    },
    {
      icon: <Wrench className="w-6 h-6 text-amber-400" />,
      title: 'Diseño e Impresión a Medida',
      desc: '¿Tenés una idea, un archivo STL o un repuesto roto que no se consigue? Diseñamos y adaptamos piezas con tolerancias mecánicas exactas.',
      highlight: 'Asesoramiento técnico gratuito'
    }
  ];

  return (
    <section
      id="caracteristicas"
      className={`py-20 border-t transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-[#090c14] border-[#1b2234]'
          : 'bg-slate-100/70 border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs uppercase font-mono font-semibold tracking-widest text-cyan-500 mb-2">
            Por Qué Elegir Universo 3D
          </p>
          <h2
            className={`text-3xl sm:text-4xl font-bold font-display tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}
          >
            Precisión que se Puede Tocar
          </h2>
          <p
            className={`text-sm mt-3 ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Combinamos tecnología de impresión de vanguardia con pasión artesanal en cada capa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                theme === 'dark'
                  ? 'bg-[#0d111c] border-[#1e2638] hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-950/20'
                  : 'bg-white border-slate-200 hover:border-cyan-400 hover:shadow-lg shadow-sm'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                  theme === 'dark' ? 'bg-[#141a28] border border-[#222c42]' : 'bg-slate-50 border border-slate-200'
                }`}
              >
                {f.icon}
              </div>

              <h3
                className={`font-display font-bold text-lg mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}
              >
                {f.title}
              </h3>

              <p
                className={`text-xs leading-relaxed mb-4 ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                {f.desc}
              </p>

              <div
                className={`pt-3 border-t text-[11px] font-mono font-medium flex items-center gap-1.5 ${
                  theme === 'dark'
                    ? 'border-[#1b2234] text-cyan-400'
                    : 'border-slate-100 text-cyan-700'
                }`}
              >
                <span>✦</span>
                <span>{f.highlight}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
