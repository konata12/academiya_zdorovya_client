import Header from "@/app/(client)/ui/Header/Header";
import Footer from "@/app/(client)/ui/Footer/Footer";

export default async function ClientLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Header />
			<main>{children}</main>
			<Footer />
		</>
	);
}
