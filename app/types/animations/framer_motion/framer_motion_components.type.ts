import { Animate, Exit, Initial } from "@/app/types/animations/framer_motion/framer_motion_basic.type";
import { Transition, Variants } from "framer-motion";

// BASIC PROPS
interface AnimationWrapperBasicProps {
    children: React.ReactNode;
}
export interface AnimationWrapperProps extends AnimationWrapperBasicProps {
    className?: string;
    initial?: Initial;
    animate?: Animate;
    exit?: Exit;
    variants?: Variants;
    mode?: "sync" | "popLayout" | "wait";
    keyValue?: string;
    transition?: Transition
}
// ANIMATION CLASSNAME PROPS
interface AnimatePresenseWithDynamicHeightStyle {
    relativeContainer?: string
    absoluteContainer?: string
}

// ANIMATION PROPS
export interface AnimatePresenseWithDynamicHeightProps extends AnimationWrapperBasicProps {
    childrenIsrendered: boolean
    className?: AnimatePresenseWithDynamicHeightStyle 
}