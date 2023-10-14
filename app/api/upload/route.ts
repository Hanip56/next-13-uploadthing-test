import prisma from "@/lib/db";
import { utapi } from "@/lib/uploadThingServer";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

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
    const uploadThingRes = await utapi.deleteFiles(filename);
    console.log({ uploadThingRes });

    await prisma.user.update({
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
    const body = await req.json();
    const { image } = body;

    if (!image) {
      return new NextResponse("Image is required", { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const updatedUser = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        uploaded: [...user.uploaded, image],
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log("[UPLOAD_POST]", error);
    return new NextResponse("Server error", { status: 500 });
  }
}
