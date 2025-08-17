import { AnimationWrapperProps } from "@/app/types/animations/framer_motion/framer_motion_components.type";
import { componentVisibleAnimationVariants } from "@/app/utils/animations/animations";
import { basicAnimationTransition } from "@/app/utils/animations/variables";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

export const AnimatePresenseWrapper = ({
	children,
	keyValue,
	initial = "hidden",
	animate = "visible",
	exit = "exit",
	variants = componentVisibleAnimationVariants,
	mode = "wait",
	transition = basicAnimationTransition,
	className,
}: AnimationWrapperProps) => {
	return (
		<AnimatePresence mode={mode}>
			<motion.div
				className={`${className || ""} jopa `}
				key={keyValue}
				initial={initial}
				animate={animate}
				exit={exit}
				variants={variants}
				transition={transition}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	);
};
