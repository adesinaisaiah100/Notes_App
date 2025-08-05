import type { Metadata } from "next";
import "./styles/globals.css";
import { ThemeProvider } from "./components/themeprovider";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/header";



export const metadata: Metadata = {
  title: "GOAT Notes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen w-full">
            <Header />
            <main className="flex flex-1 flex-col pt-10 px-4 xl:px-8">{children}</main>
          </div>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
