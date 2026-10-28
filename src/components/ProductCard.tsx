import React, { useState } from 'react';
import { ShoppingCart, Eye, MessageCircle, Check, Star, Layers, ExternalLink } from 'lucide-react';
import { Product } from '../lib/supabase';
import { formatCurrency, getDirectWhatsAppContactUrl } from '../lib/whatsapp';

interface ProductCardProps {
  product: Product;
  quantityInCart: number;
  onAddToCart: (product: Product) => void;
  onOpenQuickView: (product: Product) => void;
  theme?: 'dark' | 'light';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  quantityInCart,
  onAddToCart,
  onOpenQuickView,
  theme = 'dark',
}) => {
  const [imgError, setImgError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  const directInquiryUrl = getDirectWhatsAppContactUrl(
    `¡Hola Universo 3D! 👋 Tengo una consulta sobre el producto "${product.name}" ($${product.price}). ¿Tienen disponibilidad o opciones de colores/materiales?`
  );

  const isDark = theme === 'dark';

  return (
    <div
      onClick={() => onOpenQuickView(product)}
      className={`group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer border ${
        isDark
          ? 'bg-[#0d111c] border-[#1d2538] hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-950/30'
          : 'bg-white border-slate-200 hover:border-cyan-400 hover:shadow-xl shadow-xs'
      }`}
    >
      {/* Top Image Container */}
      <div className={`relative aspect-[4/3] w-full overflow-hidden flex items-center justify-center ${isDark ? 'bg-[#090c14]' : 'bg-slate-100'}`}>
        {!imgError && product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-400 p-4">
            <Layers className="w-12 h-12 text-cyan-500/40 mb-2 stroke-[1.5]" />
            <span className="text-xs font-mono text-slate-500">Pieza 3D Universo</span>
          </div>
        )}

        {/* Subtle gradient overlay on image bottom */}
        <div className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-80 ${isDark ? 'from-[#0d111c]' : 'from-black/40'}`} />

        {/* Badge: category / material / featured */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {product.badge && (
            <span className="px-2.5 py-1 text-[11px] font-semibold rounded-md bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-sm">
              {product.badge}
            </span>
          )}
          {product.material && (
            <span className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-[#07090e]/85 backdrop-blur-md text-cyan-300 border border-cyan-500/20">
              {product.material}
            </span>
          )}
        </div>

        {/* Floating Quick View button on hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenQuickView(product);
          }}
          className="absolute top-3 right-3 p-2 rounded-xl bg-[#07090e]/80 hover:bg-cyan-500 text-slate-300 hover:text-black border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg cursor-pointer"
          title="Vista rápida"
          aria-label="Ver detalles"
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Category tag at bottom-left of image */}
        <div className="absolute bottom-2 left-3 text-[11px] font-medium text-slate-300 flex items-center gap-1.5 drop-shadow">
          <span>{product.category}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-5 pt-3">
        {/* Rating and Reviews */}
        <div className="flex items-center gap-1.5 text-xs text-amber-500 mb-1.5">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className={`font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
            {product.rating ?? 4.9}
          </span>
          <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>
            ({product.reviews_count ?? 18})
          </span>
          {product.stock && product.stock <= 5 && (
            <span className="ml-auto text-[10px] text-amber-500 font-medium">
              ¡Últimas {product.stock} un.!
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className={`font-display font-bold text-base transition-colors line-clamp-1 mb-1.5 ${
          isDark ? 'text-white group-hover:text-cyan-300' : 'text-slate-900 group-hover:text-cyan-600'
        }`}>
          {product.name}
        </h3>

        {/* Description snippet */}
        <p className={`text-xs line-clamp-2 leading-relaxed mb-4 flex-1 ${
          isDark ? 'text-slate-400' : 'text-slate-600'
        }`}>
          {product.description}
        </p>

        {/* Specs snippet */}
        {product.specs && (
          <div className={`text-[11px] font-mono mb-4 pb-3 border-b flex items-center gap-1.5 truncate ${
            isDark ? 'border-[#1b2234] text-slate-400' : 'border-slate-100 text-slate-500'
          }`}>
            <span className="text-cyan-500">✦</span>
            <span className="truncate">{product.specs}</span>
          </div>
        )}

        {/* Price & Action Row */}
        <div className="flex items-center justify-between gap-3 mt-auto pt-1">
          <div className="flex flex-col">
            <span className={`text-[10px] uppercase tracking-wider font-medium ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Precio
            </span>
            <span className={`text-xl font-bold font-display tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              {formatCurrency(product.price)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* WhatsApp direct product question */}
            <a
              href={directInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 transition-colors"
              title="Consultar este modelo por WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-emerald-500/20" />
            </a>

            {/* Add to Cart button */}
            <button
              onClick={handleAdd}
              className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all duration-200 cursor-pointer shadow-md ${
                justAdded
                  ? 'bg-emerald-600 text-white shadow-emerald-500/25'
                  : quantityInCart > 0
                  ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-500/20'
                  : 'bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-cyan-500/20'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>¡Añadido!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>{quantityInCart > 0 ? `En Carrito (${quantityInCart})` : 'Añadir'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* MercadoPago link option if provided in database */}
        {product.mercadopago_url && (
          <a
            href={product.mercadopago_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="mt-2.5 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-[#009ee3]/15 hover:bg-[#009ee3]/25 text-[#00a8ea] border border-[#009ee3]/30 text-[11px] font-semibold transition-colors"
          >
            <span>Pagar directo con Mercado Pago</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
};
