"use client"
import Link from "next/link";
import Image from "next/image";
import logo from "../public/logo.png";
import { Button } from "@/components/ui/button";
import { Moon } from "lucide-react";
import { Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";





import { useEffect, useState } from "react";

function Header() {
    const { theme, setTheme } = useTheme();
    const { data: session, status } = useSession();
    const user = status === "authenticated" && session?.user ? session.user : null;
    const [formAuth, setFormAuth] = useState(false);

    useEffect(() => {
        setFormAuth(typeof window !== "undefined" && window.localStorage.getItem("isFormAuthenticated") === "true");
    }, []);

    const handleLogout = () => {
        window.localStorage.removeItem("isFormAuthenticated");
        if (user) {
            // Social login: use next-auth signOut
            import("next-auth/react").then(({ signOut }) => {
                signOut({ callbackUrl: "/" });
            });
        } else {
            // Form login: just reload to clear state
            window.location.href = "/";
        }
    };

    return (
        <header className=" justify-between items-center ml-8 flex-1 mt-4 flex p-4 border border-neutral-700 rounded-full dark:bg-[#000] shadow-lg px-3 sm:px-8 relative">
            <Link href='/' className="flex flex-row items-end gap-2">
                <Image src={logo} alt="GOAT Notes Logo" width={60} height={60} className="rounded-full piority" />
                <h1 className="text-2xl flex flex-col font-semibold leading-6 pb-1">GOAT <span>Notes</span></h1>
            </Link>
            <div className="flex flex-row items-center gap-4 max-sm:gap-2">
                {(user || formAuth) ? (
                    <>
                    <p className="text-gray-800 max-sm:hidden dark:text-gray-200">
                        {user ? `Welcome, ${user.name || user.email}` : "Welcome, User"}</p>
                    <Button onClick={handleLogout} variant="outline" className="border border-green-400 text-neutral-900  dark:text-green-100">Logout</Button>
                    </>
                ) : (
                    <>
                        <Button asChild variant={"outline"}>
                            <Link href="/Register" className="max-sm:hidden sm:block">Register</Link>
                        </Button>
                        <Button asChild variant={"outline"} className="bg-black text-white hover:bg-[#444] hover:text-white">
                            <Link href="/login">Login</Link>
                        </Button>

                    </>
                )}
                {theme === "light" ? (
                    <Button variant={"ghost"} size="icon" onClick={() => setTheme("dark")} className="rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700">
                        <Sun />
                    </Button>
                ) : (
                    <Button variant={"ghost"} size="icon" onClick={() => setTheme("light")} className="rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700">
                        <Moon />
                    </Button>
                )}
            </div>
        </header>
    );
}

export default Header