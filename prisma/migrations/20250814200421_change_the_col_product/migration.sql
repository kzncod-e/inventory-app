/*
  Warnings:

  - The `kode_produk` column on the `tbl_produk` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."tbl_produk" DROP COLUMN "kode_produk",
ADD COLUMN     "kode_produk" VARCHAR(50)[];
