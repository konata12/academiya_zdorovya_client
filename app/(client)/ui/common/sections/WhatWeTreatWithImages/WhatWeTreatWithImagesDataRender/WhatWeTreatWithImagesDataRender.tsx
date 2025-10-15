"use client";

import ButtonWithUnderlineAnimation from "@/app/common_ui/animated_components/ButtonWithUnderlineAnimation/ButtonWithUnderlineAnimation";
import { AboutTreatment } from "@/app/types/data/about_treatment.type";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./WhatWeTreatWithImagesDataRender.module.scss";

export function WhatWeTreatWithImagesDataRender({ data }: { data: AboutTreatment[] }) {
	const [selected, setSelected] = useState(0);
	const [buttonsCentered, setButtonsCentered] = useState(true);
	const buttons = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function preloadImages() {
			data.forEach((treatment) => {
				const img = new window.Image();
				img.src = treatment.image; // this makes the browser download & cache
			});
		}

		const observer = new ResizeObserver((entries) => {
			if (buttons.current) {
				const containerWidth = buttons.current.offsetWidth;
				const children = Array.from(buttons.current.children);

				const childNodesTotalWidth = children.reduce((sum, child) => {
					const el = child as HTMLElement;
					return sum + el.offsetWidth;
				}, 0);

				setButtonsCentered(containerWidth > childNodesTotalWidth);
			}
		});

		preloadImages();
		if (buttons.current) {
			observer.observe(buttons.current);
		}

		return () => observer.disconnect();
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.buttonsContainer}>
				<div
					className={`${styles.buttons} ${buttonsCentered ? "" : styles.left}`}
					ref={buttons}
				>
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
						loading="eager"
						unoptimized={true}
					/>
				</div>
			</div>
		</div>
	);
}
