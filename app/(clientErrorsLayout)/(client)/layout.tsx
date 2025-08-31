import Header from "@/app/(clientErrorsLayout)/(client)/ui/Navbar/Header";
import Footer from "@/app/(clientErrorsLayout)/(client)/ui/Footer/Footer";

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
