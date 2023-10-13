import { Session } from "next-auth";
import Image from "next/image";
import React from "react";

const UserCard = async ({ session }: { session: Session }) => {
  return (
    <div className="max-w-3xl mx-auto my-12 flex flex-col items-center gap-4">
      <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
        {session?.user?.image && (
          <Image
            className="w-full  h-full object-cover"
            src={session?.user?.image}
            alt={session?.user?.name ?? ""}
            width={100}
            height={100}
          />
        )}
      </div>
      <h1 className="text-2xl font-semibold">{session?.user?.name}</h1>
    </div>
  );
};

export default UserCard;
