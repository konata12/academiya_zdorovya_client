"use client";

import NavLink from "@/app/common_ui/NavLink/NavLink";
import { DepartmentsService } from "@/app/types/data/departments.type";
import { ServiceFormDataEnum } from "@/app/types/data/services.type";
import { useCustomHorizontalScroll } from "@/app/utils/hooks/common/useCustomHorizontalScroll";
import { use, useRef } from "react";
import styles from "./Footer.module.scss";

export function FooterNavBar({
	servicesPromise,
}: {
	servicesPromise: Promise<DepartmentsService[]>;
}) {
	const services = use(servicesPromise);

	const navRef = useRef<HTMLElement>(null);
	const { scrollWidth, scrollX, handleScroll } = useCustomHorizontalScroll(navRef);

	return (
		<div className={styles.navContainer}>
			<nav
				className={`${styles.nav} ${scrollWidth !== 0 ? styles.scrollable : ""}`}
				aria-label="Services navigation"
				ref={navRef}
				onScroll={() => handleScroll()}
			>
				{services.map((service) => {
					return (
						<NavLink
							url={`/services/${service.id}`}
							className={styles.link}
							key={service.id}
						>
							{service[ServiceFormDataEnum.TITLE]}
						</NavLink>
					);
				})}
			</nav>
			<div
				style={{
					width: `${scrollWidth}%`,
					left: `${scrollX}px`,
				}}
				className={styles.scroll}
			></div>
		</div>
	);
}
