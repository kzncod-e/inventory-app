import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
  const { id_produk, jumlah_barang } = await req.json();

  const stok = await prisma.stok.create({
    data: {
      id_produk: Number(id_produk),
      jumlah_barang: Number(jumlah_barang),
      tgl_update: new Date(), // or set this from req.json() if provided
    },
  });

  return NextResponse.json(
    {
      data: stok,
      message: "Stock created successfully",
    },
    {
      status: 201,
      headers: { "Content-Type": "application/json" },
    }
  );
}
