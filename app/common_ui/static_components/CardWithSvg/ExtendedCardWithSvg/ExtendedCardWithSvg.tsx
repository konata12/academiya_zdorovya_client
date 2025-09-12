import { SvgIcon } from "@/app/common_ui/images/SvgIcon/SvgIcon";
import { CardWithSvgProps } from "@/app/common_ui/static_components/CardWithSvg/CardWithSvg";
import styles from "./ExtendedCardWithSvg.module.scss";

interface ExtendedCardWithSvgProps extends CardWithSvgProps {
	paragraph: string;
}

export default function ExtendedCardWithSvg({
	icon,
	title,
	text,
	paragraph,
	className,
}: ExtendedCardWithSvgProps) {
	return (
		<article className={`${styles.card} ${className || ""}`}>
			<div className={styles.dataContainer}>
				<SvgIcon className={styles.icon}>{icon}</SvgIcon>
				<div className={styles.text}>
					<h3>{title}</h3>
					<p>{text}</p>
				</div>
			</div>
			<p className={styles.paragraph}>{paragraph}</p>
		</article>
	);
}
