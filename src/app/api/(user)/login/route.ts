import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
export async function POST(request: NextRequest) {
  const { nama_user, password } = await request.json();

  const user = await prisma.user.findFirst({
    where: {
      nama_user,
    },
  });
  if (!user) {
    return NextResponse.json(
      { message: "User not found", data: null },
      { status: 401 }
    );
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return NextResponse.json(
      { message: "Invalid username or password" },
      { status: 401 }
    );
  }
  return NextResponse.json(
    {
      data: user.nama_user,
      message: "Login success",
    },
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
