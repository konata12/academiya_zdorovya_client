"use client";

import NavLink from "@/app/common_ui/NavLink/NavLink";
import { useElementWidth } from "@/app/utils/hooks/common/useElementWidth";
import phone from "@/public/icons/phone.svg";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./Links.module.scss";

const links = [
	{ label: "Про нас", url: "/about_us" },
	{ label: "Контакти", url: "/contacts" },
	{ label: "Послуги", url: "/services" },
	{ label: "Ціни", url: "/prices" },
	{ label: "Новини", url: "/news" },
];
export default function Links() {
	const [showLinks, setShowLinks] = useState(false);
	const { width, ref } = useElementWidth<HTMLDivElement>(1);

	return (
		<div className={styles.linksContainer} ref={ref}>
			<div className={`${styles.links} ${showLinks ? styles.active : ""}`}>
				{/*	ADD ON MOBILE*/}
				{width <= 1217 && (
					<NavLink
						className={styles.link}
						url={"/"}
						clickHandler={(e) => setShowLinks(!showLinks)}
					>
						Головна
					</NavLink>
				)}
				{links.map((link) => {
					return (
						<NavLink
							className={styles.link}
							url={link.url}
							clickHandler={(e) => setShowLinks(!showLinks)}
							key={link.url}
						>
							{link.label}
						</NavLink>
					);
				})}
			</div>
			<div className={styles.bookingBtn}>
				{/*FOR BIG SCREENS*/}
				<Link className={`btn yellow sm ${styles.btn}`} href={"/contacts"}>
					Запис на прийом
				</Link>
				{/*	FOR MOBILE*/}
				<Link className={styles.icon} href={"/contacts"}>
					<Image src={phone} alt={"Phone"} />
				</Link>
			</div>
			<button
				className={`${styles.burger} ${showLinks ? styles.active : ""}`}
				type={"button"}
				onClick={() => setShowLinks(!showLinks)}
			>
				<div className={styles.line}></div>
				<div className={styles.line}></div>
				<div className={styles.line}></div>
			</button>
		</div>
	);
}
