import React, { useState } from 'react';
import { Layers, MessageCircle, Send, CheckCircle2, FileUp, Sparkles } from 'lucide-react';
import { getDirectWhatsAppContactUrl, DISPLAY_PHONE_NUMBER, STORE_PHONE_NUMBER } from '../lib/whatsapp';

export const CustomQuoteSection: React.FC = () => {
  const [material, setMaterial] = useState('PLA+ Premium');
  const [color, setColor] = useState('Negro Mate');
  const [quantity, setQuantity] = useState('1');
  const [notes, setNotes] = useState('');
  const [projectName, setProjectName] = useState('');

  const handleSendQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `🌌 *COTIZACIÓN DE IMPRESIÓN 3D PERSONALIZADA - UNIVERSO 3D* 🌌

🛠 *PROYECTO:* ${projectName.trim() || 'Pieza a medida / Archivo STL'}
📦 *Material solicitado:* ${material}
🎨 *Color preferido:* ${color}
🔢 *Cantidad:* ${quantity} unidad(es)
${notes.trim() ? `📝 *Detalles/Medidas:* ${notes.trim()}\n` : ''}
📎 *Nota:* Adjunto el archivo .STL / .OBJ / fotos a continuación.
¿Podrían indicarme presupuesto estimado y tiempo de impresión?`;

    const url = `https://wa.me/${STORE_PHONE_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="cotizacion" className="py-20 bg-[#090c14] border-t border-b border-[#1b2234] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0e1322] to-[#12192e] border border-[#232d44] rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left text */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Servicio de Fabricación a Medida</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
                ¿Tenés un archivo STL o una pieza personalizada?
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Cotizamos tus modelos 3D en el acto. Desde prototipos mecánicos y piezas de repuesto
                descatalogadas hasta figuras coleccionables y regalos corporativos.
              </p>

              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Cálculo exacto de gramos y horas de máquina sin sobrecostos</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Asesoramiento en orientación, soportes y tolerancias mecánicas</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Respuesta rápida y asesoramiento directo por WhatsApp</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Form */}
            <div className="lg:col-span-7 bg-[#0b0e17]/90 border border-[#1e273d] p-6 sm:p-8 rounded-2xl shadow-xl">
              <h3 className="text-lg font-bold font-display text-white mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5 text-cyan-400" />
                <span>Configurador de Cotización Rápida</span>
              </h3>

              <form onSubmit={handleSendQuote} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Nombre de la pieza o descripción del proyecto
                  </label>
                  <input
                    type="text"
                    required
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Ej: Engranaje para cafetera / Soporte de monitor / Figura anime"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141a29] border border-[#232c42] text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">
                      Material
                    </label>
                    <select
                      value={material}
                      onChange={(e) => setMaterial(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#141a29] border border-[#232c42] text-white text-xs focus:outline-none focus:border-cyan-500"
                    >
                      <option value="PLA+ Premium">PLA+ Premium (Estándar)</option>
                      <option value="PETG Resistente">PETG (Resistente & Calidad)</option>
                      <option value="Resina 8K Alta Definición">Resina 8K (Miniaturas)</option>
                      <option value="ABS Mecánico">ABS (Resiste calor)</option>
                      <option value="TPU Flexible">TPU Flexible (Goma elástica)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">
                      Color preferido
                    </label>
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      placeholder="Ej: Negro, Blanco, Rojo, Silk"
                      className="w-full px-3 py-2.5 rounded-xl bg-[#141a29] border border-[#232c42] text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">
                      Cantidad
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#141a29] border border-[#232c42] text-white text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Dimensiones aproximadas o notas técnicas (opcional)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ej: Mide aprox 15cm x 10cm. Necesito que soporte algo de fuerza..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141a29] border border-[#232c42] text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Enviar Cotización por WhatsApp</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
