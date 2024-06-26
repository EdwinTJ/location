import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Toaster } from "sonner";
import Footer from "@/components/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Location",
  description: "Save palces you visited",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <main className="min-h-screen flex flex-col items-center">
              <Toaster 
            richColors
            position="top-right"
            />
            <Navbar />
            {children}
            <Footer/>
        </main>
      </body>
    </html>
  );
}
