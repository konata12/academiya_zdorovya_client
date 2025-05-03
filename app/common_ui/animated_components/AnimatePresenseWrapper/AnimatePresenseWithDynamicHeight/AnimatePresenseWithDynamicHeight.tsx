import type { AnimatePresenseWithDynamicHeightProps } from '@/app/types/animations/framer_motion/framer_motion_components.type'
import { AnimatePresenseWithDynamicHeightVariants, componentVisibleAnimationVariants } from '@/app/utils/animations/animations'
import React, { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { basicAnimationTransition } from '@/app/utils/animations/variables';
import styles from './AnimatePresenseWithDynamicHeight.module.scss'


export default function AnimatePresenseWithDynamicHeight({
    children,
    childrenIsrendered,
    className,
}: AnimatePresenseWithDynamicHeightProps) {
    const [elemHeight, setElemHeight] = useState<number>(0);
    const elementRef = useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (elementRef.current && childrenIsrendered) {
            setElemHeight(elementRef.current.scrollHeight);
        } else {
            setElemHeight(0);
        }
    }, [childrenIsrendered, children])

    return (
        <motion.div
            layout
            className={`${styles.wrap} ${className?.relativeContainer || ''}`}
            initial={'hidden'}
            animate={'visible'}
            exit={'exit'}
            variants={AnimatePresenseWithDynamicHeightVariants(elemHeight)}
            transition={basicAnimationTransition}
        >
            <AnimatePresence>
                {childrenIsrendered && (
                    <motion.div
                        ref={elementRef}
                        className={`${styles.shape} ${className?.absoluteContainer || ''}`}
                        initial={'hidden'}
                        animate={'visible'}
                        exit={'exit'}
                        variants={componentVisibleAnimationVariants}
                        transition={basicAnimationTransition}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div >
    );
}