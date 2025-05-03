import { BasicAnimationTransition } from "@/app/types/animations/animations_basic_values.type"
import { BezierDefinition } from "framer-motion"

export const basicAnimationCubicBezierValues: BezierDefinition = [.46, .61, .22, .72]
export const basicAnimationDuration = .6

export const basicAnimationTransition: BasicAnimationTransition = {
    ease: basicAnimationCubicBezierValues,
    duration: basicAnimationDuration,
}