import { Variants } from "framer-motion"

export const componentVisibleAnimationVariants: Variants = {
    hidden: {
        opacity: 0,
    }, // Initial state (hidden)
    visible: {
        opacity: 1,
    }, // Animate to (visible)
    exit: {
        opacity: 0,
    }, // Exit state (hidden)
}
export const componentHeightAnimationVariants = (height: number): Variants => {
    return {
        hidden: {
            height: 0,
        }, // Initial state (hidden)
        visible: {
            height,
        }, // Animate to (visible)
        exit: {
            height: 0,
        }, // Exit state (hidden)
    }
}
export const componentVisibilityAndHeightAnimationVariants = (height: number): Variants => {
    return {
        hidden: {
            height: 0,
            opacity: 0,
        }, // Initial state (hidden)
        visible: {
            height,
            opacity: 1,
        }, // Animate to (visible)
        exit: {
            height: 0,
            opacity: 0,
        }, // Exit state (hidden)
    }
}
export const errorAnimationVariants = componentVisibleAnimationVariants

// ABOUT TREATMENT CREATE FORM
export const aboutTreatmentTitleVariants = componentVisibilityAndHeightAnimationVariants

// PRICE SECTION CREATE FORM
export const priceSectionTitleVariants = componentHeightAnimationVariants
export const priceSectionPriceVariantVariants = componentHeightAnimationVariants
export const optionalServiceVariants = componentVisibleAnimationVariants
export const priceFieldsVariants = componentVisibleAnimationVariants

// COMPONENTS
// COMMON UI
export const AnimatePresenseWithDynamicHeightVariants = componentHeightAnimationVariants