import ImageItem from "@/components/ImageItem";
import Navbar from "@/components/Navbar";
import UploadComp from "@/components/UploadComp";
import UserCard from "@/components/UserCard";
import prisma from "@/lib/db";
import { options } from "@/lib/nextAuthOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const Home = async () => {
  const session = await getServerSession(options);

  if (!session || !session.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      uploaded: true,
    },
  });

  return (
    <div className="w-[100%] px-2 md:px-4 xl:px-0">
      <Navbar />
      <UserCard session={session} />
      <div className="w-full flex gap-4 max-w-4xl mx-auto my-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-4">Uploaded files</h3>
          <div className="grid grid-cols-2 gap-2">
            {user && user.uploaded?.length > 0 ? (
              user.uploaded.map((src, i) => <ImageItem key={i} src={src} />)
            ) : (
              <p>There&apos;s still no file</p>
            )}
          </div>
        </div>
        <UploadComp />
      </div>
    </div>
  );
};

export default Home;
