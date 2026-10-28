import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL = 'https://ehuepkuoaepkfyedlant.supabase.co';
export const SUPABASE_ANON_KEY = 'sb_publishable_9ctmokJS8yxVNMy9LYDf8w_YVg-VCVX';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface Product {
  id: string | number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  material?: string;
  specs?: string;
  stock?: number;
  rating?: number;
  reviews_count?: number;
  mercadopago_url?: string | null;
  badge?: string;
  is_customizable?: boolean;
}

// Fallback high-quality curated catalogue for 3D printing store
export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Dragón Articulado Imperial',
    description: 'Impreso en una sola pieza con articulaciones fluidas de alta resistencia. Acabado brillante seda.',
    price: 6500,
    image_url: 'https://images.unsplash.com/photo-1615789591457-74a63395c990?auto=format&fit=crop&w=800&q=80',
    category: 'Figuras Articuladas',
    material: 'PLA Silk Oro/Cobre',
    specs: 'Altura 0.12mm · 45cm largo · Resistencia flex',
    stock: 12,
    rating: 4.9,
    reviews_count: 38,
    badge: 'Más Vendido'
  },
  {
    id: 'prod-2',
    name: 'Maceta Geométrica Voronoi',
    description: 'Diseño paramétrico moderno ideal para suculentas y plantas de interior. Incluye plato de drenaje oculto.',
    price: 4800,
    image_url: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80',
    category: 'Decoración & Hogar',
    material: 'PETG Mate Reciclable',
    specs: '12x12x10cm · Impermeable · Anti-rayaduras',
    stock: 18,
    rating: 4.8,
    reviews_count: 24,
    badge: 'Eco Friendly'
  },
  {
    id: 'prod-3',
    name: 'Soporte Gamer de Auriculares Low-Poly',
    description: 'Estructura facetada futurista con base pesada y pasacables integrado para mantener tu setup ordenado.',
    price: 7200,
    image_url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    category: 'Accesorios & Setup',
    material: 'PLA+ Negro Carbón',
    specs: '26cm altura · Base antideslizante · 320g',
    stock: 9,
    rating: 5.0,
    reviews_count: 42,
    badge: 'Destacado'
  },
  {
    id: 'prod-4',
    name: 'Bobina Filamento PLA+ 1.75mm (1kg)',
    description: 'Tolerancia dimensional ±0.02mm, bobinado de precisión sin enredos. Cero burbujas y excelente adhesión.',
    price: 19500,
    image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    category: 'Filamentos & Insumos',
    material: 'Ácido Poliláctico Grado Virgen',
    specs: 'Temp: 205-220°C · Cama: 55-60°C · 1kg neto',
    stock: 25,
    rating: 4.9,
    reviews_count: 67,
    badge: 'Insumo Pro'
  },
  {
    id: 'prod-5',
    name: 'Kit 5 Boquillas Latón Endurecido 0.4mm',
    description: 'Compatibles con hotends V6, Creality Ender, Bambu y clones. Conductividad térmica superior y orificio calibrado.',
    price: 5200,
    image_url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    category: 'Repuestos & Upgrades',
    material: 'Latón CW614N Mecanizado CNC',
    specs: 'Rosca M6 · Filamento 1.75mm · Tolerancia 0.01mm',
    stock: 30,
    rating: 4.7,
    reviews_count: 19
  },
  {
    id: 'prod-6',
    name: 'Calavera Mecánica Steampunk con Engranajes',
    description: 'Modelo técnico de exhibición con engranajes funcionales rotativos. Detalle microscópico impreso en resina 8K.',
    price: 9900,
    image_url: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
    category: 'Figuras Articuladas',
    material: 'Resina Fotopolímero 8K',
    specs: 'Capa 0.03mm · Mecanismo giratorio · Pintado a mano',
    stock: 5,
    rating: 5.0,
    reviews_count: 31,
    badge: 'Edición Limitada'
  },
  {
    id: 'prod-7',
    name: 'Organizador Modular Honeycomb para Herramientas',
    description: 'Panel de pared hexagonal encastrable con 8 soportes magnéticos para alicates, llaves allen y espátulas.',
    price: 6300,
    image_url: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80',
    category: 'Accesorios & Setup',
    material: 'PETG Alta Tenacidad',
    specs: '4 paneles modulares · 8 accesorios clip-on',
    stock: 14,
    rating: 4.8,
    reviews_count: 15
  },
  {
    id: 'prod-8',
    name: 'Lámpara Lunar Litofanía LED USB',
    description: 'Topografía lunar real de la NASA impresa en alta resolución con textura táctil de cráteres. Luz cálida/fría.',
    price: 11500,
    image_url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    category: 'Decoración & Hogar',
    material: 'PLA Blanco Lunar + Base Madera',
    specs: 'Diámetro 15cm · LED Touch regulable · Batería recargable',
    stock: 8,
    rating: 4.9,
    reviews_count: 53,
    badge: 'Personalizable'
  }
];

export async function fetchProductsFromSupabase(): Promise<{
  products: Product[];
  source: 'supabase' | 'fallback';
  tableUsed?: string;
  error?: string;
}> {
  try {
    // 1. Try "products" table
    let response = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true });

    let data = response.data;
    let tableUsed = 'products';

    // 2. If error or empty, try "productos" table
    if (response.error || !data || data.length === 0) {
      const resp2 = await supabase
        .from('productos')
        .select('*')
        .order('id', { ascending: true });

      if (!resp2.error && resp2.data && resp2.data.length > 0) {
        data = resp2.data;
        tableUsed = 'productos';
      }
    }

    if (!data || data.length === 0) {
      return {
        products: DEFAULT_PRODUCTS,
        source: 'fallback',
        error: response.error?.message || 'No se encontraron registros en Supabase (mostrando catálogo Universo 3D)'
      };
    }

    // Normalize records
    const normalized: Product[] = data.map((item: any, idx: number) => {
      const id = item.id || `supa-${idx}`;
      const name = item.name || item.nombre || item.title || item.titulo || item.product_name || `Producto 3D #${idx + 1}`;
      const description = item.description || item.descripcion || item.desc || item.detalle || 'Producto de alta resolución para impresión 3D.';
      const price = Number(item.price ?? item.precio ?? item.costo ?? 0);
      const imageUrl = item.image_url || item.image || item.imagen || item.img_url || item.photo_url || item.foto || DEFAULT_PRODUCTS[idx % DEFAULT_PRODUCTS.length].image_url;
      const category = item.category || item.categoria || item.rubro || 'Impresión 3D';
      const material = item.material || item.tipo_material || 'PLA+';
      const specs = item.specs || item.especificaciones || item.medidas || '0.15mm · Infill 20%';
      const stock = item.stock !== undefined ? Number(item.stock) : 10;
      const mercadopago_url = item.mercadopago_url || item.mercadopago || item.mp_url || null;

      return {
        id,
        name,
        description,
        price,
        image_url: imageUrl,
        category,
        material,
        specs,
        stock,
        rating: item.rating ? Number(item.rating) : 4.8,
        reviews_count: item.reviews_count ? Number(item.reviews_count) : 12,
        mercadopago_url,
        badge: item.badge || (idx === 0 ? 'Recomendado' : undefined)
      };
    });

    return {
      products: normalized,
      source: 'supabase',
      tableUsed
    };
  } catch (err: any) {
    console.error('Error fetching from Supabase:', err);
    return {
      products: DEFAULT_PRODUCTS,
      source: 'fallback',
      error: err?.message || 'Error de conexión con Supabase'
    };
  }
}
