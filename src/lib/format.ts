/** Formatting helpers shared by the admin screens. */

export function rupiah(value: number): string {
  return `Rp${Math.round(value || 0).toLocaleString('id-ID')}`;
}

/** Compact rupiah for stat tiles: Rp1,2 jt / Rp850 rb. */
export function rupiahShort(value: number): string {
  const n = Math.round(value || 0);
  if (n >= 1_000_000_000) return `Rp${(n / 1_000_000_000).toFixed(1).replace('.', ',')} M`;
  if (n >= 1_000_000) return `Rp${(n / 1_000_000).toFixed(1).replace('.', ',')} jt`;
  if (n >= 1_000) return `Rp${Math.round(n / 1_000)} rb`;
  return `Rp${n}`;
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return `${formatDate(iso)} · ${d.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  })}`;
}
