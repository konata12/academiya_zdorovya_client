"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./NavLink.module.scss";

export default function NavLink({
	children,
	url,
	className,
}: {
	children: React.ReactNode;
	url: string;
	className?: string;
}) {
	const pathname = usePathname();
	const isActive = pathname.includes(url);

	return (
		<div className={`${styles.link} ${isActive ? styles.active : ""} ${className || ""}`}>
			<Link className={`${styles.url} ${isActive && styles.active}`} href={url}>
				{children}
			</Link>
		</div>
	);
}
