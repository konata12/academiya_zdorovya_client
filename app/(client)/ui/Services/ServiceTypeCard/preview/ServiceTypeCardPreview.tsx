import { RightArrow } from "@/app/common_ui/images/RightArrow";
import { ServiceTypeServiceFormData } from "@/app/types/data/services.type";
import { useGetImageUrlFromIndexedDBImage } from "@/app/utils/hooks/admin/indexedDB/useGetImageUrlFromIndexedDBImage";
import noImage from "@/public/images/photo_main_bg.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import styles from "../ServiceTypeCard.module.scss";
import previewStyles from "./ServiceTypeCardPreview.module.scss";

export function ServiceTypeCardPreview({
	serviceType,
	imageStoreName,
}: {
	serviceType: ServiceTypeServiceFormData;
	imageStoreName: string;
}) {
	const pathname = usePathname();
	const imageUrl = useGetImageUrlFromIndexedDBImage(
		serviceType.backgroundImg,
		imageStoreName,
	);

	return (
		<article className={styles.container}>
			<div className={styles.shadowContainer}>
				<div className={`${styles.imageContainer}`}>
					<Image
						className={`${styles.cardImage} ${previewStyles.image}`}
						src={imageUrl || noImage}
						alt={"Заставка виду послуги"}
						fill
						unoptimized={true}
					/>
				</div>
			</div>
			<div className={styles.text}>
				<h5 className={styles.title}>{serviceType.title}</h5>
				<p className={styles.description}>{serviceType.description}</p>
				<Link href={pathname} className={`btn blue md returnBtn ${styles.link}`}>
					Дізнатися більше
					<RightArrow />
				</Link>
			</div>
		</article>
	);
}
