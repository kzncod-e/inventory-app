import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { log } from "console";

const prisma = new PrismaClient();

export async function GET() {
  const categories = await prisma.kategori.findMany({
    include: {
      produk: true,
    },
  });

  return NextResponse.json(
    {
      data: categories,
      message: "Categories retrieved successfully",
    },
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export async function POST(req: NextRequest) {
  const { nama_kategori, code_category } = await req.json();
  console.log("Creating category:", { nama_kategori, code_category });

  const category = await prisma.kategori.create({
    data: {
      nama_kategori,
      code_category,
    },
  });

  return NextResponse.json(
    {
      data: category,
      message: "Category created successfully",
    },
    {
      status: 201,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export async function PUT(req: NextRequest) {
  const { id_kategori, nama_kategori } = await req.json();

  const category = await prisma.kategori.update({
    where: { id_kategori: Number(id_kategori) },
    data: { nama_kategori },
  });

  return NextResponse.json(
    {
      data: category,
      message: "Category updated successfully",
    },
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export async function DELETE(req: NextRequest) {
  const { id_kategori } = await req.json();

  const category = await prisma.kategori.delete({
    where: { id_kategori: Number(id_kategori) },
  });

  return NextResponse.json(
    {
      data: category,
      message: "Category deleted successfully",
    },
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
