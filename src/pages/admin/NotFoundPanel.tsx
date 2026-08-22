import { Link } from 'react-router-dom';
import { Card, Button } from './ui';

export function NotFoundPanel() {
  return (
    <div className="mx-auto max-w-lg">
      <Card>
        <div className="px-6 py-14 text-center">
          <div className="text-5xl font-black text-text-secondary/40">404</div>
          <p className="mt-3 font-bold">Halaman CMS tidak ditemukan</p>
          <p className="mt-1 text-sm text-text-secondary">
            Menu yang Anda tuju tidak ada di demo ini.
          </p>
          <div className="mt-5 flex justify-center">
            <Link to="/admin">
              <Button variant="outline">Kembali ke dashboard</Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
