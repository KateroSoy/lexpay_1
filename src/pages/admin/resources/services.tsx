import { PiWrench } from 'react-icons/pi';
import type { ResourceDef } from '../types';
import type { Service } from '../../../data/mockData';
import { rupiah } from '../../../lib/format';
import { TitleCell } from '../ui';

const CATEGORIES = ['Home Service', 'Security', 'Beauty', 'Automotive', 'Cleaning', 'Pets'];

export const servicesResource: ResourceDef<Service> = {
  slug: 'services',
  collection: 'services',
  label: 'Layanan',
  singular: 'Layanan',
  description: 'Jasa on-site beserta paket harga dan jadwalnya.',
  icon: PiWrench,
  idPrefix: 's',
  searchKeys: ['name', 'provider', 'category', 'slug'],
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
      label: 'Layanan',
      sortable: true,
      render: (row) => (
        <TitleCell image={row.image} title={row.name} subtitle={row.slug} />
      ),
    },
    { key: 'provider', label: 'Penyedia', sortable: true },
    { key: 'category', label: 'Kategori', sortable: true },
    {
      key: 'startingPrice',
      label: 'Mulai dari',
      align: 'right',
      sortable: true,
      render: (row) => (
        <span className="font-bold tabular-nums">{rupiah(row.startingPrice)}</span>
      ),
    },
    {
      key: 'options',
      label: 'Paket',
      align: 'right',
      sortable: true,
      sortValue: (row) => row.options?.length ?? 0,
      render: (row) => (row.options?.length ?? 0) + ' paket',
    },
    { key: 'duration', label: 'Durasi' },
    { key: 'rating', label: 'Rating', align: 'right', sortable: true },
  ],
  fields: [
    { key: 'name', label: 'Nama layanan', type: 'text', required: true, colSpan: 2 },
    {
      key: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      unique: true,
      slugFrom: 'name',
      help: 'Dipakai di URL storefront, misalnya /services/nama-layanan',
    },
    { key: 'provider', label: 'Penyedia', type: 'text', required: true },
    {
      key: 'category',
      label: 'Kategori',
      type: 'select',
      required: true,
      options: CATEGORIES.map((c) => ({ value: c, label: c })),
    },
    { key: 'duration', label: 'Estimasi durasi', type: 'text', placeholder: '1-2 Hours' },
    {
      key: 'startingPrice',
      label: 'Harga mulai',
      type: 'number',
      required: true,
      prefix: 'Rp',
      min: 0,
    },
    { key: 'rating', label: 'Rating', type: 'number', min: 0, max: 5, step: 0.1 },
    { key: 'description', label: 'Deskripsi', type: 'textarea', colSpan: 2 },
    { key: 'image', label: 'Gambar', type: 'image', colSpan: 2 },
    {
      key: 'options',
      label: 'Paket layanan',
      type: 'repeater',
      colSpan: 2,
      subFields: [
        { key: 'name', label: 'Nama paket', type: 'text' },
        { key: 'price', label: 'Harga', type: 'number' },
      ],
      help: 'Harga terendah sebaiknya sama dengan harga mulai.',
    },
    {
      key: 'availability',
      label: 'Jam tersedia',
      type: 'tags',
      colSpan: 2,
      help: 'Contoh: 09:00, 11:30, 14:00.',
    },
    { key: 'coverageArea', label: 'Area layanan', type: 'tags', colSpan: 2 },
  ],
  defaults: () => ({
    name: '',
    slug: '',
    provider: '',
    category: CATEGORIES[0],
    description: '',
    startingPrice: 0,
    duration: '',
    image: '',
    availability: [],
    coverageArea: [],
    options: [],
    rating: 5,
  }),
};
