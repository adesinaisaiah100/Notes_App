'use client';
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import  Signupform from "@/components/signupform";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

function page() {
  return (
    <div className="mt-3 mb-8 w-full flex flex-1 flex-col items-center">
      <Card className="flex w-full max-w-md flex-col items-center justify-center bg-white px-7 py-9 shadow-md dark:bg-gray-800">
        <CardHeader className="mb-4 flex w-full text-2xl justify-center items-center">
          <CardTitle>Register</CardTitle>
        </CardHeader>
        <div className="w-full flex flex-col">
            <Signupform />
          <div className="my-6 flex items-center">
            <div className="h-px flex-1 bg-gray-300" />
            <span className="mx-4 font-medium text-gray-500">OR</span>
            <div className="h-px flex-1 bg-gray-300" />
          </div>
          <Button
            variant="outline"
            className="rounded-full bg-white text-black hover:bg-gray-100 border flex items-center justify-center gap-2"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            <FcGoogle /> Sign up with Google
          </Button>
        </div>         
      </Card>
    </div>
  );
}

export default page;
