-- CreateTable
CREATE TABLE "public"."tbl_user" (
    "id_user" SERIAL NOT NULL,
    "nama_user" VARCHAR(200) NOT NULL,

    CONSTRAINT "tbl_user_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "public"."tbl_kategori" (
    "id_kategori" SERIAL NOT NULL,
    "nama_kategori" VARCHAR(200) NOT NULL,

    CONSTRAINT "tbl_kategori_pkey" PRIMARY KEY ("id_kategori")
);

-- CreateTable
CREATE TABLE "public"."tbl_produk" (
    "id_produk" SERIAL NOT NULL,
    "id_kategori" INTEGER NOT NULL,
    "nama_produk" VARCHAR(200) NOT NULL,
    "kode_produk" VARCHAR(50) NOT NULL,
    "foto_produk" VARCHAR(50) NOT NULL,
    "tgl_register" DATE NOT NULL,

    CONSTRAINT "tbl_produk_pkey" PRIMARY KEY ("id_produk")
);

-- CreateTable
CREATE TABLE "public"."tbl_stok" (
    "id_stok" SERIAL NOT NULL,
    "id_produk" INTEGER NOT NULL,
    "jumlah_barang" INTEGER NOT NULL,
    "tgl_update" DATE NOT NULL,

    CONSTRAINT "tbl_stok_pkey" PRIMARY KEY ("id_stok")
);

-- CreateIndex
CREATE INDEX "tbl_produk_id_kategori_idx" ON "public"."tbl_produk"("id_kategori");

-- CreateIndex
CREATE INDEX "tbl_stok_id_produk_idx" ON "public"."tbl_stok"("id_produk");

-- AddForeignKey
ALTER TABLE "public"."tbl_produk" ADD CONSTRAINT "tbl_produk_id_kategori_fkey" FOREIGN KEY ("id_kategori") REFERENCES "public"."tbl_kategori"("id_kategori") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tbl_stok" ADD CONSTRAINT "tbl_stok_id_produk_fkey" FOREIGN KEY ("id_produk") REFERENCES "public"."tbl_produk"("id_produk") ON DELETE RESTRICT ON UPDATE CASCADE;
