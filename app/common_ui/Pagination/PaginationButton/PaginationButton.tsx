"use client";

import { PaginationQuery } from "@/app/common_ui/Pagination/Pagination";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { JSX } from "react";
import styles from "./PaginationButton.module.scss";

export function PaginationButton({ page, isArrow }: PaginationQuery) {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const allParams = Object.fromEntries(searchParams.entries());
	const queryPage = allParams.page;
	allParams["page"] = page;
	const urlQuery = Object.entries(allParams)
		.map(([k, v]) => `${k}=${v}`)
		.join("&");
	const url = `${pathname}?${urlQuery}`;

	let value: string | JSX.Element = page;
	if (isArrow) {
		page === `1`
			? (value = (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M13 5 L6 12 L13 19" />
						<path d="M19 5 L12 12 L19 19" />
					</svg>
				))
			: (value = (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M11 5l7 7-7 7" />
						<path d="M5 5l7 7-7 7" />
					</svg>
				));
	}

	return (
		<Link
			href={url}
			className={`${styles.link} ${page.length >= 4 ? styles.thousand : ""} ${queryPage === page && !isArrow ? styles.active : ""}`}
		>
			<span className={isArrow ? styles.arrow : styles.notArrow}>{value}</span>
		</Link>
	);
}
