import React from 'react';
import { Logo } from './Logo';
import { DISPLAY_PHONE_NUMBER, getDirectWhatsAppContactUrl } from '../lib/whatsapp';
import { MessageCircle, Mail, MapPin, Layers, Heart } from 'lucide-react';

interface FooterProps {
  theme?: 'dark' | 'light';
}

export const Footer: React.FC<FooterProps> = ({ theme = 'dark' }) => {
  const isDark = theme === 'dark';

  return (
    <footer
      className={`border-t text-xs py-14 transition-colors duration-300 ${
        isDark ? 'bg-[#05070a] border-[#181f30] text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand info */}
          <div className="space-y-4">
            <Logo size="md" theme={theme} />
            <p className="leading-relaxed text-xs">
              Tienda y taller especializado en impresión 3D, insumos, modelos paramétricos y figuras de alta resolución.
              Convirtiendo ideas en piezas físicas de precisión capa por capa.
            </p>
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-mono text-[11px]">
              <Layers className="w-4 h-4" />
              <span>Tecnología FDM & Resina 8K</span>
            </div>
          </div>

          {/* Quick links matching the 6 menu items */}
          <div>
            <h4 className={`font-display font-bold text-sm mb-4 uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Navegación
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#productos" className="hover:text-cyan-500 transition-colors">
                  Productos
                </a>
              </li>
              <li>
                <a href="#caracteristicas" className="hover:text-cyan-500 transition-colors">
                  Características
                </a>
              </li>
              <li>
                <a href="#nosotros" className="hover:text-cyan-500 transition-colors">
                  Nosotros
                </a>
              </li>
              <li>
                <a href="#novedades" className="hover:text-cyan-500 transition-colors">
                  Novedades & STL Gratis
                </a>
              </li>
              <li>
                <a href="#opiniones" className="hover:text-cyan-500 transition-colors">
                  Opiniones de Clientes
                </a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-cyan-500 transition-colors">
                  Contacto & Pedidos
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & WhatsApp */}
          <div>
            <h4 className={`font-display font-bold text-sm mb-4 uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Contacto Directo
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={getDirectWhatsAppContactUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 font-medium"
                >
                  <MessageCircle className="w-4 h-4 shrink-0 fill-emerald-500/20" />
                  <span>Canal de WhatsApp Oficial</span>
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 shrink-0 text-cyan-500" />
                <span>San Pedro / Jujuy, Argentina (Envíos nacionales)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 shrink-0 text-cyan-500" />
                <span>contacto@universo3d.com</span>
              </li>
            </ul>
          </div>

          {/* Trust & Guarantee */}
          <div className="space-y-3">
            <h4 className={`font-display font-bold text-sm mb-4 uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Compromiso Maker
            </h4>
            <p className="text-xs leading-relaxed">
              Cada pieza pasa por calibración de tolerancias mecánicas y verificación de capas antes de su entrega.
            </p>
            <div className={`p-3 rounded-xl border text-[11px] ${
              isDark ? 'bg-[#0b0f19] border-[#1b2336] text-slate-300' : 'bg-white border-slate-200 text-slate-700'
            }`}>
              <span className="text-emerald-500 font-bold block mb-1">Pedidos por WhatsApp</span>
              Recibimos tu solicitud, te enviamos fotos del proceso de impresión y coordinamos el despacho rápido.
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className={`pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] ${
          isDark ? 'border-[#131928] text-slate-500' : 'border-slate-200 text-slate-500'
        }`}>
          <p>© 2026 Universo 3D. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            Hecho con precisión milimétrica y pasión maker
          </p>
        </div>
      </div>
    </footer>
  );
};
