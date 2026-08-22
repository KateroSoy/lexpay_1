# Arsip

Implementasi CMS awal yang tidak terpakai, dipindahkan ke sini pada 2026-08-22.

`admin-lama/` berisi `Products.tsx`, `Orders.tsx`, dan `AdminLayout.tsx`. File
ini tidak pernah diimpor dari `App.tsx`, memanggil `lexpayApi.getHomePayload()`
yang tidak ada, dan membaca field `title` / `category_id` yang bukan milik tipe
`Product`. CMS yang dipakai sekarang ada di `src/pages/admin/`.

Folder ini dikecualikan dari `tsconfig.json` dan `.vercelignore`.
