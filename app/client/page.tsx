"use client";

import { useSession } from "next-auth/react";
import React from "react";

const Client = () => {
  const { data: session } = useSession();
  console.log(session);

  return <div>Client</div>;
};

export default Client;
