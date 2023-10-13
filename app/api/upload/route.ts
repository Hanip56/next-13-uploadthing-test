import prisma from "@/lib/db";
import { existsSync } from "fs";
import { unlink, writeFile } from "fs/promises";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import path from "path";

export async function PATCH(req: Request) {
  const { filename } = await req.json();
  const session = await getServerSession();

  if (!filename) {
    return new NextResponse("Filename is required", { status: 401 });
  }

  if (!session || !session.user?.email) {
    return new NextResponse("Unauthenticated", { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    return new NextResponse("Unauthenticated", { status: 401 });
  }

  try {
    const filePath = path.join(process.cwd(), "public", filename);
    if (existsSync(filePath)) {
      await unlink(filePath);
    }
    const updatedUser = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        uploaded: user.uploaded.filter((name) => name !== filename),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("[UPLOAD_PATCH]", error);
    return new NextResponse("Failed to delete", { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession();

  if (!session || !session.user?.email) {
    return new NextResponse("Unauthenticated", { status: 401 });
  }

  try {
    const data = await req.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return new NextResponse("Error no file selected", { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = `${uniqueSuffix}-${file.name}`;

    const destinationPath = path.join(process.cwd(), "public", filename);
    await writeFile(destinationPath, buffer);

    const updatedUser = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        uploaded: [...user.uploaded, filename],
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log("[UPLOAD_POST]", error);
    return new NextResponse("Server error", { status: 500 });
  }
}
