import { PiTote } from 'react-icons/pi';
import type { ResourceDef } from '../types';
import type { Product } from '../../../data/mockData';
import { rupiah } from '../../../lib/format';
import { Badge, TitleCell } from '../ui';

const CATEGORIES = ['Electronics', 'Pets', 'Food', 'Fashion', 'Home', 'Beauty'];

export const productsResource: ResourceDef<Product> = {
  slug: 'products',
  collection: 'products',
  label: 'Produk',
  singular: 'Produk',
  description: 'Katalog barang fisik yang tampil di storefront.',
  icon: PiTote,
  idPrefix: 'p',
  searchKeys: ['name', 'brand', 'category', 'slug'],
  filters: [
    {
      key: 'category',
      label: 'Kategori',
      options: CATEGORIES.map((c) => ({ value: c, label: c })),
    },
    {
      key: 'fulfillment',
      label: 'Pengiriman',
      options: [
        { value: 'delivery', label: 'Delivery' },
        { value: 'instant', label: 'Instant' },
      ],
    },
  ],
  columns: [
    {
      key: 'name',
      label: 'Produk',
      sortable: true,
      render: (row) => (
        <TitleCell image={row.image} title={row.name} subtitle={row.slug} />
      ),
    },
    { key: 'brand', label: 'Brand', sortable: true },
    { key: 'category', label: 'Kategori', sortable: true },
    {
      key: 'price',
      label: 'Harga',
      align: 'right',
      sortable: true,
      render: (row) => (
        <span className="font-bold tabular-nums">{rupiah(row.price)}</span>
      ),
    },
    {
      key: 'stock',
      label: 'Stok',
      align: 'right',
      sortable: true,
      render: (row) => (
        <span
          className={
            row.stock <= 20
              ? 'font-bold tabular-nums text-amber-600 dark:text-amber-400'
              : 'tabular-nums'
          }
        >
          {row.stock}
        </span>
      ),
    },
    {
      key: 'rating',
      label: 'Rating',
      align: 'right',
      sortable: true,
      render: (row) => <span className="tabular-nums">{row.rating}</span>,
    },
    {
      key: 'fulfillment',
      label: 'Pengiriman',
      render: (row) => (
        <Badge tone={row.fulfillment === 'instant' ? 'purple' : 'gray'}>
          {row.fulfillment === 'instant' ? 'Instant' : 'Delivery'}
        </Badge>
      ),
    },
  ],
  fields: [
    { key: 'name', label: 'Nama produk', type: 'text', required: true, colSpan: 2 },
    {
      key: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      unique: true,
      slugFrom: 'name',
      help: 'Dipakai di URL storefront, misalnya /products/nama-produk',
    },
    { key: 'brand', label: 'Brand', type: 'text', required: true },
    {
      key: 'category',
      label: 'Kategori',
      type: 'select',
      required: true,
      options: CATEGORIES.map((c) => ({ value: c, label: c })),
    },
    {
      key: 'fulfillment',
      label: 'Pengiriman',
      type: 'select',
      required: true,
      options: [
        { value: 'delivery', label: 'Delivery' },
        { value: 'instant', label: 'Instant' },
      ],
    },
    { key: 'price', label: 'Harga', type: 'number', required: true, prefix: 'Rp', min: 0 },
    {
      key: 'salePrice',
      label: 'Harga promo',
      type: 'number',
      prefix: 'Rp',
      min: 0,
      help: 'Kosongkan bila tidak ada promo.',
    },
    { key: 'stock', label: 'Stok', type: 'number', required: true, min: 0 },
    { key: 'rating', label: 'Rating', type: 'number', min: 0, max: 5, step: 0.1 },
    { key: 'reviewCount', label: 'Jumlah ulasan', type: 'number', min: 0 },
    { key: 'image', label: 'Gambar utama', type: 'image', colSpan: 2 },
    {
      key: 'variants',
      label: 'Varian',
      type: 'tags',
      colSpan: 2,
      help: 'Tekan Enter untuk menambah. Contoh: Black, White.',
    },
    {
      key: 'gallery',
      label: 'Galeri',
      type: 'tags',
      colSpan: 2,
      help: 'Path gambar, satu per entri.',
    },
  ],
  defaults: () => ({
    name: '',
    slug: '',
    brand: '',
    category: CATEGORIES[0],
    fulfillment: 'delivery',
    price: 0,
    stock: 0,
    rating: 5,
    reviewCount: 0,
    image: '',
    variants: [],
    gallery: [],
  }),
};
