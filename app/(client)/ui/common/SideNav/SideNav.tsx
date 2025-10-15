import { SideNavBtn } from "@/app/(client)/ui/common/SideNav/SideNavBtn/SideNavBtn";
import React from "react";
import styles from "./SideNav.module.scss";

interface SideNavProps {
	list: {
		label: string;
		id?: string;
	}[];
}

export function SideNav({ list }: SideNavProps) {
	return (
		// todo fix sticky position
		<div className={styles.container}>
			<nav className={styles.sideNav}>
				{list.map((item, i) => (
					<SideNavBtn path={`#${item.id}`} label={item.label} id={item.id} key={i} />
				))}
			</nav>
		</div>
	);
}
