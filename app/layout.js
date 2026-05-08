import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/layout/LenisProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });

export const metadata = {
  title: "SW Technologies - Modern Web Development Agency",
  description:
    "We build fast, modern websites for businesses and startups. Web design, development, e-commerce, and SEO services.",
  metadataBase: new URL("https://swtech.dev"),
  openGraph: {
    title: "SW Technologies - Modern Web Development Agency",
    description: "We build fast, modern websites for businesses and startups.",
    images: ["/images/og-image.png"],
  },
};

import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body className="bg-dark text-gray-100 font-sans antialiased">
        <LenisProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#0f172a",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.1)",
              },
            }}
          />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
