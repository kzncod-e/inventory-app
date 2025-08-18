export type Kategori = {
  id_kategori: number;
  nama_kategori: string;
  produk: Produk[];
  code_category: string;
};

export type Stok = {
  id_stok: number;
  id_produk: number;
  jumlah_barang: number;
  tgl_update: string; // pakai string untuk JSON (ISO date)
};
export type StokReq = {
  id_produk: number;
  jumlah_barang: number;
};
export type Produk = {
  id_produk: number;
  id_kategori: number;
  nama_produk: string;
  kode_produk?: string;
  foto_produk: string[];
  tgl_register: string; // ISO date format
  kategori?: Kategori; // optional jika include relasi
  stok?: Stok[]; // optional jika include relasi
};
export type Product = Omit<
  Produk,
  "id_produk" | "tgl_register" | "kode_produk" | "stok"
>;

export type ProdukSortField =
  | "id_produk"
  | "id_kategori"
  | "nama_produk"
  | "kode_produk"
  | "tgl_register";
