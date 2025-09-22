import styles from "./DetailsBanner.module.scss";
import Image from "next/image";
import React from "react";

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
					{/*<p className={styles.date}>*/}
					{/*	{`${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`}*/}
					{/*</p>*/}
				</div>
			</div>
		</div>
	);
}
