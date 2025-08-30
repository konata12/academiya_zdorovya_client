import styles from "./Links.module.scss";
import NavLink from "@/app/common_ui/NavLink/NavLink";

const links = [
	{ label: "Про нас", url: "about_us" },
	{ label: "Контакти", url: "contacts" },
	{ label: "Послуги", url: "services" },
	{ label: "Ціни", url: "prices" },
	{ label: "Новини", url: "news" },
];
export default function Links() {
	return (
		<div className={styles.links}>
			{links.map((link) => {
				return (
					<NavLink url={link.url} key={link.url}>
						{link.label}
					</NavLink>
				);
			})}
		</div>
	);
}
