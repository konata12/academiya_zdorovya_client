"use client";

import { useSideNav } from "@/app/utils/hooks/common/useSideNav";
import Link from "next/link";
import styles from "./SideNavBtn.module.scss";

interface SideNavBtnProps {
	path: string;
	label: string;
	id?: string;
}
export function SideNavBtn({ path, label, id }: SideNavBtnProps) {
	const { isActive } = useSideNav(id);

	return (
		<Link className={`${styles.link} ${isActive ? styles.active : ""}`} href={path}>
			<span>{label}</span>
			<div className={`${styles.sideLine}`}></div>
		</Link>
	);
}
