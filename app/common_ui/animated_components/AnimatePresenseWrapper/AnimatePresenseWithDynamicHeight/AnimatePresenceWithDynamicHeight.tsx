import type { AnimatePresenseWithDynamicHeightProps } from "@/app/types/animations/framer_motion/framer_motion_components.type";
import {
	AnimatePresenseWithDynamicHeightVariants,
	componentVisibleAnimationVariants,
} from "@/app/utils/animations/animations";
import { basicAnimationTransition } from "@/app/utils/animations/variables";
import { AnimatePresence, motion } from "framer-motion";
import React, { useRef, useState } from "react";
import styles from "./AnimatePresenseWithDynamicHeight.module.scss";

export default function AnimatePresenceWithDynamicHeight({
	children,
	childrenIsRendered,
	className,
	dependency = [],
}: AnimatePresenseWithDynamicHeightProps) {
	const [elemHeight, setElemHeight] = useState<number>(0);
	const elementRef = useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		if (!elementRef.current) return;

		let observer: ResizeObserver | null = null;

		if (childrenIsRendered) {
			// Initial height calculation (with forced reflow)
			void elementRef.current.offsetHeight;
			const newHeight = elementRef.current.offsetHeight;
			setElemHeight(newHeight);

			// ResizeObserver for dynamic changes
			observer = new ResizeObserver((entries) => {
				if (elementRef.current) {
					const newHeight = elementRef.current.offsetHeight;
					if (newHeight !== elemHeight) setElemHeight(newHeight);
				}
			});
			observer.observe(elementRef.current);
		} else {
			setElemHeight(0);
		}

		return () => {
			if (observer) observer.disconnect();
		};
	}, [childrenIsRendered, ...dependency]);

	return (
		<motion.div
			layout
			className={`${styles.wrap} ${className?.relativeContainer || ""}`}
			initial={"hidden"}
			animate={"visible"}
			exit={"exit"}
			variants={AnimatePresenseWithDynamicHeightVariants(elemHeight)}
			transition={basicAnimationTransition}
		>
			<AnimatePresence>
				{childrenIsRendered && (
					<motion.div
						ref={elementRef}
						className={`${styles.shape} ${className?.absoluteContainer || ""}`}
						initial={"hidden"}
						animate={"visible"}
						exit={"exit"}
						variants={componentVisibleAnimationVariants}
						transition={basicAnimationTransition}
					>
						{children}
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
}
