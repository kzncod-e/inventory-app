export type Kategori = {
  id_kategori: number;
  nama_kategori: string;
};

export type Stok = {
  id_stok: number;
  id_produk: number;
  jumlah_barang: number;
  tgl_update: string; // pakai string untuk JSON (ISO date)
};

export type Produk = {
  id_produk: number;
  id_kategori: number;
  nama_produk: string;
  kode_produk?: string;
  foto_produk: string;
  tgl_register: string; // ISO date format
  kategori?: Kategori; // optional jika include relasi
  stok?: Stok[]; // optional jika include relasi
};
export type Product = Omit<
  Produk,
  "id_produk" | "tgl_register" | "kode_produk" | "stok"
>;
