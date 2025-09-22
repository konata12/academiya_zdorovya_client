import { RightArrow } from "@/app/common_ui/images/RightArrow";
import { Service } from "@/app/types/data/services.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./ServiceCard.module.scss";

export function ServiceCard({ service }: { service: Service }) {
	return (
		<article className={styles.container}>
			<div className={`${styles.imageContainer}`}>
				<Image
					className={styles.cardImage}
					src={service.image}
					alt={"Фото працівника"}
					fill
					unoptimized={true}
				/>
			</div>
			<div className={styles.text}>
				<h3 className={styles.title}>{`${service.title}`}</h3>
				<p className={styles.shortDescription}>{service.shortDescription}</p>
				<Link href={`/services/${service.id}`} className={`btn blue md returnBtn`}>
					Дізнатися більше
					<RightArrow />
				</Link>
			</div>
		</article>
	);
}
