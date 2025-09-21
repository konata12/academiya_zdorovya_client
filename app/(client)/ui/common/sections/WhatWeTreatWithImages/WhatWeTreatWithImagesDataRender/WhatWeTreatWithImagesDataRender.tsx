"use client";

import ButtonWithUnderlineAnimation from "@/app/common_ui/animated_components/ButtonWithUnderlineAnimation/ButtonWithUnderlineAnimation";
import { AboutTreatment } from "@/app/types/data/about_treatment.type";
import Image from "next/image";
import { useState } from "react";
import styles from "./WhatWeTreatWithImagesDataRender.module.scss";

export function WhatWeTreatWithImagesDataRender({ data }: { data: AboutTreatment[] }) {
	const [selected, setSelected] = useState(0);

	return (
		<div className={styles.container}>
			<div className={styles.buttonsContainer}>
				<div className={styles.buttons}>
					{data.map((treatmentTypes, i) => {
						return (
							<ButtonWithUnderlineAnimation
								key={i}
								isActive={i === selected}
								onClick={() => {
									setSelected(i);
								}}
							>
								{treatmentTypes.title}
							</ButtonWithUnderlineAnimation>
						);
					})}
				</div>
				<div className={styles.line}></div>
			</div>
			<div className={styles.content}>
				<ul className={styles.list}>
					{data[selected].treatmentTypes.map((type, i) => (
						<li key={type + i}>{type}</li>
					))}
				</ul>

				<div className={styles.shadow}>
					<div className={styles.bg}></div>
					<Image
						src={data[selected].image}
						alt={`Зображення: ${data[selected].title}`}
						fill
						unoptimized={true}
					/>
				</div>
			</div>
		</div>
	);
}
