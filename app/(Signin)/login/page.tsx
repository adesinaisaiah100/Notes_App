"use client";
import React from "react";
import AuthForm from "@/components/authForm";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { GithubIcon} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

function LoginPage() {
  return (
    <div className="mt-5 flex flex-1 flex-col items-center">
      <Card className="w-full max-w-md bg-white px-7 py-9 shadow-md dark:bg-gray-800">
        <CardHeader className="mb-4">
          <CardTitle className="text-center text-xl">Login</CardTitle>
        </CardHeader>
        <AuthForm />
        <div className="flex flex-col">
          <div className="my-6 flex items-center">
            <div className="h-px flex-1 bg-gray-300" />
            <span className="mx-4 font-medium text-gray-500">OR</span>
            <div className="h-px flex-1 bg-gray-300" />
          </div>
          <Button
          variant={"outline"}
          className="rounded-full bg-black text-white hover:text-white hover:bg-neutral-800"
          onClick={() => signIn("github", { callbackUrl: "/" })}
        >
          <span><GithubIcon /></span>Sign in with GitHub
        </Button>
      <div className="mt-4">
        <Button
          variant="outline"
          className="rounded-full bg-white text-black hover:bg-gray-100 dark:text-white border flex items-center justify-center gap-2 w-full"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          <FcGoogle /> Sign in with Google
        </Button>
      </div>
        </div>
      </Card>
    </div>
  );
}

export default LoginPage;
