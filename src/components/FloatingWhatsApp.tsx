import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { getDirectWhatsAppContactUrl, DISPLAY_PHONE_NUMBER } from '../lib/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-end gap-3">
      {/* Tooltip bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#0c111e] border border-emerald-500/30 text-white shadow-2xl animate-fade-in text-xs max-w-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-slate-300">
            ¿Dudas o pedidos? <strong className="text-emerald-400">Escribinos por WhatsApp</strong>
          </span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-500 hover:text-white p-0.5 cursor-pointer"
            aria-label="Cerrar tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Button */}
      <a
        href={getDirectWhatsAppContactUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-xl shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
        aria-label="Chat directo por WhatsApp"
      >
        <span className="absolute -inset-1 rounded-full bg-emerald-400/30 animate-ping pointer-events-none" />
        <MessageCircle className="w-7 h-7 fill-white text-emerald-500" />
      </a>
    </div>
  );
};
