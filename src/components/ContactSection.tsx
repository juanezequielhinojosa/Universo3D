import React, { useState } from 'react';
import {
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send,
  Layers,
  Sparkles,
  PhoneCall,
  CheckCircle2,
} from 'lucide-react';
import {
  DISPLAY_PHONE_NUMBER,
  STORE_PHONE_NUMBER,
  getDirectWhatsAppContactUrl,
} from '../lib/whatsapp';

interface ContactSectionProps {
  theme: 'dark' | 'light';
}

export const ContactSection: React.FC<ContactSectionProps> = ({ theme }) => {
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('Pedido Personalizado / Archivo STL');
  const [message, setMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const formatted = `🌌 *MENSAJE DE CONTACTO - UNIVERSO 3D* 🌌

👤 *Nombre:* ${name.trim() || 'Cliente Universo 3D'}
📌 *Motivo:* ${topic}
💬 *Mensaje:* ${message.trim() || 'Hola, me gustaría contactarme para hacer una consulta.'}

_Enviado desde el formulario web de Universo 3D_`;

    const url = `https://wa.me/${STORE_PHONE_NUMBER}?text=${encodeURIComponent(formatted)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="contacto"
      className={`py-20 border-t transition-colors duration-300 ${
        theme === 'dark' ? 'bg-[#090c14] border-[#1b2234]' : 'bg-slate-50 border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs uppercase font-mono font-semibold tracking-widest text-cyan-500 mb-2">
            Canales de Atención
          </p>
          <h2
            className={`text-3xl sm:text-4xl font-bold font-display tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}
          >
            Contactanos en Universo 3D
          </h2>
          <p
            className={`text-sm mt-3 ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Estamos para responder dudas sobre modelos, cotizaciones a medida y envíos en el acto.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Info cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* WhatsApp highlight card */}
            <div
              className={`p-6 rounded-2xl border transition-all ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-[#0c1524] to-[#0e1c2e] border-emerald-500/30'
                  : 'bg-emerald-50 border-emerald-300'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-500 border border-emerald-500/30">
                  <MessageCircle className="w-6 h-6 fill-emerald-500/20" />
                </div>
                <div>
                  <h4
                    className={`font-display font-bold text-base ${
                      theme === 'dark' ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    Atención por WhatsApp
                  </h4>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                    Atención Inmediata
                  </p>
                </div>
              </div>

              <p
                className={`text-xs leading-relaxed mb-4 ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                Es nuestro canal principal. Podés enviarnos tus fotos, archivos STL o consultar
                el estado de tu compra al instante.
              </p>

              <a
                href={getDirectWhatsAppContactUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/30 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Abrir Chat de WhatsApp</span>
              </a>
            </div>

            {/* Other details */}
            <div
              className={`p-6 rounded-2xl border space-y-4 text-xs ${
                theme === 'dark'
                  ? 'bg-[#0c101a] border-[#1e2638] text-slate-300'
                  : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                <div>
                  <strong className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>
                    Taller & Punto de Retiro:
                  </strong>
                  <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>
                    San Pedro / Jujuy, Argentina. Coordinamos retiros y realizamos envíos a todo el territorio nacional.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                <div>
                  <strong className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>
                    Horarios de Atención:
                  </strong>
                  <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>
                    Lunes a Sábados: 09:00 a 20:00 hs. (Mensajes recibidos 24/7).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                <div>
                  <strong className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>
                    Correo Electrónico:
                  </strong>
                  <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>
                    contacto@universo3d.com
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Direct interactive WhatsApp form */}
          <div
            className={`lg:col-span-7 p-6 sm:p-8 rounded-2xl border shadow-xl transition-all ${
              theme === 'dark'
                ? 'bg-[#0d121f] border-[#1e273a]'
                : 'bg-white border-slate-200'
            }`}
          >
            <h3
              className={`font-display font-bold text-xl mb-1 ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}
            >
              Envianos un Mensaje Directo
            </h3>
            <p
              className={`text-xs mb-6 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              Completá los datos y te redirigiremos a WhatsApp con tu consulta lista para enviar.
            </p>

            <form onSubmit={handleSendMessage} className="space-y-4 text-xs">
              <div>
                <label
                  className={`block font-medium mb-1.5 ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  Tu Nombre o Apodo
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej: Marcos Pérez"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-cyan-500 ${
                    theme === 'dark'
                      ? 'bg-[#131929] border-[#222c42] text-white placeholder:text-slate-500'
                      : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400'
                  }`}
                />
              </div>

              <div>
                <label
                  className={`block font-medium mb-1.5 ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  Motivo de la consulta
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-cyan-500 ${
                    theme === 'dark'
                      ? 'bg-[#131929] border-[#222c42] text-white'
                      : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                >
                  <option value="Pedido Personalizado / Archivo STL">
                    Impresión de Archivo STL a medida
                  </option>
                  <option value="Consulta sobre Productos en Catálogo">
                    Consulta sobre productos en catálogo
                  </option>
                  <option value="Insumos y Filamentos">
                    Insumos, bobinas de filamento y repuestos
                  </option>
                  <option value="Pedidos Mayoristas / Eventos">
                    Pedidos mayoristas / Souvenirs corporativos
                  </option>
                  <option value="Asesoramiento Técnico General">
                    Asesoramiento técnico general
                  </option>
                </select>
              </div>

              <div>
                <label
                  className={`block font-medium mb-1.5 ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  Detalle del mensaje o características de la pieza
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Escribí aquí lo que necesitás (color, medidas aproximadas, tipo de uso, etc.)..."
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-cyan-500 resize-none ${
                    theme === 'dark'
                      ? 'bg-[#131929] border-[#222c42] text-white placeholder:text-slate-500'
                      : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400'
                  }`}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Enviar Consulta por WhatsApp</span>
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};
