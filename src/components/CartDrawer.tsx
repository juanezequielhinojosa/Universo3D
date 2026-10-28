import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  Copy,
  Check,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
} from 'lucide-react';
import {
  CartItem,
  OrderCustomerInfo,
  formatCurrency,
  getWhatsAppOrderUrl,
  generateWhatsAppOrderMessage,
  DISPLAY_PHONE_NUMBER,
  STORE_PHONE_NUMBER,
} from '../lib/whatsapp';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string | number, qty: number) => void;
  onRemoveItem: (id: string | number) => void;
  onClearCart: () => void;
  theme?: 'dark' | 'light';
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  theme = 'dark',
}) => {
  const [customer, setCustomer] = useState<OrderCustomerInfo>({
    name: '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: 'Transferencia Bancaria',
    notes: '',
  });

  const [copied, setCopied] = useState(false);
  const [orderSent, setOrderSent] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  const isDark = theme === 'dark';
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  const handleSendWhatsAppOrder = () => {
    if (items.length === 0) return;

    // Generate WhatsApp URL and open
    const url = getWhatsAppOrderUrl(items, customer, totalAmount, STORE_PHONE_NUMBER);
    window.open(url, '_blank', 'noopener,noreferrer');
    setOrderSent(true);
  };

  const handleCopyOrderText = () => {
    const text = generateWhatsAppOrderMessage(items, customer, totalAmount);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div
          className={`w-screen max-w-md border-l shadow-2xl flex flex-col transition-colors duration-300 ${
            isDark ? 'bg-[#0b0e17] border-[#1f273b] text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          {/* Header */}
          <div
            className={`p-5 border-b flex items-center justify-between ${
              isDark ? 'bg-[#0e121d] border-[#1b2234]' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className={`font-display font-bold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Tu Carrito 3D
                </h2>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {totalCount} {totalCount === 1 ? 'artículo seleccionado' : 'artículos seleccionados'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isDark
                  ? 'bg-[#141926] hover:bg-[#1f2638] border-transparent text-slate-400 hover:text-white'
                  : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-600 hover:text-black'
              }`}
              aria-label="Cerrar carrito"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content / Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="py-16 text-center flex flex-col items-center">
                <div
                  className={`w-16 h-16 rounded-full border flex items-center justify-center mb-4 ${
                    isDark ? 'bg-[#131826] border-[#20293d] text-slate-500' : 'bg-slate-100 border-slate-300 text-slate-400'
                  }`}
                >
                  <ShoppingBag className="w-8 h-8 stroke-1" />
                </div>
                <h3 className={`font-display font-semibold text-base mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Tu carrito está vacío
                </h3>
                <p className={`text-xs max-w-xs mb-6 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Explora las figuras articuladas, filamentos y piezas de Universo 3D y añade tus favoritas.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-500 border border-cyan-500/30 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Explorar Productos
                </button>
              </div>
            ) : orderSent ? (
              /* Success screen when WhatsApp was opened */
              <div className="py-8 text-center flex flex-col items-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-500 animate-pulse">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <div>
                  <h3 className={`font-display font-bold text-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    ¡Pedido iniciado por WhatsApp!
                  </h3>
                  <p className={`text-xs mt-2 max-w-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    Se abrió la conversación de WhatsApp con el detalle completo de tus {totalCount} productos.
                  </p>
                </div>

                <div
                  className={`w-full border rounded-xl p-4 text-left text-xs space-y-2 ${
                    isDark ? 'bg-[#101522] border-[#1e273a]' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Total del pedido:</span>
                    <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{formatCurrency(totalAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Canal de Pedidos:</span>
                    <span className="font-semibold text-cyan-500">WhatsApp Oficial</span>
                  </div>
                </div>

                <div className="w-full space-y-2 pt-2">
                  <button
                    onClick={handleSendWhatsAppOrder}
                    className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Reabrir WhatsApp</span>
                  </button>

                  <button
                    onClick={handleCopyOrderText}
                    className={`w-full py-2.5 px-4 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 cursor-pointer ${
                      isDark
                        ? 'bg-[#141a29] hover:bg-[#1a2236] border-[#232d42] text-slate-300'
                        : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
                    }`}
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? '¡Copiado al portapapeles!' : 'Copiar texto del pedido'}</span>
                  </button>

                  <button
                    onClick={() => {
                      onClearCart();
                      setOrderSent(false);
                      onClose();
                    }}
                    className={`w-full py-2 text-xs transition-colors cursor-pointer ${
                      isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    Vaciar carrito y cerrar
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* List of items */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3 rounded-xl border flex items-center gap-3 ${
                        isDark ? 'bg-[#0e1320] border-[#1b2336]' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      {item.image_url && (
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-14 h-14 rounded-lg object-cover bg-slate-100 border border-slate-300 dark:border-[#1e2538] shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className={`text-xs font-bold font-display truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {item.name}
                        </h4>
                        {item.material && (
                          <p className="text-[10px] text-cyan-500 font-mono truncate">{item.material}</p>
                        )}
                        <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                          {formatCurrency(item.price)}
                        </p>
                      </div>

                      {/* Quantity Buttons */}
                      <div className={`flex items-center gap-1.5 border rounded-lg p-1 ${
                        isDark ? 'bg-[#141a28] border-[#222c42]' : 'bg-white border-slate-300'
                      }`}>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors cursor-pointer"
                          aria-label="Disminuir cantidad"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className={`text-xs font-mono font-bold min-w-4 text-center ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors cursor-pointer"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-2 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                        title="Eliminar del carrito"
                        aria-label="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Optional Customer Information Accordion */}
                <div className="pt-2">
                  <button
                    onClick={() => setShowCheckoutForm(!showCheckoutForm)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                      isDark ? 'bg-[#101524] border-[#1f283e] text-slate-300 hover:text-white' : 'bg-slate-100 border-slate-300 text-slate-700 hover:text-slate-900'
                    }`}
                  >
                    <span>
                      {showCheckoutForm
                        ? '▾ Ocultar datos de entrega (Opcional)'
                        : '▸ Agregar tus datos de entrega y pago (Opcional)'}
                    </span>
                    <span className="text-[10px] font-mono text-cyan-500 font-bold">
                      {customer.name ? 'Completado ✓' : 'Rápido'}
                    </span>
                  </button>

                  {showCheckoutForm && (
                    <div className={`mt-3 p-4 rounded-xl border space-y-3 text-xs ${
                      isDark ? 'bg-[#0d121f] border-[#1d263b]' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div>
                        <label className={`block text-[11px] font-medium mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                          Nombre y Apellido
                        </label>
                        <input
                          type="text"
                          value={customer.name}
                          onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                          placeholder="Ej: Laura Gómez"
                          className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none focus:border-cyan-500 ${
                            isDark ? 'bg-[#141928] border-[#222b40] text-white placeholder:text-slate-500' : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400'
                          }`}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className={`block text-[11px] font-medium mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                            WhatsApp / Teléfono
                          </label>
                          <input
                            type="text"
                            value={customer.phone}
                            onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                            placeholder="Ej: 3888-123456"
                            className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none focus:border-cyan-500 ${
                              isDark ? 'bg-[#141928] border-[#222b40] text-white placeholder:text-slate-500' : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400'
                            }`}
                          />
                        </div>
                        <div>
                          <label className={`block text-[11px] font-medium mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                            Ciudad / Localidad
                          </label>
                          <input
                            type="text"
                            value={customer.city}
                            onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                            placeholder="Ej: San Pedro / Jujuy"
                            className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none focus:border-cyan-500 ${
                              isDark ? 'bg-[#141928] border-[#222b40] text-white placeholder:text-slate-500' : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400'
                            }`}
                          />
                        </div>
                      </div>

                      <div>
                        <label className={`block text-[11px] font-medium mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                          Dirección de Entrega
                        </label>
                        <input
                          type="text"
                          value={customer.address}
                          onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                          placeholder="Calle, número o 'Retiro por taller'"
                          className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none focus:border-cyan-500 ${
                            isDark ? 'bg-[#141928] border-[#222b40] text-white placeholder:text-slate-500' : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400'
                          }`}
                        />
                      </div>

                      <div>
                        <label className={`block text-[11px] font-medium mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                          Forma de Pago preferida
                        </label>
                        <select
                          value={customer.paymentMethod}
                          onChange={(e: any) => setCustomer({ ...customer, paymentMethod: e.target.value })}
                          className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none focus:border-cyan-500 ${
                            isDark ? 'bg-[#141928] border-[#222b40] text-white' : 'bg-white border-slate-300 text-slate-900'
                          }`}
                        >
                          <option value="Transferencia Bancaria">Transferencia Bancaria (10% OFF)</option>
                          <option value="Mercado Pago">Mercado Pago (Link / QR)</option>
                          <option value="Efectivo / Contraentrega">Efectivo contra entrega</option>
                          <option value="A convenir">A convenir por WhatsApp</option>
                        </select>
                      </div>

                      <div>
                        <label className={`block text-[11px] font-medium mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                          Notas / Aclaraciones de Impresión
                        </label>
                        <textarea
                          rows={2}
                          value={customer.notes}
                          onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                          placeholder="Color preferido, escala, fecha límite, etc."
                          className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none focus:border-cyan-500 resize-none ${
                            isDark ? 'bg-[#141928] border-[#222b40] text-white placeholder:text-slate-500' : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400'
                          }`}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Trust info */}
                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 px-1">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-cyan-500" />
                    Envíos y retiros a coordinar
                  </span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    Atención personalizada
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Footer / Checkout Button */}
          {items.length > 0 && !orderSent && (
            <div
              className={`p-5 border-t space-y-3 ${
                isDark ? 'border-[#1b2234] bg-[#0c101a]' : 'border-slate-200 bg-slate-50'
              }`}
            >
              <div className="space-y-1.5 text-xs">
                <div className={`flex justify-between ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  <span>Subtotal ({totalCount} productos):</span>
                  <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>{formatCurrency(totalAmount)}</span>
                </div>
                <div className={`flex justify-between ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  <span>Envío:</span>
                  <span className="text-cyan-600 dark:text-cyan-400 font-medium">A coordinar por WhatsApp</span>
                </div>
                <div className={`flex justify-between text-base font-bold pt-2 border-t ${
                  isDark ? 'border-[#1b2234] text-white' : 'border-slate-200 text-slate-900'
                }`}>
                  <span>Total estimado:</span>
                  <span className="text-xl font-display text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(totalAmount)}
                  </span>
                </div>
              </div>

              {/* Main Action: Send order to WhatsApp */}
              <button
                onClick={handleSendWhatsAppOrder}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-600/30 active:scale-[0.98] transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Enviar Pedido por WhatsApp</span>
              </button>

              <p className={`text-[10px] text-center leading-tight ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                Al presionar se abrirá WhatsApp con el detalle formateado listo para confirmar tu compra.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
