import { useEffect, useState, type ReactNode } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import {
  PiChartPieSlice,
  PiList,
  PiX,
  PiMoon,
  PiSun,
  PiStorefront,
  PiSignOut,
  PiArrowCounterClockwise,
} from 'react-icons/pi';
import { cn } from '../../lib/utils';
import { useThemeStore } from '../../lib/store';
import { useCmsStore } from '../../lib/cmsStore';
import { RESOURCES } from './resources';
import { ConfirmDialog } from './ui';

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const logout = useCmsStore((s) => s.logout);
  const resetDemo = useCmsStore((s) => s.resetDemo);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  // The admin tree renders outside the storefront Layout, so it applies the
  // theme class itself.
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  const nav = [
    { to: '/admin', label: 'Dashboard', icon: PiChartPieSlice, end: true },
    ...RESOURCES.map((r) => ({
      to: `/admin/${r.slug}`,
      label: r.label,
      icon: r.icon,
      end: false,
    })),
  ];

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="px-5 py-6">
        <div className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-lex-purple text-white font-black text-sm">
            LX
          </div>
          <div className="leading-tight">
            <div className="font-black tracking-tight">LEXPAY</div>
            <div className="text-[11px] font-semibold text-text-secondary">
              Content Manager
            </div>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {nav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition-colors',
                isActive
                  ? 'bg-lex-purple text-white'
                  : 'text-text-secondary hover:bg-black/5 dark:hover:bg-white/10 hover:text-text-primary',
              )
            }
          >
            <item.icon className="h-[18px] w-[18px] shrink-0" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="space-y-1 border-t border-border-main px-3 py-4">
        <button
          onClick={() => setConfirmReset(true)}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-text-secondary transition-colors hover:bg-black/5 hover:text-text-primary dark:hover:bg-white/10"
        >
          <PiArrowCounterClockwise className="h-[18px] w-[18px] shrink-0" />
          Reset data demo
        </button>
        <button
          onClick={() => {
            logout();
            navigate('/admin/login');
          }}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-text-secondary transition-colors hover:bg-black/5 hover:text-text-primary dark:hover:bg-white/10"
        >
          <PiSignOut className="h-[18px] w-[18px] shrink-0" />
          Keluar
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-bg-main text-text-primary">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2200,
          style: {
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)',
            borderRadius: '100px',
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: '600',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          },
        }}
      />

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-border-main bg-bg-card lg:block">
        {sidebar}
      </aside>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setDrawerOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-64 border-r border-border-main bg-bg-card">
            {sidebar}
          </aside>
        </div>
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-border-main bg-bg-main/85 px-4 backdrop-blur-md sm:px-6">
          <button
            onClick={() => setDrawerOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-xl hover:bg-black/5 dark:hover:bg-white/10 lg:hidden"
            aria-label="Buka menu"
          >
            {drawerOpen ? <PiX className="h-5 w-5" /> : <PiList className="h-5 w-5" />}
          </button>

          <span className="rounded-full bg-lex-yellow/25 px-3 py-1 text-[11px] font-black text-amber-700 dark:text-lex-yellow">
            MODE DEMO
          </span>

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="grid h-10 w-10 place-items-center rounded-xl hover:bg-black/5 dark:hover:bg-white/10"
              aria-label="Ganti tema"
            >
              {theme === 'dark' ? (
                <PiSun className="h-5 w-5" />
              ) : (
                <PiMoon className="h-5 w-5" />
              )}
            </button>
            <a
              href="/"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-border-main px-4 text-sm font-bold hover:bg-black/5 dark:hover:bg-white/10"
            >
              <PiStorefront className="h-[18px] w-[18px]" />
              <span className="hidden sm:inline">Lihat toko</span>
            </a>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      <ConfirmDialog
        open={confirmReset}
        title="Reset data demo?"
        message="Semua perubahan yang Anda buat di CMS akan dikembalikan ke data awal."
        confirmLabel="Reset"
        onConfirm={() => {
          resetDemo();
          setConfirmReset(false);
          navigate('/admin');
        }}
        onCancel={() => setConfirmReset(false)}
      />
    </div>
  );
}

/** Gate that keeps /admin behind the demo login. */
export function RequireAdmin({ children }: { children: ReactNode }) {
  const authed = useCmsStore((s) => s.authed);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authed) navigate('/admin/login', { replace: true });
  }, [authed, navigate]);

  if (!authed) return null;
  return <>{children}</>;
}
