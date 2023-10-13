import Navbar from "@/components/Navbar";
import UserCard from "@/components/UserCard";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const Home = async () => {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/login");
  }

  return (
    <div className="w-[100%] px-2 md:px-4 xl:px-0">
      <Navbar />
      <UserCard session={session} />
      <div className="text-center space-y-4">
        <h2 className="text-xl font-semibold">Uploaded files</h2>
        <div className="grid grid-cols-4 gap-4 max-w-4xl mx-auto">
          {Array(6)
            .fill("")
            .map((_, i) => (
              <div key={i} className="bg-gray-400 w-full h-40" />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
