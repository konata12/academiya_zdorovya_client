import { DescriptionImageSize } from "@/app/types/data/details.type";
import Image from "next/image";
import styles from "./DetailsDataImage.module.scss";

export function DetailsDataImage({
	description,
	image,
	size,
}: {
	description: string;
	image: string;
	size: DescriptionImageSize;
}) {
	return (
		<div className={styles.container}>
			<div className={`${styles.imageContainer} ${styles[size]}`}>
				<Image src={image} alt={`Зображення: ${description}`} fill />
			</div>
			<p className={styles.description}>{description}</p>
		</div>
	);
}
