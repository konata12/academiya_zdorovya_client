export const errorAnimationVariants = {
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

export const componentVisibleAnimationVariants = {
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

// PRICE SECTION CREATE FORM
export const priceSectionTitleVariants = (height: number) => {
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
export const optionalServiceVariants = {
    hidden: {
        opacity: 0,
    }, // Initial state (hidden)
    visible: {
        opacity: 1,
    }, // Animate to (visible)
    exit: {
        opacity: 0,
    }, // Exit state (hidden)}
}
export const priceFieldsVariants = (height: number) => {
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