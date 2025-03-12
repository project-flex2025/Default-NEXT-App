import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";

const poppins = Poppins({
  subsets: ["latin"], // Use 'latin' or add more subsets if needed
  weight: ["400", "600", "700"], // Add the font weights you need
  display: "swap",
}); 

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
          integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={poppins.className}>
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
        <ToastContainer position="top-right" autoClose={3000} />
      </body>
    </html>
  );
}
