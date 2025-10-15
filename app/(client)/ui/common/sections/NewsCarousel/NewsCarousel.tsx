"use client";

import { CarouselArrows } from "@/app/(client)/ui/common/carousels/arrows/CarouselArrows";
import { months } from "@/app/(client)/ui/News/NewsCard/NewsCard";
import { RightArrow } from "@/app/common_ui/images/RightArrow";
import { News } from "@/app/types/data/news.type";
import { EmblaCarouselType, EmblaEventType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useRef } from "react";
import styles from "./NewsCarousel.module.scss";

const TWEEN_FACTOR_BASE = 0.15;

export const numberWithinRange = (number: number, min: number, max: number): number =>
	Math.min(Math.max(number, min), max);

export function NewsCarousel({ news }: { news: News[] }) {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 60 }, [Autoplay()]);
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
		tweenScale(emblaApi);

		emblaApi
			.on("reInit", setTweenNodes)
			.on("reInit", setTweenFactor)
			.on("reInit", tweenScale)
			.on("scroll", tweenScale);
	}, [emblaApi, tweenScale]);

	return (
		<div className={styles.embla}>
			<div className={styles.viewport} ref={emblaRef}>
				<div className={styles.container}>
					{news.map((item, i) => {
						const date = new Date(item.createdAt);
						return (
							<article className={`${styles.slideContainer}`} key={item.id}>
								<div className={`embla__slide ${styles.slide}`}>
									<div className={styles.text}>
										<div>
											<p className={styles.date}>
												{`${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`}
											</p>
											<h5 className={styles.title}>{item.title}</h5>
										</div>
										<p className={styles.description}>
											{item.description}
										</p>
										<Link
											href={`/news/${item.id}`}
											className={`btn blue md returnBtn ${styles.link}`}
										>
											<span>Дізнатися більше</span>
											<RightArrow />
										</Link>
									</div>
									<div className={styles.imageContainer}>
										<Image
											className={styles.image}
											src={item.backgroundImg}
											alt={"Новина"}
											fill
											loading="eager"
											unoptimized={true}
										/>
									</div>
								</div>
							</article>
						);
					})}
				</div>
			</div>

			<CarouselArrows scrollNext={scrollNext} scrollPrev={scrollPrev} />
		</div>
	);
}
