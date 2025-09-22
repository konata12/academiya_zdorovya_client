import { RightArrow } from "@/app/common_ui/images/RightArrow";
import { ServiceTypeResponseData } from "@/app/types/data/services.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./ServiceTypeCard.module.scss";

export function ServiceTypeCard({
	serviceType,
	serviceId,
}: {
	serviceType: ServiceTypeResponseData;
	serviceId: string;
}) {
	return (
		<article className={styles.container}>
			<div className={styles.shadowContainer}>
				<div className={`${styles.imageContainer}`}>
					<Image
						className={styles.cardImage}
						src={serviceType.backgroundImg}
						alt={"Заставка виду послуги"}
						fill
						unoptimized={true}
					/>
				</div>
			</div>
			<div className={styles.text}>
				<h5 className={styles.title}>{serviceType.title}</h5>
				<p className={styles.description}>{serviceType.description}</p>
				<Link
					href={`${serviceId}/serviceType/${serviceType.id}`}
					className={`btn blue md returnBtn ${styles.link}`}
				>
					Дізнатися більше
					<RightArrow />
				</Link>
			</div>
		</article>
	);
}
