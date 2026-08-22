import type { ReactNode } from 'react';
import type { IconType } from 'react-icons';
import type { Collection } from '../../lib/cmsStore';

export type FieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'select'
  | 'tags'
  | 'switch'
  | 'image'
  | 'repeater';

export interface SubFieldDef {
  key: string;
  label: string;
  type: 'text' | 'number';
}

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  help?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  prefix?: string;
  /** 1 = half width on desktop, 2 = full width. Defaults to 1. */
  colSpan?: 1 | 2;
  /** Repeater rows. */
  subFields?: SubFieldDef[];
  /** Auto-fill this field by slugifying another field until the user edits it. */
  slugFrom?: string;
  /** Must be unique across the collection. */
  unique?: boolean;
  min?: number;
  max?: number;
  step?: number;
}

export interface ColumnDef<T = any> {
  key: string;
  label: string;
  align?: 'left' | 'right' | 'center';
  render?: (row: T) => ReactNode;
  /** Value used for sorting; defaults to row[key]. */
  sortValue?: (row: T) => string | number;
  sortable?: boolean;
  className?: string;
}

export interface FilterDef {
  key: string;
  label: string;
  options: { value: string; label: string }[];
}

export interface ResourceDef<T = any> {
  /** URL segment under /admin. */
  slug: string;
  collection: Collection;
  label: string;
  singular: string;
  description: string;
  icon: IconType;
  idPrefix: string;
  searchKeys: string[];
  columns: ColumnDef<T>[];
  fields: FieldDef[];
  filters?: FilterDef[];
  /** Blank record for the create form. */
  defaults: () => Record<string, any>;
  /** Last chance to derive fields (e.g. an order total) before writing. */
  beforeSave?: (values: Record<string, any>) => Record<string, any>;
  /** Orders are demo records; new ones are not created by hand. */
  canCreate?: boolean;
}
