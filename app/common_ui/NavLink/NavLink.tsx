"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./NavLink.module.scss";

export default function NavLink({
	children,
	url,
	clickHandler,
	className,
}: {
	children: React.ReactNode;
	url: string;
	clickHandler?: (e: any) => void;
	className?: string;
}) {
	const pathname = usePathname();
	let isActive = false;
	if (url !== "/") {
		isActive = pathname.includes(url);
	}

	return (
		<div className={`${styles.link} ${isActive ? styles.active : ""} ${className || ""}`}>
			<Link
				className={`${styles.url} ${isActive ? styles.active : ""}`}
				href={url}
				onClick={clickHandler}
			>
				{children}
			</Link>
		</div>
	);
}
