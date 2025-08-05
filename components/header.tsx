"use client"
import Link from "next/link";
import Image from "next/image";
import logo from "../public/logo.png";
import { Button } from "@/components/ui/button";
import { Moon } from "lucide-react";
import { Sun } from "lucide-react";
import { useTheme } from "next-themes";
import LogoutButton from "./logoutButton";



function Header() {
    const user= 1;
    const { theme,setTheme } = useTheme();
  return (
    <header 
    className="w-full justify-between items-center flex p-4 bg-popover dark:bg-gray-800 shadow-lg px-3 sm:px-8 relative h-24"
   >
        <Link href='/' className="flex flex-row items-end gap-2">
            <Image src={logo} alt="GOAT Notes Logo" width={60} height={60} className="rounded-full piority" />
            <h1 className="text-2xl flex flex-col font-semibold leading-6 pb-1">GOAT <span>Notes</span></h1>
        </Link>
        <div className="flex flex-row items-center gap-4">
            {
                user ? (
                    <LogoutButton />
                 ) :(
                    <>
                    <Button asChild>
                        <Link href="/auth/signUp" className="hidden sm:block">Signup</Link>
                    </Button>
                     <Button asChild variant={"outline"}>
                        <Link href="/auth/signIn">Login</Link>
                    </Button>
                    </>
                 )
            }
            
            { theme === "light" ? 
            (
            <Button variant={"ghost"} size="icon" onClick={() => setTheme("dark")} className="rounded-full border-1 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700">
                <Sun />
           </Button>
           ) : (
            <Button variant={"ghost"} size="icon" onClick={() => setTheme("light")} className="rounded-full border-1 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700">
                <Moon />
           </Button>
           )
           }
        </div>
    </header>
  )
}

export default Header