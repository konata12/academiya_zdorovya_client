import { DescriptionImageSize } from "@/app/types/data/details.type";
import { useGetImageUrlFromIndexedDBImage } from "@/app/utils/hooks/admin/indexedDB/useGetImageUrlFromIndexedDBImage";
import noImage from "@/public/images/photo_main_bg.svg";
import Image from "next/image";
import styles from "../DetailsDataImage.module.scss";
import previewStyles from "./DetailsDataImagePreview.module.scss";

export function DetailsDataImagePreview({
	description,
	image,
	imageStoreName,
	size,
}: {
	description: string;
	image: string | null;
	imageStoreName: string;
	size: DescriptionImageSize;
}) {
	const imageUrl = useGetImageUrlFromIndexedDBImage(image, imageStoreName);
	return (
		<div className={styles.container}>
			<div
				className={`${styles.imageContainer} ${styles[size]} ${imageUrl ? "" : previewStyles.imageContainer}`}
			>
				<Image src={imageUrl || noImage} alt={`Зображення: ${description}`} fill />
			</div>
			<p className={styles.description}>{description}</p>
		</div>
	);
}
