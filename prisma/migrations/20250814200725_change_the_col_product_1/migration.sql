/*
  Warnings:

  - The `foto_produk` column on the `tbl_produk` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `kode_produk` on the `tbl_produk` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE "public"."tbl_produk" DROP COLUMN "foto_produk",
ADD COLUMN     "foto_produk" VARCHAR(50)[],
ALTER COLUMN "kode_produk" SET NOT NULL,
ALTER COLUMN "kode_produk" SET DATA TYPE VARCHAR(50);
