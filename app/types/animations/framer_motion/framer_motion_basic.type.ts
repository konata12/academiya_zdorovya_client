import {
	AnimationControls,
	TargetAndTransition,
	VariantLabels,
} from "framer-motion";

export type Initial = TargetAndTransition | VariantLabels | boolean;
export type Animate =
	| AnimationControls
	| TargetAndTransition
	| VariantLabels
	| boolean;
export type Exit = TargetAndTransition | VariantLabels;
