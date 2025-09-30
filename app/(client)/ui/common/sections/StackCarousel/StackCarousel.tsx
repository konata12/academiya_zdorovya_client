"use client";

import { CarouselArrows } from "@/app/(client)/ui/common/carousels/arrows/CarouselArrows";
import { EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import React, { useCallback, useEffect, useRef } from "react";
import styles from "./StackCarousel.module.scss";

interface CarouselProps {
	label: string;
	text: string;
	link: {
		href: string;
		text: string;
	};
	className?: {
		viewport?: string;
	};
	slidesContent: React.ReactNode[];
}

const SHIT = [1, 2, 3, 4, 5];
const GAP = 32; // between slides
const MAX_BLUR = 3; // of slides after active slide
const NUMBERS_AFTER_DOT = 4; // for rounding
const TWEEN_FACTOR_BASE = 0.78; // on how smaller slide should be 1 - TWEEN_FACTOR_BASE = scale
const SHADOWS = [0.12, 0.04];

export function StackCarousel({ label, text, link, className, slidesContent }: CarouselProps) {
	const [emblaRef, emblaApi] = useEmblaCarousel({ duration: 60 });
	const tweenFactor = useRef(0);
	const scrollSnapMinBasicDistance = useRef(0);
	const tweenNodes = useRef<HTMLElement[]>([]);

	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev();
	}, [emblaApi]);
	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext();
	}, [emblaApi]);

	const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
		tweenNodes.current = emblaApi.slideNodes();
	}, []);
	const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
		tweenFactor.current = +(1 / emblaApi.scrollSnapList().length).toFixed(
			NUMBERS_AFTER_DOT,
		);
	}, []);
	const setScrollSnapMinBasicDistance = useCallback((emblaApi: EmblaCarouselType) => {
		scrollSnapMinBasicDistance.current = +(
			1 /
			(emblaApi.scrollSnapList().length - 1)
		).toFixed(NUMBERS_AFTER_DOT);
	}, []);

	const tweenStyle = useCallback((emblaApi: EmblaCarouselType) => {
		const scrollProgress = emblaApi.scrollProgress();
		const slideNodes = emblaApi.slideNodes();

		emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
			const diffToTargetToGetPosition = +(scrollSnap - scrollProgress).toFixed(
				NUMBERS_AFTER_DOT,
			);
			const node = slideNodes[snapIndex];
			const contentElement = node.childNodes[0] as HTMLElement;
			const colorFilterElement = node.childNodes[
				node.childNodes.length - 1
			] as HTMLElement;

			// STYLING
			if (diffToTargetToGetPosition > 0) {
				const blurForFarSlides =
					tweenFactor.current * (MAX_BLUR / tweenFactor.current);
				let blurForCloseSlides: number | undefined = undefined;
				let colorFilterOpacity = 0.25;
				let blurredShadows = [0, 0];

				if (
					tweenFactor.current >= diffToTargetToGetPosition &&
					diffToTargetToGetPosition > 0
				) {
					blurForCloseSlides =
						diffToTargetToGetPosition * (MAX_BLUR / tweenFactor.current);
					colorFilterOpacity =
						diffToTargetToGetPosition * (colorFilterOpacity / tweenFactor.current);
					blurredShadows = SHADOWS.map((shadow, i) => {
						return (
							shadow - diffToTargetToGetPosition * (shadow / tweenFactor.current)
						);
					});
				}
				const blur = blurForCloseSlides ? blurForCloseSlides : blurForFarSlides;

				node.style.zIndex = `unset`;
				node.style.left = `unset`;
				node.style.filter = `blur(${blur}px)`;

				contentElement.style.boxShadow = `3px 7px 37px 0 rgba(0, 0, 0, ${blurredShadows[0]}), 0 0 44px 0 rgba(0, 0, 0, ${blurredShadows[1]})`;
				contentElement.style.transform = `unset`;
				colorFilterElement.style.display = "block";
				colorFilterElement.style.backgroundColor = `rgba(0, 75, 174, ${colorFilterOpacity})`;
			} else if (diffToTargetToGetPosition < 0) {
				const absDiff = Math.abs(diffToTargetToGetPosition);
				const slideWidth = slideNodes[0].getBoundingClientRect().width; // width of one slide
				const left = absDiff * (slideWidth + GAP) * (slideNodes.length - 1);
				const opacity = 1 - absDiff * (1 / scrollSnapMinBasicDistance.current);
				const tweenValue =
					1 -
					TWEEN_FACTOR_BASE -
					(1 - TWEEN_FACTOR_BASE) * (absDiff / scrollSnapMinBasicDistance.current);
				const scale = TWEEN_FACTOR_BASE + tweenValue;

				node.style.zIndex = `${snapIndex - slideNodes.length}`;
				node.style.left = `${left}px`;
				node.style.opacity = `${opacity}`;

				contentElement.style.transform = `scale(${scale})`;
				colorFilterElement.style.display = "none";
			} else {
				node.style.zIndex = `unset`;
				node.style.left = `unset`;
				node.style.opacity = `1`;

				contentElement.style.boxShadow = `3px 7px 37px 0 rgba(0, 0, 0, ${SHADOWS[0]}), 0 0 44px 0 rgba(0, 0, 0, ${SHADOWS[1]})`;
				contentElement.style.transform = `unset`;
				colorFilterElement.style.display = "none";
			}
		});
	}, []);

	useEffect(() => {
		if (!emblaApi) return;

		setTweenNodes(emblaApi);
		setTweenFactor(emblaApi);
		setScrollSnapMinBasicDistance(emblaApi);
		tweenStyle(emblaApi);

		emblaApi
			.on("reInit", setTweenNodes)
			.on("reInit", setTweenFactor)
			.on("reInit", setScrollSnapMinBasicDistance)
			.on("reInit", tweenStyle)
			.on("scroll", tweenStyle);
	}, [emblaApi]);

	return (
		<div className={`container ${styles.embla}`}>
			<div className={styles.text}>
				<h2 className={"title left lg"}>{label}</h2>
				<p>{text}</p>
				<Link href={link.href}>{link.text}</Link>
				<CarouselArrows
					scrollNext={scrollNext}
					scrollPrev={scrollPrev}
					className={styles.arrows}
				/>
			</div>

			<div
				className={`${styles.viewport} ${className?.viewport ? className.viewport : ""}`}
				ref={emblaRef}
			>
				<div className={styles.container}>
					{slidesContent.map((item, i) => {
						return (
							<article className={`${styles.slide}`} key={i}>
								<div className={styles.content}>{item}</div>
								<div className={styles.colorFilter}></div>
							</article>
						);
					})}
				</div>
			</div>
		</div>
	);
}
