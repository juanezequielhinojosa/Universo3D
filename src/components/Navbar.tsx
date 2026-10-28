import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Sun, Moon } from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
  cartCount: number;
  cartTotal?: number;
  onOpenCart: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  theme,
  onToggleTheme,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Productos', href: '#productos' },
    { label: 'Características', href: '#caracteristicas' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Novedades', href: '#novedades' },
    { label: 'Opiniones', href: '#opiniones' },
    { label: 'Contacto', href: '#contacto' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        theme === 'light'
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm py-3.5'
          : isScrolled
          ? 'bg-[#07090e]/95 backdrop-blur-md border-b border-[#1f2638] shadow-lg shadow-black/40 py-3'
          : 'bg-[#07090e]/80 backdrop-blur-sm border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <a href="#inicio" className="group flex items-center shrink-0">
            <Logo size="md" theme={theme} />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-xs xl:text-sm font-medium">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-cyan-500 hover:after:w-full after:transition-all ${
                  theme === 'dark'
                    ? 'text-slate-200 hover:text-cyan-400 font-medium'
                    : 'text-slate-800 hover:text-cyan-600 font-bold'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Actions: Theme Toggle & Cart Button */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Theme Toggle Button (Desktop only; on mobile it only appears inside hamburger menu) */}
            <button
              onClick={onToggleTheme}
              className={`hidden lg:flex p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-medium items-center gap-1.5 transition-all cursor-pointer border ${
                theme === 'dark'
                  ? 'bg-[#121624] hover:bg-[#1a2133] text-amber-300 border-[#232d44]'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300 shadow-xs'
              }`}
              title={theme === 'dark' ? 'Cambiar a Tema Claro' : 'Cambiar a Tema Oscuro'}
              aria-label="Cambiar tema de color"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline font-semibold">Claro</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-600" />
                  <span className="hidden sm:inline font-semibold">Oscuro</span>
                </>
              )}
            </button>

            {/* Shopping Cart Button (Without accumulated price as requested) */}
            <button
              onClick={onOpenCart}
              className="relative inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-medium text-xs sm:text-sm transition-all shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/30 active:scale-95 cursor-pointer"
              aria-label="Abrir carrito de compras"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="font-semibold">Carrito</span>
              {cartCount > 0 && (
                <span className="flex items-center justify-center bg-white text-indigo-950 text-xs font-extrabold h-5 min-w-5 px-1.5 rounded-full shadow-inner animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-xl border transition-colors ${
                theme === 'dark'
                  ? 'bg-[#141926] border-[#232b3e] text-slate-300 hover:text-white'
                  : 'bg-slate-100 border-slate-300 text-slate-800 hover:text-black'
              }`}
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div
            className={`lg:hidden mt-3 p-4 rounded-2xl border shadow-2xl flex flex-col gap-2 transition-all ${
              theme === 'dark'
                ? 'bg-[#0e121d] border-[#232b3e]'
                : 'bg-white border-slate-200'
            }`}
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  theme === 'dark'
                    ? 'text-slate-200 hover:bg-[#1a2133] hover:text-cyan-400'
                    : 'text-slate-800 hover:bg-slate-100 hover:text-cyan-600'
                }`}
              >
                {item.label}
              </a>
            ))}

            <div className={`pt-3 mt-1 border-t flex flex-col gap-2 ${theme === 'dark' ? 'border-[#232b3e]' : 'border-slate-200'}`}>
              <button
                onClick={() => {
                  onToggleTheme();
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-medium ${
                  theme === 'dark'
                    ? 'bg-[#141a29] border-[#232d42] text-amber-300'
                    : 'bg-slate-100 border-slate-300 text-slate-800'
                }`}
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
                <span>{theme === 'dark' ? 'Cambiar a Tema Claro ☀️' : 'Cambiar a Tema Oscuro 🌙'}</span>
              </button>

            </div>
          </div>
        )}
      </div>
    </header>
  );
};
