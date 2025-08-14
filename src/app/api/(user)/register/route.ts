import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
const prisma = new PrismaClient();
export async function POST(request: NextRequest) {
  const { nama_user, password } = await request.json();

  const hashpassword = await bcrypt.hash(password, 10);
  const unique = await prisma.user.findFirst({
    where: {
      nama_user,
    },
  });
  if (unique) {
    return NextResponse.json(
      {
        message: "User already exists",
      },
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  const user = await prisma.user.create({
    data: {
      nama_user,
      password: hashpassword,
    },
  });
  return NextResponse.json(
    {
      data: user,
      message: "success create new user",
    },
    {
      status: 201,
    }
  );
}
