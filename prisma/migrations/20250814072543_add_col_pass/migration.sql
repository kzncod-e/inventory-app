/*
  Warnings:

  - Added the required column `password` to the `tbl_user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."tbl_user" ADD COLUMN     "password" VARCHAR(200) NOT NULL;
