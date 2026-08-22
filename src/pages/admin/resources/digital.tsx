import { PiLightning } from 'react-icons/pi';
import type { ResourceDef } from '../types';
import type { DigitalProduct } from '../../../data/mockData';
import { rupiah } from '../../../lib/format';
import { Badge, TitleCell } from '../ui';

const CATEGORIES = ['Game', 'Mobile', 'Streaming', 'Voucher', 'Utility'];

/** Cheapest denomination, used for the "mulai dari" column. */
function lowestPrice(row: DigitalProduct): number {
  if (!row.denominations?.length) return 0;
  return Math.min(...row.denominations.map((d) => d.price));
}

export const digitalResource: ResourceDef<DigitalProduct> = {
  slug: 'digital',
  collection: 'digital',
  label: 'Produk Digital',
  singular: 'Produk Digital',
  description: 'Top-up, pulsa dan voucher dengan pengiriman instan.',
  icon: PiLightning,
  idPrefix: 'd',
  searchKeys: ['name', 'provider', 'category'],
  filters: [
    {
      key: 'category',
      label: 'Kategori',
      options: CATEGORIES.map((c) => ({ value: c, label: c })),
    },
  ],
  columns: [
    {
      key: 'name',
      label: 'Item',
      sortable: true,
      render: (row) => <TitleCell image={row.image} title={row.name} />,
    },
    { key: 'provider', label: 'Provider', sortable: true },
    { key: 'category', label: 'Kategori', sortable: true },
    {
      key: 'denominations',
      label: 'Nominal',
      align: 'right',
      sortable: true,
      sortValue: (row) => row.denominations?.length ?? 0,
      render: (row) => (row.denominations?.length ?? 0) + ' nominal',
    },
    {
      key: 'lowest',
      label: 'Mulai dari',
      align: 'right',
      sortable: true,
      sortValue: lowestPrice,
      render: (row) => (
        <span className="font-bold tabular-nums">{rupiah(lowestPrice(row))}</span>
      ),
    },
    {
      key: 'instantDelivery',
      label: 'Instan',
      render: (row) => (
        <Badge tone={row.instantDelivery ? 'green' : 'gray'}>
          {row.instantDelivery ? 'Ya' : 'Tidak'}
        </Badge>
      ),
    },
  ],
  fields: [
    { key: 'name', label: 'Nama item', type: 'text', required: true, colSpan: 2 },
    { key: 'provider', label: 'Provider', type: 'text', required: true },
    {
      key: 'category',
      label: 'Kategori',
      type: 'select',
      required: true,
      options: CATEGORIES.map((c) => ({ value: c, label: c })),
    },
    {
      key: 'instantDelivery',
      label: 'Pengiriman instan',
      type: 'switch',
      help: 'Kode dikirim otomatis setelah pembayaran.',
    },
    { key: 'image', label: 'Gambar', type: 'image', colSpan: 2 },
    {
      key: 'denominations',
      label: 'Nominal',
      type: 'repeater',
      colSpan: 2,
      subFields: [
        { key: 'id', label: 'Kode', type: 'text' },
        { key: 'name', label: 'Nama nominal', type: 'text' },
        { key: 'price', label: 'Harga', type: 'number' },
      ],
      help: 'Minimal satu nominal agar item bisa dibeli di storefront.',
    },
  ],
  defaults: () => ({
    name: '',
    provider: '',
    category: CATEGORIES[0],
    instantDelivery: true,
    image: '',
    denominations: [],
  }),
};
