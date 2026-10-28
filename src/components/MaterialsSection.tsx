import React from 'react';
import { Layers, ShieldCheck, Flame, Droplets, Sparkles, Cpu } from 'lucide-react';

export const MaterialsSection: React.FC = () => {
  const materials = [
    {
      name: 'PLA+ Grado Virgen',
      tag: 'Más popular',
      desc: 'Biodegradable a base de maíz. Máxima precisión dimensional, acabado impecable y gran variedad de colores mate y seda.',
      temp: 'Hasta 60°C',
      ideal: 'Decoración, figuras, prototipos visuales y juguetes articulados.',
      color: 'from-cyan-500/20 to-sky-500/10',
      border: 'border-cyan-500/30'
    },
    {
      name: 'PETG Industrial',
      tag: 'Alta Resistencia',
      desc: 'Combinación perfecta de facilidad de impresión y resistencia al impacto. Impermeable, apto intemperie y rayos UV.',
      temp: 'Hasta 80°C',
      ideal: 'Soportes mecánicos, macetas, piezas funcionales y carcasas.',
      color: 'from-indigo-500/20 to-purple-500/10',
      border: 'border-indigo-500/30'
    },
    {
      name: 'Resina Fotopolímero 8K',
      tag: 'Ultra Detalle',
      desc: 'Polimerización UV con capas invisibles de hasta 0.02mm. Suavidad superficial comparable a inyección de plástico.',
      temp: 'Hasta 65°C',
      ideal: 'Miniaturas para juegos de rol, joyería, dentales y bustos de colección.',
      color: 'from-amber-500/20 to-orange-500/10',
      border: 'border-amber-500/30'
    },
    {
      name: 'TPU Flexible (95A)',
      tag: 'Elastómero',
      desc: 'Filamento con memoria elástica de alta flexión. Resistente a la abrasión, impactos severos, grasas y aceites.',
      temp: 'Hasta 90°C',
      ideal: 'Fundas para celular, sellos herméticos, topes anti-vibración y ruedas.',
      color: 'from-emerald-500/20 to-teal-500/10',
      border: 'border-emerald-500/30'
    }
  ];

  return (
    <section id="materiales" className="py-20 bg-[#07090e] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs uppercase font-mono font-semibold tracking-widest text-cyan-400 mb-2">
            Tecnología de Materiales
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
            Filamentos y Resinas de Última Generación
          </h2>
          <p className="text-sm text-slate-400 mt-3">
            Seleccionamos materias primas de la más alta pureza con calibración láser de diámetro en Universo 3D.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {materials.map((m) => (
            <div
              key={m.name}
              className={`p-6 rounded-2xl bg-[#0c101a] border ${m.border} hover:scale-[1.02] transition-transform duration-300 flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono text-cyan-300 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40">
                    {m.tag}
                  </span>
                  <Layers className="w-4 h-4 text-slate-400" />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-2">
                  {m.name}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {m.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-[#1a2133] space-y-1.5 text-[11px]">
                <div className="flex justify-between text-slate-400">
                  <span>Resistencia térmica:</span>
                  <span className="text-slate-200 font-mono">{m.temp}</span>
                </div>
                <div className="text-slate-400">
                  <span className="text-cyan-400 font-medium">Ideal para: </span>
                  <span className="text-slate-300">{m.ideal}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
