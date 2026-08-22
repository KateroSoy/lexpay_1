# LEXPAY — Demo Storefront + CMS

Satu aplikasi Vite yang berisi dua bagian:

| Bagian | Rute | Isi |
|---|---|---|
| **Storefront** | `/` | Toko LEXPAY: home, explore, detail produk/layanan, keranjang, checkout, pesanan, akun |
| **CMS demo** | `/admin` | Dashboard, Produk, Layanan, Produk Digital, Pesanan |

Ini demo UI. Tidak ada server, tidak ada database. Data awal berasal dari
`src/data/mockData.ts`, disimpan di `localStorage` browser, dan bisa
dikembalikan lewat tombol **Reset data demo** di sidebar CMS.

## Jalankan di lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:3000` untuk toko dan `http://localhost:3000/admin`
untuk CMS.

Kredensial demo (sudah terisi otomatis di form login):

```
demo@lexpay.id / demo
```

Perintah lain:

```bash
npm run build     # bundel produksi ke dist/
npm run preview   # sajikan hasil build
npm run lint      # tsc --noEmit
npm test          # vitest
```

## Deploy ke Vercel

Import repo ini ke Vercel dengan pengaturan berikut:

| Setelan | Nilai |
|---|---|
| Framework Preset | Vite |
| Root Directory | folder ini (`demo/1`) |
| Build Command | `npm run build` |
| Output Directory | `dist` |

Tidak ada environment variable yang wajib diisi.

`vercel.json` sudah mengarahkan semua path ke `index.html`, sehingga
membuka `/admin/products` langsung dari URL tetap bekerja. `.vercelignore`
menyingkirkan folder PHP, arsip, dan skrip bantu dari bundel yang diunggah.

## Bagaimana CMS terhubung ke toko

`src/lib/api.ts` adalah satu-satunya pintu data storefront. Ia membaca dari
`src/lib/cmsStore.ts`, store zustand yang di-seed dari `mockData.ts`. Jadi
mengubah harga produk di `/admin/products` langsung terlihat di halaman
produk pada storefront. Selama tidak ada yang diubah, isinya sama persis
dengan data mock aslinya.

CMS dibangun sebagai mesin resource generik, mengikuti pola Filament: satu
tabel dan satu form dipakai bersama, dikendalikan deskriptor per-resource di
`src/pages/admin/resources/`.

## Catatan

`cms_online_store_php/` berisi backend Laravel + Filament dan **tidak ikut
di-deploy** — Vercel tidak menjalankan PHP. Backend itu punya petunjuk
setup-nya sendiri di `cms_online_store_php/README.md`.
