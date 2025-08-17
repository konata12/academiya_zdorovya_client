"use client";

import styles from "./layout.module.scss";
import { fullfilled } from "@/app/services/response.service";
import { refreshTokens } from "@/app/utils/redux/auth/authSlice";
import { RootState } from "@/app/utils/redux/store";
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Footer from "@/app/admin/(provider)/ui/Footer/Footer";
import Header from "@/app/admin/(provider)/ui/Header/Header";
import Main from "@/app/admin/(provider)/ui/Main/Main";
import { useConnectionToIndexedDB } from "@/app/utils/hooks/admin/indexedDB/useConnectionToIndexedDb";

export default function Admin({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { accessToken } = useAppSelector((state: RootState) => state.auth);
	const { formDefaultValues } = useAppSelector(
		(state: RootState) => state.navigation,
	);
	console.log("formDefaultValues:", formDefaultValues);

	const dispatch = useAppDispatch();
	const router = useRouter();

	const refreshTokensAndCheckIsLogin = async () => {
		const response = await dispatch(refreshTokens());
		const isFulfilled = fullfilled(response.meta.requestStatus);
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
					<Main>{children}</Main>
					<Footer />
				</div>
			</div>
		</>
	);
}
