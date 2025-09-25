"use client";

import Footer from "@/app/admin/(provider)/ui/Footer/Footer";
import Header from "@/app/admin/(provider)/ui/Header/Header";
import Main from "@/app/admin/(provider)/ui/Main/Main";
import { fulfilled } from "@/app/services/admin/response.service";
import { useConnectionToIndexedDB } from "@/app/utils/hooks/admin/indexedDB/useConnectionToIndexedDb";
import { refreshTokens } from "@/app/utils/redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks";
import { RootState } from "@/app/utils/redux/store";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import styles from "./layout.module.scss";

export default function Admin({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { accessToken } = useAppSelector((state: RootState) => state.auth);

	const dispatch = useAppDispatch();
	const pathname = usePathname();
	const router = useRouter();
	const isLoginPage = pathname === "/admin/login";

	const refreshTokensAndCheckIsLogin = async () => {
		const response = await dispatch(refreshTokens());
		const isFulfilled = fulfilled(response.meta.requestStatus);
		if (!isFulfilled) router.push("/admin/login");
	};

	// CREATE INDEXED DB IF NOT CREATED
	useConnectionToIndexedDB();
	// AUTH
	useEffect(() => {
		if (accessToken) return;
		refreshTokensAndCheckIsLogin();
	}, []);

	return (
		<>
			<div className={styles.layout}>
				<div className={`${styles.layoutContainer}`}>
					<Header />
					{isLoginPage && !accessToken ? (
						<Main>{children}</Main>
					) : accessToken ? (
						<Main>{children}</Main>
					) : (
						<div className={styles.not_logged_in}>Ввійдіть в адмін панель</div>
					)}
					<Footer />
				</div>
			</div>
		</>
	);
}
