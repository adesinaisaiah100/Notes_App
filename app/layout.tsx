"use client";
import "./styles/globals.css";
import { ThemeProvider } from "./(Componentslib)/components/themeprovider";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/header";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

function HideHeaderWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Normalize pathname for route groups and case
  const hideHeader = pathname === "/login" || pathname === "/Register";
  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full justify-between">
     
      {!hideHeader && <Header />}
      </div>
      <main className="flex flex-1 flex-col px-4 pt-10 xl:px-8">
        {children}
      </main>
    </div>
  );
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#F9FAFB] flex flex-col py-4 max-h-screen justify-center w-full px-4 dark:bg-[#000]">
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
              <HideHeaderWrapper>
                
                {children}
              </HideHeaderWrapper>
              <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
