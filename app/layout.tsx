import type { Metadata } from "next";
import "./styles/index.scss";
import { ubuntu, unbounded } from "@/app/fonts/fonts";

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
			<body className={`${ubuntu.className} ${unbounded.className}`}>{children}</body>
		</html>
	);
}
