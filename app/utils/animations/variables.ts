import { BasicAnimationTransition } from "@/app/types/animations/animations_basic_values.type";
import { BezierDefinition } from "framer-motion";

export const basicAnimationCubicBezierValues: BezierDefinition = [
	0.46, 0.61, 0.22, 0.72,
];
export const basicAnimationDuration = 0.6;

export const basicAnimationTransition: BasicAnimationTransition = {
	ease: basicAnimationCubicBezierValues,
	duration: basicAnimationDuration,
};
