import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id_kategori, nama_produk, foto_produk } = body;

    // Ambil kategori untuk prefix kode
    const kategori = await prisma.kategori.findUnique({
      where: { id_kategori },
    });

    if (!kategori) {
      return NextResponse.json(
        { message: "Kategori tidak ditemukan" },
        { status: 404 }
      );
    }

    // Hitung jumlah produk di kategori ini
    const countProduk = await prisma.produk.count({
      where: { id_kategori },
    });

    // Generate kode produk
    const prefix = kategori.nama_kategori.substring(0, 2).toUpperCase(); // contoh: "EL" untuk Electronics
    const kode_produk = `${prefix}${String(countProduk + 1).padStart(3, "0")}`;

    // Simpan produk baru
    const newProduk = await prisma.produk.create({
      data: {
        id_kategori,
        nama_produk,
        kode_produk,
        foto_produk,
        tgl_register: new Date(),
      },
    });

    return NextResponse.json(
      {
        message: "Produk berhasil ditambahkan",
        data: newProduk,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const products = await prisma.produk.findMany({
    include: {
      kategori: true,
      stok: {
        // ambil stok terbaru
      }, // ambil relasi kategori
    },
  });

  return NextResponse.json(
    {
      data: products,
      message: "Products retrieved successfully",
    },
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id_produk, id_kategori, nama_produk, foto_produk } = body;

    // Update produk
    const updatedProduk = await prisma.produk.update({
      where: { id_produk: Number(id_produk) },
      data: {
        id_kategori: Number(id_kategori),
        nama_produk,
        foto_produk,
      },
    });

    return NextResponse.json(
      {
        message: "Produk berhasil diperbarui",
        data: updatedProduk,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id_produk } = await req.json();

    // Hapus produk
    await prisma.produk.delete({
      where: { id_produk: Number(id_produk) },
    });

    return NextResponse.json(
      {
        message: "Produk berhasil dihapus",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}
