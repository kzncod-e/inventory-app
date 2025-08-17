-- DropForeignKey
ALTER TABLE "public"."tbl_stok" DROP CONSTRAINT "tbl_stok_id_produk_fkey";

-- AddForeignKey
ALTER TABLE "public"."tbl_stok" ADD CONSTRAINT "tbl_stok_id_produk_fkey" FOREIGN KEY ("id_produk") REFERENCES "public"."tbl_produk"("id_produk") ON DELETE CASCADE ON UPDATE CASCADE;
