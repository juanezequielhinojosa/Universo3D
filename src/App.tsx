/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  fetchProductsFromSupabase,
  Product,
  DEFAULT_PRODUCTS,
} from './lib/supabase';
import { CartItem, formatCurrency, getDirectWhatsAppContactUrl, DISPLAY_PHONE_NUMBER } from './lib/whatsapp';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { FeaturesSection } from './components/FeaturesSection';
import { AboutSection } from './components/AboutSection';
import { NewsSection } from './components/NewsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import {
  Search,
  SlidersHorizontal,
  RefreshCw,
  Database,
  Layers,
  Sparkles,
  ShoppingBag,
  Check,
  AlertCircle
} from 'lucide-react';

export default function App() {
  // Theme state: 'dark' (default) or 'light'
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const savedTheme = localStorage.getItem('universo3d-theme');
      return (savedTheme === 'light' || savedTheme === 'dark') ? savedTheme : 'dark';
    } catch {
      return 'dark';
    }
  });

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('universo3d-theme', next);
      } catch (e) {
        console.error('Error saving theme', e);
      }
      return next;
    });
  };

  useEffect(() => {
    // Sync class on documentElement / body for theme
    if (theme === 'light') {
      document.documentElement.classList.remove('theme-dark');
      document.documentElement.classList.add('theme-light');
      document.body.style.backgroundColor = '#f8fafc';
      document.body.style.color = '#0f172a';
    } else {
      document.documentElement.classList.remove('theme-light');
      document.documentElement.classList.add('theme-dark');
      document.body.style.backgroundColor = '#07090e';
      document.body.style.color = '#eef0f7';
    }
  }, [theme]);

  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [dbSource, setDbSource] = useState<'supabase' | 'fallback'>('fallback');
  const [tableUsed, setTableUsed] = useState<string | undefined>();
  const [dbError, setDbError] = useState<string | null>(null);

  // Cart state with localStorage persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('universo3d-cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Search & Filter state
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 2800);
  };

  // Save cart changes
  useEffect(() => {
    try {
      localStorage.setItem('universo3d-cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }, [cartItems]);

  // Load products from Supabase on mount
  const loadProducts = async () => {
    setLoading(true);
    setDbError(null);
    try {
      const result = await fetchProductsFromSupabase();
      setProducts(result.products);
      setDbSource(result.source);
      setTableUsed(result.tableUsed);
      if (result.error && result.source === 'fallback') {
        setDbError(result.error);
      }
    } catch (err: any) {
      setDbError(err?.message || 'Error de conexión');
      setProducts(DEFAULT_PRODUCTS);
      setDbSource('fallback');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => String(item.id) === String(product.id));
      if (existing) {
        return prev.map((item) =>
          String(item.id) === String(product.id)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity,
            image_url: product.image_url,
            material: product.material,
            category: product.category,
          },
        ];
      }
    });

    showToast(`"${product.name}" añadido al carrito`);
  };

  const handleUpdateQuantity = (id: string | number, qty: number) => {
    if (qty <= 0) {
      handleRemoveFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (String(item.id) === String(id) ? { ...item, quantity: qty } : item))
    );
  };

  const handleRemoveFromCart = (id: string | number) => {
    setCartItems((prev) => prev.filter((item) => String(item.id) !== String(id)));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Derive categories list from current products
  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ['Todos', ...Array.from(set)];
  }, [products]);

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory =
          selectedCategory === 'Todos' || p.category?.toLowerCase() === selectedCategory.toLowerCase();
        const matchesSearch =
          searchQuery.trim() === '' ||
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.material && p.material.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0; // featured default
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  const totalCartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);
  const totalCartAmount = cartItems.reduce((acc, it) => acc + it.price * it.quantity, 0);

  const isDark = theme === 'dark';

  return (
    <div
      className={`min-h-screen transition-colors duration-300 flex flex-col ${
        isDark ? 'bg-[#07090e] text-[#eef0f7]' : 'bg-[#f8fafc] text-slate-900'
      }`}
    >
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#121829] border border-cyan-500/40 text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 text-xs animate-bounce">
          <div className="p-1 rounded-full bg-cyan-500/20 text-cyan-400">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span>{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="text-cyan-400 font-bold hover:underline ml-1 cursor-pointer"
          >
            Ver Carrito
          </button>
        </div>
      )}

      {/* Top Navbar with 6 correct items + theme toggle button */}
      <Navbar
        cartCount={totalCartCount}
        cartTotal={totalCartAmount}
        onOpenCart={() => setIsCartOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* 
        SECTION 1: #inicio (HERO)
        Image spans the ENTIRE left side with progressive darkening shadow to highlight text
      */}
      <Hero
        onExploreCatalog={() => {
          const el = document.getElementById('productos');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        theme={theme}
      />


      {/* 
        SECTION 2: #productos (CATÁLOGO DE PRODUCTOS)
      */}
      <section id="productos" className="py-12 flex-1 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b ${
            isDark ? 'border-[#182030]' : 'border-slate-200'
          }`}>
            <div>
              <div className="inline-flex items-center gap-2 text-cyan-500 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Tienda Oficial Universo 3D</span>
              </div>
              <h2 className={`text-3xl sm:text-4xl font-bold font-display tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Nuestros Productos
              </h2>
              <p className={`text-sm mt-2 max-w-xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Piezas impresas con materiales premium, alta densidad y calibración fina.
                Comprá online y confirmá tu pedido directo por <strong className="text-emerald-500">WhatsApp</strong>.
              </p>
            </div>

            {/* Quick stats counter */}
            <div className={`flex items-center gap-2 text-xs px-4 py-2.5 rounded-xl border ${
              isDark ? 'text-slate-400 bg-[#0e121e] border-[#1e273a]' : 'text-slate-600 bg-white border-slate-200'
            }`}>
              <span>Mostrando</span>
              <strong className={`font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {filteredProducts.length}
              </strong>
              <span>de {products.length} productos</span>
            </div>
          </div>

          {/* Search & Filters Bar */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nombre, filamento, dragón, boquilla..."
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-cyan-500 transition-colors ${
                  isDark
                    ? 'bg-[#0e121e] border-[#1e273a] text-white placeholder:text-slate-500'
                    : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 text-xs">
              <span className={`shrink-0 flex items-center gap-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Ordenar:
              </span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className={`px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-cyan-500 ${
                  isDark
                    ? 'bg-[#0e121e] border-[#1e273a] text-white'
                    : 'bg-white border-slate-300 text-slate-900'
                }`}
              >
                <option value="featured">Destacados</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
                <option value="name">Nombre: A - Z</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-500/20'
                    : isDark
                    ? 'bg-[#0e121e] hover:bg-[#151c2e] text-slate-400 hover:text-white border border-[#1e273a]'
                    : 'bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="py-24 text-center flex flex-col items-center justify-center">
              <RefreshCw className="w-8 h-8 text-cyan-500 animate-spin mb-4" />
              <p className={`font-display font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Cargando productos de Universo 3D...
              </p>
              <p className="text-xs text-slate-500 mt-1">Conectando con Supabase</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className={`py-20 text-center rounded-2xl p-8 border ${
              isDark ? 'bg-[#0c101a] border-[#1b2336]' : 'bg-white border-slate-200'
            }`}>
              <ShoppingBag className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className={`text-lg font-bold font-display mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                No se encontraron productos
              </h3>
              <p className={`text-xs max-w-md mx-auto mb-5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                No encontramos coincidencias para "{searchQuery}". Intenta con otros términos o limpia los filtros.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Todos');
                }}
                className="px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-500 border border-cyan-500/30 text-xs font-semibold transition-colors cursor-pointer"
              >
                Restablecer filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => {
                const itemInCart = cartItems.find((it) => String(it.id) === String(product.id));
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    quantityInCart={itemInCart ? itemInCart.quantity : 0}
                    onAddToCart={(p) => handleAddToCart(p, 1)}
                    onOpenQuickView={(p) => setQuickViewProduct(p)}
                    theme={theme}
                  />
                );
              })}
            </div>
          )}

          {/* WhatsApp Direct Help Banner */}
          <div
            className={`mt-16 p-6 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md transition-colors ${
              isDark
                ? 'bg-gradient-to-r from-[#0d1424] to-[#11192e] border-[#202b42]'
                : 'bg-gradient-to-r from-cyan-50 to-indigo-50 border-cyan-200'
            }`}
          >
            <div className="space-y-1 text-center sm:text-left">
              <h3 className={`font-display font-bold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>
                ¿No encontrás el modelo o color exacto que buscás?
              </h3>
              <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Escribinos directamente por <strong className="text-emerald-500">WhatsApp</strong> y te asesoramos o imprimimos el archivo que necesites.
              </p>
            </div>
            <a
              href={getDirectWhatsAppContactUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/25 shrink-0 cursor-pointer"
            >
              <span>Escribir al WhatsApp</span>
            </a>
          </div>

        </div>
      </section>

      {/* 
        SECTION 3: #caracteristicas
      */}
      <FeaturesSection theme={theme} />

      {/* 
        SECTION 4: #nosotros
      */}
      <AboutSection theme={theme} />

      {/* 
        SECTION 5: #novedades
      */}
      <NewsSection theme={theme} />

      {/* 
        SECTION 6: #opiniones
      */}
      <TestimonialsSection theme={theme} />

      {/* 
        SECTION 7: #contacto
      */}
      <ContactSection theme={theme} />

      {/* Footer */}
      <Footer theme={theme} />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        theme={theme}
      />

      {/* Quick View Modal */}
      <ProductDetailModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(p, qty) => handleAddToCart(p, qty)}
        theme={theme}
      />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />
    </div>
  );
}
