'use client';
import "./styles/globals.css";
import { ThemeProvider } from "./(Componentslib)/components/themeprovider";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/header";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";






function HideHeaderWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Normalize pathname for route groups and case
  const hideHeader = pathname === "/login" || pathname === "/Register";
  return (
    <div className="flex flex-col min-h-screen w-full">
      {!hideHeader && <Header />}
      <main className="flex flex-1 flex-col pt-10 px-4 xl:px-8">{children}</main>
    </div>
  );
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className=" bg-[#F9FAFB] py-4 px-4 dark:bg-[#000]">
         <SessionProvider> 
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <HideHeaderWrapper>{children}</HideHeaderWrapper>
          <Toaster />
        </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
