'use client';
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { GithubIcon } from "lucide-react";

const Signupform = dynamic(() => import("@/components/signupform"), {
  loading: () => <p>Loading form...</p>,
});

function page() {
  return (
    <div className="mt-3 mb-8 w-full flex flex-1 flex-col items-center">
      <Card className="flex w-full max-w-md flex-col items-center justify-center bg-white px-7 py-9 shadow-md dark:bg-black">
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
                    variant={"outline"}
                    className="rounded-full p-3 bg-black text-white hover:text-white hover:bg-neutral-800"
                    onClick={() => signIn("github", { callbackUrl: "/" })}
                  >
                    <span><GithubIcon /></span>Sign in with GitHub
                  </Button>
          <Button
            variant="outline"
            className="rounded-full p-3 bg-white text-black dark:text-gray-200 hover:bg-gray-100 border flex items-center justify-center gap-2"
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
