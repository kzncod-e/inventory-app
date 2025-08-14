import { NextRequest } from "next/server";
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
    return new Response(
      JSON.stringify({
        message: "User already exists",
      }),
      {
        status: 409,
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
  return new Response(
    JSON.stringify({
      data: user,
      message: "success create new user",
    }),
    {
      status: 201,
      headers: { "Content-Type": "application/json" },
    }
  );
}
export async function GET(request: NextRequest) {
  const { nama_user, password } = await request.json();

  const user = await prisma.user.findFirst({
    where: {
      nama_user,
      password,
    },
  });
  if (!user) {
    return new Response(
      JSON.stringify({
        message: "Invalid username or password",
      }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  return new Response(
    JSON.stringify({
      data: user,
      message: "Login success",
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
