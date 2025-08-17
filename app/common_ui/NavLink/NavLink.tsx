import Link from "next/link";
import styles from "./NavLink.module.scss";
import { usePathname } from "next/navigation";

export default function NavLink({
	children,
	url,
	urlsForActive = [],
}: {
	children: React.ReactNode;
	url: string;
	urlsForActive?: string[];
}) {
	const pathname = usePathname();
	let isActive: boolean;

	if (urlsForActive.length) {
		// get the first 2 parts of the pathname
		const path = pathname.split("/", 3).join("/");
		isActive = urlsForActive.includes(path);
	} else {
		isActive = pathname === url;
	}

	return (
		<div className={`${styles.link} ${isActive && styles.active}`}>
			<Link
				className={`${styles.url} ${isActive && styles.active}`}
				href={url}
			>
				{children}
			</Link>
			<div className={`${styles.bottom}`}></div>
		</div>
	);
}
