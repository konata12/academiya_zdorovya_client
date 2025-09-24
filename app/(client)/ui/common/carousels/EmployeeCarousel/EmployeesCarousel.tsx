"use client";

import { EmblaCarouselType, EmblaEventType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import React, { useCallback, useEffect, useRef } from "react";
import styles from "./EmployeesCarousel.module.scss";

const TWEEN_FACTOR_BASE = 0.15;
const SHIT = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const numberWithinRange = (number: number, min: number, max: number): number =>
	Math.min(Math.max(number, min), max);

export function EmployeesCarousel() {
	const [emblaRef, emblaApi] = useEmblaCarousel({ duration: 60 }, [Autoplay()]);
	const tweenFactor = useRef(0);
	const tweenNodes = useRef<HTMLElement[]>([]);

	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev();
	}, [emblaApi]);

	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext();
	}, [emblaApi]);

	const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
		tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
			return slideNode.querySelector(".embla__slide") as HTMLElement;
		});
	}, []);

	const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
		tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
	}, []);

	const tweenScale = useCallback(
		(emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
			const engine = emblaApi.internalEngine();
			const scrollProgress = emblaApi.scrollProgress();
			const slidesInView = emblaApi.slidesInView();
			const isScrollEvent = eventName === "scroll";

			emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
				let diffToTarget = scrollSnap - scrollProgress;
				const slidesInSnap = engine.slideRegistry[snapIndex];

				slidesInSnap.forEach((slideIndex) => {
					if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

					if (engine.options.loop) {
						engine.slideLooper.loopPoints.forEach((loopItem) => {
							const target = loopItem.target();

							if (slideIndex === loopItem.index && target !== 0) {
								const sign = Math.sign(target);

								if (sign === -1) {
									diffToTarget = scrollSnap - (1 + scrollProgress);
								}
								if (sign === 1) {
									diffToTarget = scrollSnap + (1 - scrollProgress);
								}
							}
						});
					}

					const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
					const scale = numberWithinRange(tweenValue, 0, 1).toString();
					const blur = Math.round((1 - parseFloat(scale)) * 20);
					const tweenNode = tweenNodes.current[slideIndex];
					tweenNode.style.transform = `scale(${scale})`;
					tweenNode.style.filter = `blur(${blur}px)`;
				});
			});
		},
		[],
	);

	useEffect(() => {
		if (!emblaApi) return;

		setTweenNodes(emblaApi);
		setTweenFactor(emblaApi);

		console.log("selectedScrollSnap", emblaApi.selectedScrollSnap());

		emblaApi.on("reInit", setTweenNodes).on("reInit", setTweenFactor);
		// .on("reInit", tweenScale)
		// .on("scroll", tweenScale)
		// .on("slideFocus", tweenScale);
	}, [emblaApi, tweenScale]);

	return (
		<div className={styles.embla}>
			<div className={styles.viewport} ref={emblaRef}>
				<div className={styles.container}>
					{SHIT.map((item, i) => {
						return (
							<article className={`${styles.slideContainer}`} key={i}>
								{item}
							</article>
						);
					})}
				</div>
			</div>
		</div>
	);
}
