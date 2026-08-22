import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  PiMagnifyingGlass,
  PiPlus,
  PiPencilSimple,
  PiTrash,
  PiCaretUp,
  PiCaretDown,
  PiCaretLeft,
  PiCaretRight,
} from 'react-icons/pi';
import { cn } from '../../lib/utils';
import { useCmsStore, type CmsRecord } from '../../lib/cmsStore';
import { findResource } from './resources';
import { Button, Card, ConfirmDialog, EmptyState, SectionTitle, inputClass } from './ui';
import { NotFoundPanel } from './NotFoundPanel';

const PAGE_SIZE = 8;

/** Stable identity so the zustand selector never returns a fresh array. */
const EMPTY_ROWS: CmsRecord[] = [];

export function ResourceList() {
  const { resource: slug } = useParams();
  const navigate = useNavigate();
  const resource = findResource(slug);

  const rows = useCmsStore((s) =>
    resource ? (s[resource.collection] as unknown as CmsRecord[]) : EMPTY_ROWS,
  );
  const removeRecord = useCmsStore((s) => s.removeRecord);

  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [sort, setSort] = useState<{ key: string; dir: 'asc' | 'desc' } | null>(null);
  const [page, setPage] = useState(0);
  const [pendingDelete, setPendingDelete] = useState<CmsRecord | null>(null);

  const filtered = useMemo(() => {
    if (!resource) return [];
    const q = query.trim().toLowerCase();

    let out = rows.filter((row) => {
      const matchesQuery =
        !q ||
        resource.searchKeys.some((key) =>
          String(row[key] ?? '').toLowerCase().includes(q),
        );
      const matchesFilters = Object.entries(filters).every(
        ([key, value]) => !value || String(row[key] ?? '') === value,
      );
      return matchesQuery && matchesFilters;
    });

    if (sort) {
      const column = resource.columns.find((c) => c.key === sort.key);
      const valueOf = (row: CmsRecord) =>
        column?.sortValue ? column.sortValue(row) : (row[sort.key] as string | number);
      out = [...out].sort((a, b) => {
        const av = valueOf(a);
        const bv = valueOf(b);
        const cmp =
          typeof av === 'number' && typeof bv === 'number'
            ? av - bv
            : String(av ?? '').localeCompare(String(bv ?? ''), 'id');
        return sort.dir === 'asc' ? cmp : -cmp;
      });
    }

    return out;
  }, [resource, rows, query, filters, sort]);

  if (!resource) return <NotFoundPanel />;

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const visible = filtered.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);
  const canCreate = resource.canCreate !== false;

  function toggleSort(key: string) {
    setSort((current) => {
      if (current?.key !== key) return { key, dir: 'asc' };
      if (current.dir === 'asc') return { key, dir: 'desc' };
      return null;
    });
  }

  return (
    <div className="mx-auto max-w-6xl">
      <SectionTitle
        title={resource.label}
        subtitle={resource.description}
        action={
          canCreate ? (
            <Button onClick={() => navigate(`/admin/${resource.slug}/new`)}>
              <PiPlus className="h-4 w-4" />
              Tambah {resource.singular}
            </Button>
          ) : undefined
        }
      />

      {/* Filters live in one row above the table. */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="relative min-w-[220px] flex-1">
          <PiMagnifyingGlass className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(0);
            }}
            placeholder={`Cari ${resource.label.toLowerCase()}…`}
            className={cn(inputClass, 'pl-10')}
          />
        </div>

        {resource.filters?.map((filter) => (
          <select
            key={filter.key}
            value={filters[filter.key] ?? ''}
            onChange={(e) => {
              setFilters((f) => ({ ...f, [filter.key]: e.target.value }));
              setPage(0);
            }}
            className={cn(inputClass, 'w-auto min-w-[150px]')}
          >
            <option value="">Semua {filter.label}</option>
            {filter.options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        ))}
      </div>

      <Card>
        {visible.length === 0 ? (
          <EmptyState
            title="Tidak ada data yang cocok"
            hint={
              query || Object.values(filters).some(Boolean)
                ? 'Ubah kata kunci atau filternya.'
                : undefined
            }
            action={
              canCreate ? (
                <Button
                  variant="outline"
                  onClick={() => navigate(`/admin/${resource.slug}/new`)}
                >
                  <PiPlus className="h-4 w-4" />
                  Tambah {resource.singular}
                </Button>
              ) : undefined
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-sm">
              <thead>
                <tr className="border-b border-border-main text-left text-[11px] uppercase tracking-wide text-text-secondary">
                  {resource.columns.map((col) => (
                    <th
                      key={col.key}
                      className={cn(
                        'px-4 py-3 font-bold',
                        col.align === 'right' && 'text-right',
                        col.align === 'center' && 'text-center',
                      )}
                    >
                      {col.sortable ? (
                        <button
                          onClick={() => toggleSort(col.key)}
                          className={cn(
                            'inline-flex items-center gap-1 hover:text-text-primary',
                            sort?.key === col.key && 'text-text-primary',
                          )}
                        >
                          {col.label}
                          {sort?.key === col.key &&
                            (sort.dir === 'asc' ? (
                              <PiCaretUp className="h-3 w-3" />
                            ) : (
                              <PiCaretDown className="h-3 w-3" />
                            ))}
                        </button>
                      ) : (
                        col.label
                      )}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-right font-bold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-border-main last:border-0 hover:bg-black/[0.02] dark:hover:bg-white/[0.03]"
                  >
                    {resource.columns.map((col) => (
                      <td
                        key={col.key}
                        className={cn(
                          'px-4 py-3',
                          col.align === 'right' && 'text-right',
                          col.align === 'center' && 'text-center',
                        )}
                      >
                        {col.render
                          ? col.render(row)
                          : String(row[col.key] ?? '—')}
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          to={`/admin/${resource.slug}/${row.id}`}
                          className="grid h-8 w-8 place-items-center rounded-lg text-text-secondary hover:bg-black/5 hover:text-text-primary dark:hover:bg-white/10"
                          aria-label="Ubah"
                        >
                          <PiPencilSimple className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => setPendingDelete(row)}
                          className="grid h-8 w-8 place-items-center rounded-lg text-text-secondary hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400"
                          aria-label="Hapus"
                        >
                          <PiTrash className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filtered.length > PAGE_SIZE && (
          <div className="flex items-center justify-between border-t border-border-main px-4 py-3 text-xs">
            <span className="text-text-secondary">
              {safePage * PAGE_SIZE + 1}–
              {Math.min((safePage + 1) * PAGE_SIZE, filtered.length)} dari{' '}
              {filtered.length}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={safePage === 0}
                className="grid h-8 w-8 place-items-center rounded-lg hover:bg-black/5 disabled:opacity-30 dark:hover:bg-white/10"
                aria-label="Halaman sebelumnya"
              >
                <PiCaretLeft className="h-4 w-4" />
              </button>
              <span className="px-2 font-bold tabular-nums">
                {safePage + 1} / {pageCount}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
                disabled={safePage >= pageCount - 1}
                className="grid h-8 w-8 place-items-center rounded-lg hover:bg-black/5 disabled:opacity-30 dark:hover:bg-white/10"
                aria-label="Halaman berikutnya"
              >
                <PiCaretRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </Card>

      <ConfirmDialog
        open={pendingDelete !== null}
        title={`Hapus ${resource.singular.toLowerCase()}?`}
        message={`"${String(
          pendingDelete?.name ?? pendingDelete?.code ?? '',
        )}" akan dihapus dari data demo.`}
        onConfirm={() => {
          if (pendingDelete) {
            removeRecord(resource.collection, String(pendingDelete.id));
            toast.success(`${resource.singular} dihapus`);
          }
          setPendingDelete(null);
        }}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
