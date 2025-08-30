"use client";

import Link from "next/link";
import styles from "./NavLink.module.scss";
import { usePathname } from "next/navigation";

export default function NavLink({
	children,
	url,
}: {
	children: React.ReactNode;
	url: string;
}) {
	const pathname = usePathname();
	const isActive = pathname.includes(url);

	return (
		<div className={`${styles.link} ${isActive && styles.active}`}>
			<Link className={`${styles.url} ${isActive && styles.active}`} href={url}>
				{children}
			</Link>
			<div className={`${styles.bottom}`}></div>
		</div>
	);
}
