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
	const { accessToken } = useAppSelector((state: RootState) => state.auth);

	const pathname = usePathname();
	const router = useRouter();
	const isLoginPage = pathname === "/admin/login";
	const isPreviewPage = pathname.includes("preview");
	const isBookingPage = pathname.includes("bookings");

	useEffect(() => {
		if (accessToken && isLoginPage) router.push("/admin/departments");
	}, [accessToken]);

	return (
		<div className={styles.main}>
			<div className={`adminContainer ${styles.mainContainer}`}>
				<SideNavigation />

				<div
					className={`${styles.children} ${isBookingPage || isPreviewPage ? styles.widerContainer : ""}`}
				>
					{children}
				</div>
			</div>
		</div>
	);
}
