"use client";

import React from "react";
import CommonTable from "@/app/admin/(provider)/ui/Tables/Common/CommonTable";
import SafeLink from "@/app/admin/(provider)/ui/Links/SafeLink/SafeLink";
import { checkCreatePage } from "@/app/services/admin/navigation.service";
import styles from "./layout.module.scss";
import { useAppDispatch } from "@/app/utils/redux/hooks";
import { usePathname, useRouter } from "next/navigation";

const titles = ["ПІ пацієнта", "Діагноз", "Опції"];

export default function layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const pathname = usePathname();
	const isCreatePage = checkCreatePage(pathname);

	return (
		<>
			<p className={`title lg`}>Відгуки</p>
			<CommonTable titles={titles}>123</CommonTable>
			<SafeLink
				className={`btn blue xl ${styles.addButton} ${isCreatePage ? "disabled" : ""}`}
				href={"/admin/reviews/create"}
			>
				Додати відгук
			</SafeLink>
			{children}
		</>
	);
}
