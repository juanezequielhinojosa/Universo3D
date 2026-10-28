export const STORE_PHONE_NUMBER = '5493888202559';
export const DISPLAY_PHONE_NUMBER = '+54 9 388 8202559';

export interface OrderCustomerInfo {
  name: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod: 'Transferencia Bancaria' | 'Efectivo / Contraentrega' | 'Mercado Pago' | 'A convenir';
  notes: string;
}

export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image_url?: string;
  material?: string;
  category?: string;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function generateWhatsAppOrderMessage(
  items: CartItem[],
  customer: OrderCustomerInfo,
  totalAmount: number
): string {
  const dateStr = new Date().toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const itemsList = items
    .map((item, index) => {
      const subtotal = item.price * item.quantity;
      return `${index + 1}. *${item.name}*
   ▫ Cantidad: ${item.quantity} un.
   ▫ Precio: ${formatCurrency(item.price)}
   ▫ Subtotal: ${formatCurrency(subtotal)}${item.material ? `\n   ▫ Material: ${item.material}` : ''}`;
    })
    .join('\n\n');

  const customerName = customer.name.trim() || 'Cliente Universo 3D';
  const customerPhone = customer.phone.trim() || 'No especificado';
  const customerAddress = customer.address.trim() ? `${customer.address.trim()}${customer.city ? `, ${customer.city.trim()}` : ''}` : 'Retiro por taller / A coordinar';

  return `🌌 *NUEVO PEDIDO - UNIVERSO 3D* 🌌
📅 *Fecha:* ${dateStr}

👤 *DATOS DEL COMPRADOR*
• *Nombre:* ${customerName}
• *Teléfono:* ${customerPhone}
• *Dirección:* ${customerAddress}
• *Método de Pago:* ${customer.paymentMethod}

━━━━━━━━━━━━━━━━━━━━━
🛒 *DETALLE DEL PEDIDO* (${items.reduce((acc, i) => acc + i.quantity, 0)} artículos)
━━━━━━━━━━━━━━━━━━━━━
${itemsList}

━━━━━━━━━━━━━━━━━━━━━
💰 *TOTAL GENERAL: ${formatCurrency(totalAmount)}*
━━━━━━━━━━━━━━━━━━━━━
${customer.notes.trim() ? `📝 *Observaciones:* ${customer.notes.trim()}\n━━━━━━━━━━━━━━━━━━━━━\n` : ''}
🚀 _Hola Universo 3D, confirmo este pedido desde la tienda web. ¿Me indican los pasos para coordinar la entrega y el pago?_`;
}

export function getWhatsAppOrderUrl(
  items: CartItem[],
  customer: OrderCustomerInfo,
  totalAmount: number,
  phone: string = STORE_PHONE_NUMBER
): string {
  const message = generateWhatsAppOrderMessage(items, customer, totalAmount);
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function getDirectWhatsAppContactUrl(message?: string): string {
  const msg = message || '¡Hola Universo 3D! 👋 Tengo una consulta sobre sus productos de impresión 3D y servicios.';
  return `https://wa.me/${STORE_PHONE_NUMBER}?text=${encodeURIComponent(msg)}`;
}
