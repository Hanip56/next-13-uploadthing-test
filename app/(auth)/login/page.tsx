import React from "react";
import GetStarted from "./components/GetStarted";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const login = async () => {
  const session = await getServerSession();

  if (session && session.user) {
    redirect("/");
  }

  return (
    <div className="w-[100%] h-screen flex justify-center items-center">
      <GetStarted />
    </div>
  );
};

export default login;
