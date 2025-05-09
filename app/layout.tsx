import type { Metadata } from "next";
import Navbar from "./(client)/ui/Navbar/Navbar";
import './styles/index.scss'
import { ubuntu } from "@/app/fonts/fonts";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Академія здоров'я",
  description: "Оригінальна назва",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ubuntu.className}`}>
        <Navbar />
        {children}
      </body>
    </html >
  );
}
