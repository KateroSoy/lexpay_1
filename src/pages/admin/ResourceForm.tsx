import { useMemo, useState, type FormEvent, type KeyboardEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { PiArrowLeft, PiPlus, PiTrash, PiX } from 'react-icons/pi';
import { cn } from '../../lib/utils';
import {
  useCmsStore,
  nextId,
  slugify,
  type CmsRecord,
  type Collection,
} from '../../lib/cmsStore';
import { findResource } from './resources';
import type { FieldDef, ResourceDef } from './types';
import {
  Button,
  Card,
  ConfirmDialog,
  Field,
  SectionTitle,
  Thumb,
  inputClass,
} from './ui';
import { NotFoundPanel } from './NotFoundPanel';

/** Stable identity so the zustand selector never returns a fresh array. */
const EMPTY_ROWS: CmsRecord[] = [];

export function ResourceForm() {
  const { resource: slug, id } = useParams();
  const navigate = useNavigate();
  const resource = findResource(slug);

  const rows = useCmsStore((s) =>
    resource ? (s[resource.collection] as unknown as CmsRecord[]) : EMPTY_ROWS,
  );
  const createRecord = useCmsStore((s) => s.createRecord);
  const updateRecord = useCmsStore((s) => s.updateRecord);
  const removeRecord = useCmsStore((s) => s.removeRecord);

  const isNew = id === 'new';
  const existing = isNew ? undefined : rows.find((r) => String(r.id) === id);

  const [values, setValues] = useState<Record<string, any>>(() =>
    isNew ? (resource?.defaults() ?? {}) : { ...(existing ?? {}) },
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const otherRows = useMemo(
    () => rows.filter((r) => String(r.id) !== id),
    [rows, id],
  );

  if (!resource) return <NotFoundPanel />;
  if (!isNew && !existing) return <NotFoundPanel />;

  function setValue(key: string, value: unknown) {
    setValues((v) => {
      const next = { ...v, [key]: value };
      // Keep slug in step with its source until the user edits it by hand.
      const slugField = resource!.fields.find((f) => f.slugFrom === key);
      if (slugField && !slugTouched) {
        next[slugField.key] = slugify(String(value ?? ''));
      }
      return next;
    });
    setErrors((e) => (e[key] ? { ...e, [key]: '' } : e));
  }

  function validate(res: ResourceDef): Record<string, string> {
    const found: Record<string, string> = {};
    res.fields.forEach((field) => {
      const raw = values[field.key];
      if (field.required) {
        const empty =
          raw === undefined ||
          raw === null ||
          raw === '' ||
          (field.type === 'number' && Number.isNaN(Number(raw)));
        if (empty) {
          found[field.key] = `${field.label} wajib diisi.`;
          return;
        }
      }
      if (field.unique && raw) {
        const clash = otherRows.some(
          (r) => String(r[field.key] ?? '').toLowerCase() === String(raw).toLowerCase(),
        );
        if (clash) found[field.key] = `${field.label} sudah dipakai record lain.`;
      }
      if (field.type === 'number' && raw !== '' && raw !== undefined) {
        const n = Number(raw);
        if (field.min !== undefined && n < field.min) {
          found[field.key] = `Minimal ${field.min}.`;
        }
        if (field.max !== undefined && n > field.max) {
          found[field.key] = `Maksimal ${field.max}.`;
        }
      }
    });
    return found;
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    const res = resource!;
    const found = validate(res);
    if (Object.keys(found).length) {
      setErrors(found);
      toast.error('Periksa kembali isian yang ditandai.');
      return;
    }

    const payload = res.beforeSave ? res.beforeSave({ ...values }) : { ...values };

    if (isNew) {
      const record = {
        ...payload,
        id: nextId(res.idPrefix, rows as { id: string }[]),
      };
      createRecord(res.collection as Collection, record as never);
      toast.success(`${res.singular} ditambahkan`);
    } else {
      updateRecord(res.collection as Collection, String(id), payload as never);
      toast.success(`${res.singular} diperbarui`);
    }
    navigate(`/admin/${res.slug}`);
  }

  return (
    <div className="mx-auto max-w-3xl">
      <button
        onClick={() => navigate(`/admin/${resource.slug}`)}
        className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-text-secondary hover:text-text-primary"
      >
        <PiArrowLeft className="h-4 w-4" />
        {resource.label}
      </button>

      <SectionTitle
        title={isNew ? `Tambah ${resource.singular}` : `Ubah ${resource.singular}`}
        subtitle={
          isNew
            ? 'Record baru akan langsung tampil di storefront demo.'
            : `ID ${String(existing?.id)}`
        }
        action={
          !isNew ? (
            <Button variant="danger" onClick={() => setConfirmDelete(true)}>
              <PiTrash className="h-4 w-4" />
              Hapus
            </Button>
          ) : undefined
        }
      />

      <form onSubmit={submit}>
        <Card>
          <div className="grid gap-5 p-5 sm:grid-cols-2">
            {resource.fields.map((field) => (
              <FieldRenderer
                key={field.key}
                field={field}
                value={values[field.key]}
                error={errors[field.key]}
                onChange={(v) => {
                  if (field.slugFrom) setSlugTouched(true);
                  setValue(field.key, v);
                }}
              />
            ))}
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-border-main px-5 py-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate(`/admin/${resource.slug}`)}
            >
              Batal
            </Button>
            <Button type="submit">Simpan</Button>
          </div>
        </Card>
      </form>

      <ConfirmDialog
        open={confirmDelete}
        title={`Hapus ${resource.singular.toLowerCase()}?`}
        message="Record ini akan dihapus dari data demo."
        onConfirm={() => {
          removeRecord(resource.collection, String(id));
          toast.success(`${resource.singular} dihapus`);
          navigate(`/admin/${resource.slug}`);
        }}
        onCancel={() => setConfirmDelete(false)}
      />
    </div>
  );
}

function FieldRenderer({
  field,
  value,
  error,
  onChange,
}: {
  field: FieldDef;
  value: any;
  error?: string;
  onChange: (value: unknown) => void;
}) {
  const span = field.colSpan === 2 ? 'sm:col-span-2' : '';

  if (field.type === 'switch') {
    return (
      <div className={span}>
        <span className="mb-1.5 block text-xs font-bold">{field.label}</span>
        <button
          type="button"
          onClick={() => onChange(!value)}
          className={cn(
            'relative h-7 w-12 rounded-full transition-colors',
            value ? 'bg-lex-purple' : 'bg-black/15 dark:bg-white/20',
          )}
          role="switch"
          aria-checked={!!value}
        >
          <span
            className={cn(
              'absolute top-1 h-5 w-5 rounded-full bg-white transition-transform',
              value ? 'translate-x-6' : 'translate-x-1',
            )}
          />
        </button>
        {field.help && (
          <span className="mt-1 block text-[11px] text-text-secondary">
            {field.help}
          </span>
        )}
      </div>
    );
  }

  if (field.type === 'tags') {
    return (
      <Field label={field.label} required={field.required} help={field.help} error={error} className={span}>
        <TagsInput
          value={Array.isArray(value) ? value : []}
          placeholder={field.placeholder}
          onChange={onChange}
        />
      </Field>
    );
  }

  if (field.type === 'repeater') {
    return (
      <Field label={field.label} required={field.required} help={field.help} error={error} className={span}>
        <Repeater
          rows={Array.isArray(value) ? value : []}
          subFields={field.subFields ?? []}
          onChange={onChange}
        />
      </Field>
    );
  }

  if (field.type === 'image') {
    return (
      <Field label={field.label} required={field.required} help={field.help} error={error} className={span}>
        <div className="flex items-center gap-3">
          <Thumb src={value} alt={field.label} />
          <input
            className={inputClass}
            value={value ?? ''}
            placeholder="/nama-berkas.jpg"
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      </Field>
    );
  }

  if (field.type === 'select') {
    return (
      <Field label={field.label} required={field.required} help={field.help} error={error} className={span}>
        <select
          className={inputClass}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
        >
          {field.options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </Field>
    );
  }

  if (field.type === 'textarea') {
    return (
      <Field label={field.label} required={field.required} help={field.help} error={error} className={span}>
        <textarea
          className={cn(inputClass, 'h-24 resize-y py-2.5')}
          value={value ?? ''}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      </Field>
    );
  }

  if (field.type === 'number') {
    return (
      <Field label={field.label} required={field.required} help={field.help} error={error} className={span}>
        <div className="relative">
          {field.prefix && (
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-text-secondary">
              {field.prefix}
            </span>
          )}
          <input
            type="number"
            className={cn(inputClass, field.prefix && 'pl-10')}
            value={value ?? ''}
            min={field.min}
            max={field.max}
            step={field.step ?? 1}
            onChange={(e) =>
              onChange(e.target.value === '' ? '' : Number(e.target.value))
            }
          />
        </div>
      </Field>
    );
  }

  return (
    <Field label={field.label} required={field.required} help={field.help} error={error} className={span}>
      <input
        className={inputClass}
        value={value ?? ''}
        placeholder={field.placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </Field>
  );
}

function TagsInput({
  value,
  placeholder,
  onChange,
}: {
  value: string[];
  placeholder?: string;
  onChange: (value: string[]) => void;
}) {
  const [draft, setDraft] = useState('');

  function commit() {
    const entry = draft.trim();
    if (!entry) return;
    if (!value.includes(entry)) onChange([...value, entry]);
    setDraft('');
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      commit();
    } else if (e.key === 'Backspace' && !draft && value.length) {
      onChange(value.slice(0, -1));
    }
  }

  return (
    <div className="rounded-xl border border-border-main bg-bg-main p-2">
      {value.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-1.5">
          {value.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-full bg-black/6 px-2.5 py-1 text-xs font-bold dark:bg-white/10"
            >
              {tag}
              <button
                type="button"
                onClick={() => onChange(value.filter((t) => t !== tag))}
                className="text-text-secondary hover:text-red-500"
                aria-label={`Hapus ${tag}`}
              >
                <PiX className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
      <input
        className="w-full bg-transparent px-1.5 py-1 text-sm outline-none placeholder:text-text-secondary/60"
        value={draft}
        placeholder={placeholder ?? 'Ketik lalu tekan Enter'}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={onKeyDown}
        onBlur={commit}
      />
    </div>
  );
}

function Repeater({
  rows,
  subFields,
  onChange,
}: {
  rows: any[];
  subFields: { key: string; label: string; type: 'text' | 'number' }[];
  onChange: (rows: any[]) => void;
}) {
  function update(index: number, key: string, value: unknown) {
    onChange(rows.map((row, i) => (i === index ? { ...row, [key]: value } : row)));
  }

  function add() {
    const blank: Record<string, unknown> = {};
    subFields.forEach((f) => (blank[f.key] = f.type === 'number' ? 0 : ''));
    onChange([...rows, blank]);
  }

  return (
    <div className="space-y-2">
      {rows.map((row, index) => (
        <div
          key={index}
          className="flex items-end gap-2 rounded-xl border border-border-main bg-bg-main p-2"
        >
          {subFields.map((sub) => (
            <label key={sub.key} className="min-w-0 flex-1">
              <span className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-text-secondary">
                {sub.label}
              </span>
              <input
                type={sub.type === 'number' ? 'number' : 'text'}
                className="h-9 w-full rounded-lg border border-border-main bg-bg-card px-2.5 text-sm outline-none focus:border-lex-purple"
                value={row[sub.key] ?? ''}
                onChange={(e) =>
                  update(
                    index,
                    sub.key,
                    sub.type === 'number'
                      ? e.target.value === ''
                        ? ''
                        : Number(e.target.value)
                      : e.target.value,
                  )
                }
              />
            </label>
          ))}
          <button
            type="button"
            onClick={() => onChange(rows.filter((_, i) => i !== index))}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-text-secondary hover:bg-red-500/10 hover:text-red-600"
            aria-label="Hapus baris"
          >
            <PiTrash className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-border-main px-3 py-1.5 text-xs font-bold text-text-secondary hover:border-lex-purple hover:text-lex-purple"
      >
        <PiPlus className="h-3.5 w-3.5" />
        Tambah baris
      </button>
    </div>
  );
}
