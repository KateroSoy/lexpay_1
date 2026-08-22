import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { PiArrowLeft } from 'react-icons/pi';
import { useThemeStore } from '../../lib/store';
import { useCmsStore, DEMO_EMAIL, DEMO_PASSWORD } from '../../lib/cmsStore';
import { Button, Field, inputClass } from './ui';

export function AdminLogin() {
  const navigate = useNavigate();
  const theme = useThemeStore((s) => s.theme);
  const login = useCmsStore((s) => s.login);
  const authed = useCmsStore((s) => s.authed);

  const [email, setEmail] = useState(DEMO_EMAIL);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [error, setError] = useState('');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    if (authed) navigate('/admin', { replace: true });
  }, [authed, navigate]);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (login(email, password)) {
      navigate('/admin', { replace: true });
    } else {
      setError('Email atau kata sandi demo tidak cocok.');
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-bg-main px-4 text-text-primary">
      <div className="w-full max-w-sm">
        <a
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-text-secondary hover:text-text-primary"
        >
          <PiArrowLeft className="h-4 w-4" />
          Kembali ke toko
        </a>

        <div className="rounded-3xl border border-border-main bg-bg-card p-7">
          <div className="mb-6 flex items-center gap-2.5">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-lex-purple text-sm font-black text-white">
              LX
            </div>
            <div className="leading-tight">
              <div className="font-black tracking-tight">LEXPAY</div>
              <div className="text-[11px] font-semibold text-text-secondary">
                Content Manager
              </div>
            </div>
          </div>

          <h1 className="text-xl font-black tracking-tight">Masuk ke CMS</h1>
          <p className="mt-1 text-sm text-text-secondary">
            Lingkungan demo. Data tersimpan di browser Anda saja.
          </p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <Field label="Email">
              <input
                type="email"
                className={inputClass}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                autoComplete="username"
              />
            </Field>
            <Field label="Kata sandi" error={error}>
              <input
                type="password"
                className={inputClass}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                autoComplete="current-password"
              />
            </Field>
            <Button type="submit" className="w-full">
              Masuk
            </Button>
          </form>

          <div className="mt-5 rounded-xl bg-bg-main px-4 py-3 text-[11px] leading-relaxed text-text-secondary">
            Kredensial demo sudah terisi:
            <br />
            <span className="font-bold text-text-primary">{DEMO_EMAIL}</span> /{' '}
            <span className="font-bold text-text-primary">{DEMO_PASSWORD}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
