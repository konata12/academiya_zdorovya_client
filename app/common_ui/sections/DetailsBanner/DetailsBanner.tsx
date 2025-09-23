import Image from "next/image";
import React from "react";
import styles from "./DetailsBanner.module.scss";

interface Props {
	title: string;
	description: string;
	imageSrc: string;
	children: React.ReactNode;
}

export function DetailsBanner({ title, description, imageSrc, children }: Props) {
	return (
		<div className={styles.bannerContainer}>
			<div className={styles.text}>
				<h1 className={styles.title}>{title}</h1>
				<p className={styles.description}>{description}</p>
			</div>

			<div className={styles.bannerShadow}>
				<div className={styles.banner}>
					<div className={styles.imageContainer}>
						<Image
							className={styles.image}
							src={imageSrc}
							alt={"Зображення банера"}
							fill
						/>
					</div>
					{children}
				</div>
			</div>
		</div>
	);
}
