import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PiArrowRight, PiWarningCircle } from 'react-icons/pi';
import { useCmsStore, type Order, type OrderStatus } from '../../lib/cmsStore';
import { useThemeStore } from '../../lib/store';
import { rupiah, rupiahShort, formatDate } from '../../lib/format';
import { STATUS_LABELS, STATUS_TONES } from './resources/orders';
import { Badge, Card, SectionTitle, EmptyState } from './ui';

/**
 * Status marks. Two mode-specific sets rather than one flipped set: each was
 * checked against its own surface (#F6F6F4 / #18181b) for the OKLCH lightness
 * band, chroma floor and 3:1 contrast.
 *
 * Blue and purple sit close under deuteranopia, so status is never encoded by
 * colour alone here — every bar and every badge carries its text label, and the
 * counts are readable without the swatch.
 */
const STATUS_MARK_LIGHT: Record<OrderStatus, string> = {
  pending: '#B45309',
  paid: '#1D4ED8',
  processing: '#7E22CE',
  completed: '#047857',
  cancelled: '#B91C1C',
};

const STATUS_MARK_DARK: Record<OrderStatus, string> = {
  pending: '#D97706',
  paid: '#3B82F6',
  processing: '#A855F7',
  completed: '#16A34A',
  cancelled: '#EF4444',
};

/** Revenue is a single series, so it gets one hue rather than a palette. */
const REVENUE_MARK_LIGHT = '#5927E5';
const REVENUE_MARK_DARK = '#8B5CF6';

const EARNING_STATUSES: OrderStatus[] = ['paid', 'processing', 'completed'];
const CHART_DAYS = 14;

