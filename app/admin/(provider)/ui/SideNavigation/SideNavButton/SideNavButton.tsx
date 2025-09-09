import SafeLink from "@/app/admin/(provider)/ui/Links/SafeLink/SafeLink";
import { usePathname } from "next/navigation";
import styles from "./SideNavButton.module.scss";

export default function SideNavButton({ path, label }: { path: string; label: string }) {
	const pathname = usePathname();
	const urlPath = pathname.split("/", 3).join("/");
	const isActive = urlPath === path;

	return (
		<SafeLink className={`${styles.link} ${isActive ? styles.active : ""}`} href={path}>
			{label}
			<div className={`${styles.sideLine}`}></div>
		</SafeLink>
	);
}
