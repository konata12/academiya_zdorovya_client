import SideNavigation from "@/app/admin/(provider)/ui/SideNavigation/SideNavigation";
import { useAppSelector } from "@/app/utils/redux/hooks";
import { RootState } from "@/app/utils/redux/store";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import styles from "./Main.module.scss";

export default function Main({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { accessToken, status } = useAppSelector((state: RootState) => state.auth);

	const pathname = usePathname();
	const router = useRouter();
	const isLoginPage = pathname.includes("login");
	const isPreviewPage = pathname.includes("preview");
	const isBookingPage = pathname.includes("bookings");

	useEffect(() => {
		if (accessToken && isLoginPage) router.push("/admin/departments");
	}, [accessToken]);

	const authStatus = status.login === "succeeded" || status.refresh === "succeeded";
	const renderLoginFallback = isLoginPage && !accessToken && authStatus;

	return (
		<div className={styles.main}>
			<div className={`adminContainer ${styles.mainContainer}`}>
				<SideNavigation />

				{/* RENDER MAIN CONTENT */}
				{renderLoginFallback ? (
					<div className={styles.not_logged_in}>Ввійдіть в адмін панель</div>
				) : (
					<div
						className={`${styles.children} ${isBookingPage || isPreviewPage ? styles.widerContainer : ""}`}
					>
						{children}
					</div>
				)}
			</div>
		</div>
	);
}