export function Dashboard() {
  const orders = useCmsStore((s) => s.orders);
  const products = useCmsStore((s) => s.products);
  const services = useCmsStore((s) => s.services);
  const digital = useCmsStore((s) => s.digital);
  const theme = useThemeStore((s) => s.theme);

  const dark = theme === 'dark';
  const statusMark = dark ? STATUS_MARK_DARK : STATUS_MARK_LIGHT;
  const revenueMark = dark ? REVENUE_MARK_DARK : REVENUE_MARK_LIGHT;

  const earning = useMemo(
    () => orders.filter((o) => EARNING_STATUSES.includes(o.status)),
    [orders],
  );

  const revenue = earning.reduce((sum, o) => sum + o.total, 0);
  const avgOrder = earning.length ? revenue / earning.length : 0;

  const series = useMemo(() => buildDailyRevenue(earning, CHART_DAYS), [earning]);

  const statusCounts = useMemo(() => {
    const counts = {} as Record<OrderStatus, number>;
    (Object.keys(STATUS_LABELS) as OrderStatus[]).forEach((s) => (counts[s] = 0));
    orders.forEach((o) => {
      counts[o.status] = (counts[o.status] ?? 0) + 1;
    });
    return counts;
  }, [orders]);

  const recent = useMemo(
    () =>
      [...orders]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 6),
    [orders],
  );

  const lowStock = useMemo(
    () => products.filter((p) => p.stock <= 20).sort((a, b) => a.stock - b.stock).slice(0, 5),
    [products],
  );

  return (
    <div className="mx-auto max-w-6xl">
      <SectionTitle
        title="Dashboard"
        subtitle="Ringkasan katalog dan transaksi pada data demo."
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile
          label="Pendapatan"
          value={rupiahShort(revenue)}
          hint={`${earning.length} pesanan dibayar`}
        />
        <StatTile
          label="Total pesanan"
          value={String(orders.length)}
          hint={`${statusCounts.pending} menunggu bayar`}
        />
        <StatTile
          label="Item katalog"
          value={String(products.length + services.length + digital.length)}
          hint={`${products.length} produk · ${services.length} layanan · ${digital.length} digital`}
        />
        <StatTile
          label="Rata-rata pesanan"
          value={rupiahShort(avgOrder)}
          hint="Dari pesanan yang dibayar"
        />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="border-b border-border-main px-5 py-4">
            <h2 className="font-black">Pendapatan {CHART_DAYS} hari terakhir</h2>
            <p className="text-xs text-text-secondary mt-0.5">
              Pesanan berstatus dibayar, diproses, atau selesai.
            </p>
          </div>
          <div className="p-5">
            <RevenueChart data={series} mark={revenueMark} />
          </div>
        </Card>

        <Card>
          <div className="border-b border-border-main px-5 py-4">
            <h2 className="font-black">Status pesanan</h2>
          </div>
          <div className="space-y-3 p-5">
            {(Object.keys(STATUS_LABELS) as OrderStatus[]).map((status) => {
              const count = statusCounts[status] ?? 0;
              const pct = orders.length ? (count / orders.length) * 100 : 0;
              return (
                <div key={status}>
                  <div className="mb-1.5 flex items-baseline justify-between gap-2 text-xs">
                    <span className="font-bold">{STATUS_LABELS[status]}</span>
                    <span className="font-bold tabular-nums text-text-secondary">
                      {count}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-black/6 dark:bg-white/10">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.max(pct, count > 0 ? 4 : 0)}%`,
                        backgroundColor: statusMark[status],
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between border-b border-border-main px-5 py-4">
            <h2 className="font-black">Pesanan terbaru</h2>
            <Link
              to="/admin/orders"
              className="inline-flex items-center gap-1 text-xs font-bold text-lex-purple hover:underline"
            >
              Lihat semua <PiArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          {recent.length === 0 ? (
            <EmptyState title="Belum ada pesanan" />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] text-sm">
                <thead>
                  <tr className="border-b border-border-main text-left text-[11px] uppercase tracking-wide text-text-secondary">
                    <th className="px-5 py-2.5 font-bold">Kode</th>
                    <th className="px-5 py-2.5 font-bold">Pelanggan</th>
                    <th className="px-5 py-2.5 font-bold">Tanggal</th>
                    <th className="px-5 py-2.5 text-right font-bold">Total</th>
                    <th className="px-5 py-2.5 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((o) => (
                    <tr
                      key={o.id}
                      className="border-b border-border-main last:border-0 hover:bg-black/[0.02] dark:hover:bg-white/[0.03]"
                    >
                      <td className="px-5 py-3 font-bold">
                        <Link to={`/admin/orders/${o.id}`} className="hover:text-lex-purple">
                          {o.code}
                        </Link>
                      </td>
                      <td className="px-5 py-3">{o.customerName}</td>
                      <td className="px-5 py-3 text-text-secondary">
                        {formatDate(o.createdAt)}
                      </td>
                      <td className="px-5 py-3 text-right font-bold tabular-nums">
                        {rupiah(o.total)}
                      </td>
                      <td className="px-5 py-3">
                        <Badge tone={STATUS_TONES[o.status]}>
                          {STATUS_LABELS[o.status]}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        <Card>
          <div className="flex items-center gap-2 border-b border-border-main px-5 py-4">
            <PiWarningCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <h2 className="font-black">Stok menipis</h2>
          </div>
          {lowStock.length === 0 ? (
            <EmptyState title="Semua stok aman" />
          ) : (
            <ul className="divide-y divide-border-main">
              {lowStock.map((p) => (
                <li key={p.id} className="flex items-center gap-3 px-5 py-3">
                  <Link
                    to={`/admin/products/${p.id}`}
                    className="min-w-0 flex-1 truncate text-sm font-bold hover:text-lex-purple"
                  >
                    {p.name}
                  </Link>
                  <span className="shrink-0 text-sm font-black tabular-nums">
                    {p.stock}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}

function StatTile({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-2xl border border-border-main bg-bg-card p-4">
      <div className="text-[11px] font-bold uppercase tracking-wide text-text-secondary">
        {label}
      </div>
      <div className="mt-1.5 text-2xl font-black tabular-nums">{value}</div>
      <div className="mt-1 truncate text-[11px] text-text-secondary">{hint}</div>
    </div>
  );
}

interface DayPoint {
  iso: string;
  label: string;
  value: number;
}

function buildDailyRevenue(orders: Order[], days: number): DayPoint[] {
  const buckets = new Map<string, number>();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const points: DayPoint[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today.getTime() - i * 86_400_000);
    const key = d.toISOString().slice(0, 10);
    buckets.set(key, 0);
    points.push({
      iso: key,
      label: d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
      value: 0,
    });
  }

  orders.forEach((o) => {
    const key = new Date(o.createdAt).toISOString().slice(0, 10);
    if (buckets.has(key)) buckets.set(key, (buckets.get(key) ?? 0) + o.total);
  });

  return points.map((p) => ({ ...p, value: buckets.get(p.iso) ?? 0 }));
}

/**
 * Bars in plain HTML: real rounded data-ends, a 2px gap between marks and a
 * recessive grid. Hovering a column reveals the exact figure, so the axis stays
 * uncluttered and only the peak is labelled directly.
 */
function RevenueChart({ data, mark }: { data: DayPoint[]; mark: string }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const max = Math.max(...data.map((d) => d.value), 1);
  const peakIndex = data.reduce((best, d, i) => (d.value > data[best].value ? i : best), 0);
  const active = hovered !== null ? data[hovered] : null;

  return (
    <div>
      <div className="mb-3 flex items-baseline gap-2">
        <span className="text-xl font-black tabular-nums">
          {rupiah(active ? active.value : data.reduce((s, d) => s + d.value, 0))}
        </span>
        <span className="text-xs font-semibold text-text-secondary">
          {active ? active.label : `total ${CHART_DAYS} hari`}
        </span>
      </div>

      <div className="relative h-44">
        {/* Recessive grid */}
        {[0, 0.5, 1].map((t) => (
          <div
            key={t}
            className="absolute inset-x-0 border-t border-border-main"
            style={{ top: `${t * 100}%` }}
          />
        ))}

        <div className="absolute inset-0 flex items-end gap-[2px]">
          {data.map((d, i) => {
            const pct = (d.value / max) * 100;
            const isActive = hovered === i;
            return (
              <div
                key={d.iso}
                className="group relative flex h-full flex-1 cursor-default items-end"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Hit target covers the full column height, not just the bar. */}
                <div
                  className="w-full rounded-t transition-all duration-200"
                  style={{
                    height: `${Math.max(pct, d.value > 0 ? 2 : 0)}%`,
                    backgroundColor: mark,
                    opacity: hovered === null || isActive ? 1 : 0.45,
                  }}
                />
                {i === peakIndex && d.value > 0 && hovered === null && (
                  <span
                    className="pointer-events-none absolute inset-x-0 text-center text-[10px] font-bold text-text-secondary"
                    style={{ bottom: `calc(${Math.max(pct, 2)}% + 4px)` }}
                  >
                    {rupiahShort(d.value)}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-2 flex gap-[2px] text-[10px] text-text-secondary">
        {data.map((d, i) => (
          <div key={d.iso} className="flex-1 truncate text-center">
            {i % 3 === 0 ? d.label : ''}
          </div>
        ))}
      </div>
    </div>
  );
}
