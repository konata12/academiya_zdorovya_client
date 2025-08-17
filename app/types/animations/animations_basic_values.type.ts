import { Easing } from "framer-motion";

export interface BasicAnimationTransition {
	ease: Easing | Easing[];
	duration: number;
}
