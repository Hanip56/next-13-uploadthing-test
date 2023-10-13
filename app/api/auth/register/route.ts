import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const body = await req.json();
  const { username, email, password } = body;

  if (!username || !email || !password) {
    return new NextResponse("Please add all fields", { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return new NextResponse("User already exist", { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        name: username,
        email,
        password: hashedPass,
      },
    });

    newUser.password = null;
    return NextResponse.json(newUser);
  } catch (error) {
    console.log(`[REGISTER_POST]`, error);
  }
}
