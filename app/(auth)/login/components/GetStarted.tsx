"use client";

import { Tabs, TabsTrigger, TabsContent, TabsList } from "@/components/ui/tabs";
import React from "react";
import LoginComp from "./LoginComp";
import RegisterComp from "./RegisterComp";

const GetStarted = () => {
  return (
    <Tabs defaultValue="login" className="w-96">
      <TabsList className="w-full">
        <TabsTrigger value="login" className="flex-1">
          Login
        </TabsTrigger>
        <TabsTrigger value="register" className="flex-1">
          Register
        </TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <LoginComp />
      </TabsContent>
      <TabsContent value="register">
        <RegisterComp />
      </TabsContent>
    </Tabs>
  );
};

export default GetStarted;
