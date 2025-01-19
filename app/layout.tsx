import type { Metadata } from "next";
import Navbar from "./(client)/ui/Navbar/Navbar";
import './styles/index.scss'
import { ubuntu } from "@/app/fonts/fonts";
import { fetchDepartments } from "@/app/(client)/lib/data";

export const metadata: Metadata = {
  title: "Академія здоров'я",
  description: "Оригінальна назва",
};

export const experimental_ppr = true;

// export const getStaticProps = async () => {
//   console.log('jopa')
//   const data = await fetchDepartments()
//   console.log(data, 666)
//   return {
//       props: {
//           data
//       }
//   }
// }

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
    </html>
  );
}
