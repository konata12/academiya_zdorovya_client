import { SvgIcon } from "@/app/common_ui/images/SvgIcon/SvgIcon";
import { JSX } from "react";
import styles from "./CardWithSvg.module.scss";

export interface CardWithSvgProps {
	icon: JSX.Element;
	title: string;
	text: string;
	className?: string;
}

export default function CardWithSvg({ icon, title, text, className }: CardWithSvgProps) {
	return (
		<article className={`${styles.card} ${className || ""}`}>
			<SvgIcon className={styles.icon}>{icon}</SvgIcon>
			<div className={styles.text}>
				<h3>{title}</h3>
				<p>{text}</p>
			</div>
		</article>
	);
}
