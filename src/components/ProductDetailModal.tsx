import React, { useState } from 'react';
import { X, ShoppingCart, MessageCircle, Star, Layers, ShieldCheck, Check, Sparkles, Truck } from 'lucide-react';
import { Product } from '../lib/supabase';
import { formatCurrency, getDirectWhatsAppContactUrl, DISPLAY_PHONE_NUMBER } from '../lib/whatsapp';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  theme?: 'dark' | 'light';
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  theme = 'dark',
}) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!isOpen || !product) return null;

  const isDark = theme === 'dark';

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  const whatsappInquiryUrl = getDirectWhatsAppContactUrl(
    `¡Hola Universo 3D! 👋 Tengo interés en el modelo "${product.name}" ($${product.price}). ¿Me pueden brindar más información sobre tiempos de impresión o personalización?`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog */}
      <div
        className={`relative w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row border ${
          isDark
            ? 'bg-[#0c101a] border-[#1f273b]'
            : 'bg-white border-slate-200'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-3 right-3 p-2 rounded-xl transition-colors z-20 cursor-pointer ${
            isDark
              ? 'bg-[#07090e]/80 hover:bg-[#1a2133] text-slate-400 hover:text-white'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-black'
          }`}
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className={`md:w-1/2 relative flex items-center justify-center min-h-[260px] md:min-h-full ${isDark ? 'bg-[#07090e]' : 'bg-slate-100'}`}>
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover max-h-[380px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent via-transparent to-black/20" />

          {product.badge && (
            <span className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold rounded-md bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md">
              {product.badge}
            </span>
          )}
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <span className="text-cyan-500 font-semibold">{product.category}</span>
              <span>·</span>
              <span className="flex items-center gap-1 text-amber-500">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {product.rating ?? 4.9}
              </span>
            </div>

            <h2 className={`text-xl font-bold font-display tracking-tight mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {product.name}
            </h2>

            <p className={`text-xs leading-relaxed mb-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {product.description}
            </p>

            {/* Technical Specs Box */}
            <div className={`rounded-xl p-3.5 space-y-2 text-xs mb-4 border ${
              isDark ? 'bg-[#101524] border-[#1b2336]' : 'bg-slate-50 border-slate-200'
            }`}>
              <p className="text-[11px] font-mono text-cyan-500 font-semibold uppercase tracking-wider">
                Especificaciones 3D
              </p>
              {product.material && (
                <div className="flex justify-between">
                  <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Material:</span>
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-slate-800'}`}>{product.material}</span>
                </div>
              )}
              {product.specs && (
                <div className="flex justify-between">
                  <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Parámetros:</span>
                  <span className="font-mono text-cyan-600 dark:text-cyan-300">{product.specs}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Taller / Fabricación:</span>
                <span className={`font-medium ${isDark ? 'text-white' : 'text-slate-800'}`}>Universo 3D</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-4">
              <span className={`text-2xl font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {formatCurrency(product.price)}
              </span>
              <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Precio final</span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Cantidad:</span>
              <div className={`flex items-center rounded-lg border ${
                isDark ? 'bg-[#141928] border-[#222b40]' : 'bg-slate-100 border-slate-300'
              }`}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className={`px-3 py-1 cursor-pointer ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-black'}`}
                >
                  -
                </button>
                <span className={`px-3 py-1 text-xs font-mono font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className={`px-3 py-1 cursor-pointer ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-black'}`}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={`space-y-2 pt-2 border-t ${isDark ? 'border-[#1a2133]' : 'border-slate-200'}`}>
            <button
              onClick={handleAdd}
              className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
                added
                  ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                  : 'bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-cyan-500/25'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>¡Añadido al carrito con éxito!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  <span>Añadir {quantity} al Carrito ({formatCurrency(product.price * quantity)})</span>
                </>
              )}
            </button>

            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-emerald-500/20" />
              <span>Consultar este producto por WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
