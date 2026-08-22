import { PiReceipt } from 'react-icons/pi';
import type { ResourceDef } from '../types';
import type { Order, OrderStatus } from '../../../lib/cmsStore';
import { rupiah, formatDate } from '../../../lib/format';
import { Badge } from '../ui';

export const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Menunggu bayar',
  paid: 'Dibayar',
  processing: 'Diproses',
  completed: 'Selesai',
  cancelled: 'Dibatalkan',
};

export const STATUS_TONES: Record<OrderStatus, 'amber' | 'blue' | 'purple' | 'green' | 'red'> = {
  pending: 'amber',
  paid: 'blue',
  processing: 'purple',
  completed: 'green',
  cancelled: 'red',
};

const STATUS_OPTIONS = (Object.keys(STATUS_LABELS) as OrderStatus[]).map((value) => ({
  value,
  label: STATUS_LABELS[value],
}));

const CHANNELS = [
  'QRIS',
  'GoPay',
  'ShopeePay',
  'BCA Virtual Account',
  'BNI Virtual Account',
  'BRI Virtual Account',
  'Mandiri Bill Payment',
];

export const ordersResource: ResourceDef<Order> = {
  slug: 'orders',
  collection: 'orders',
  label: 'Pesanan',
  singular: 'Pesanan',
  description: 'Transaksi masuk beserta status pembayarannya.',
  icon: PiReceipt,
  idPrefix: 'o',
  canCreate: false,
  searchKeys: ['code', 'customerName', 'customerPhone', 'channel'],
  filters: [
    { key: 'status', label: 'Status', options: STATUS_OPTIONS },
    { key: 'channel', label: 'Metode bayar', options: CHANNELS.map((c) => ({ value: c, label: c })) },
  ],
  columns: [
    {
      key: 'code',
      label: 'Kode',
      sortable: true,
      render: (row) => <span className="font-bold">{row.code}</span>,
    },
    {
      key: 'customerName',
      label: 'Pelanggan',
      sortable: true,
      render: (row) => (
        <div className="min-w-0">
          <div className="truncate font-bold">{row.customerName}</div>
          <div className="truncate text-[11px] text-text-secondary">
            {row.customerPhone}
          </div>
        </div>
      ),
    },
    { key: 'channel', label: 'Metode bayar' },
    {
      key: 'items',
      label: 'Item',
      align: 'right',
      sortable: true,
      sortValue: (row) => row.items?.length ?? 0,
      render: (row) => (row.items?.length ?? 0) + ' item',
    },
    {
      key: 'total',
      label: 'Total',
      align: 'right',
      sortable: true,
      render: (row) => (
        <span className="font-bold tabular-nums">{rupiah(row.total)}</span>
      ),
    },
    {
      key: 'createdAt',
      label: 'Tanggal',
      sortable: true,
      sortValue: (row) => new Date(row.createdAt).getTime(),
      render: (row) => formatDate(row.createdAt),
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <Badge tone={STATUS_TONES[row.status]}>{STATUS_LABELS[row.status]}</Badge>
      ),
    },
  ],
  fields: [
    { key: 'code', label: 'Kode pesanan', type: 'text', required: true, unique: true },
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      options: STATUS_OPTIONS,
    },
    { key: 'customerName', label: 'Nama pelanggan', type: 'text', required: true },
    { key: 'customerPhone', label: 'Nomor WhatsApp', type: 'text', placeholder: '628...' },
    {
      key: 'channel',
      label: 'Metode bayar',
      type: 'select',
      required: true,
      options: CHANNELS.map((c) => ({ value: c, label: c })),
    },
    {
      key: 'items',
      label: 'Item pesanan',
      type: 'repeater',
      colSpan: 2,
      subFields: [
        { key: 'name', label: 'Nama item', type: 'text' },
        { key: 'quantity', label: 'Qty', type: 'number' },
        { key: 'price', label: 'Harga satuan', type: 'number' },
      ],
      help: 'Total pesanan dihitung ulang dari daftar ini saat disimpan.',
    },
  ],
  beforeSave: (values) => {
    const items = Array.isArray(values.items) ? values.items : [];
    return {
      ...values,
      items: items.map((it: any) => ({
        type: it.type ?? 'product',
        name: it.name ?? '',
        quantity: Number(it.quantity) || 1,
        price: Number(it.price) || 0,
      })),
      total: items.reduce(
        (sum: number, it: any) => sum + (Number(it.price) || 0) * (Number(it.quantity) || 1),
        0,
      ),
    };
  },
  defaults: () => ({
    code: '',
    customerName: '',
    customerPhone: '',
    channel: CHANNELS[0],
    status: 'pending' as OrderStatus,
    total: 0,
    createdAt: new Date().toISOString(),
    items: [],
  }),
};
