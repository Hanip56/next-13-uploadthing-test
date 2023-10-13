"use client";

import React from "react";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

const Navbar = () => {
  return (
    <div className="w-[100%] border-b">
      <nav className="max-w-5xl mx-auto flex items-center justify-between h-16 p-4">
        <h1>NAUL</h1>
        <Button onClick={() => signOut()}>
          <LogOut className="w-4 h-4" />
        </Button>
      </nav>
    </div>
  );
};

export default Navbar;
