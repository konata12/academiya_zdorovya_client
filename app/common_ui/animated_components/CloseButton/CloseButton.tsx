import React, { useState } from 'react'
import styles from './CloseButton.module.scss'

export interface CloseButtonProps {
    handleClick: () => void
    primaryColor?: string
    secondaryColor?: string
    hoverCrossColor?: string
    className?: string
    [key: string]: any
}

export default function CloseButton({
    handleClick,
    primaryColor = '#004BAE',
    secondaryColor = '#FEED01',
    hoverCrossColor = primaryColor,
    className,
    ...props
}: CloseButtonProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <>
            <button
                type='button'
                className={`${styles.btn} ${className || ''}`}
                onClick={handleClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                {...props}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                    className={styles.cross}
                >
                    <path
                        d="M1.15683 1.1569C1.35798 0.955747 1.68413 0.955747 1.88528 1.1569L14.8491 14.1207C15.0503 14.3218 15.0503 14.648 14.8491 14.8491C14.648 15.0503 14.3218 15.0503 14.1207 14.8491L1.15683 1.88536C0.955669 1.6842 0.955669 1.35806 1.15683 1.1569Z"
                        fill={isHovered ? hoverCrossColor : primaryColor}
                        className={styles.cross}
                    />
                    <path
                        d="M1.15087 14.8431C0.949711 14.6419 0.949711 14.3158 1.15087 14.1146L14.1147 1.15087C14.3159 0.949711 14.642 0.949711 14.8432 1.15087C15.0443 1.35202 15.0443 1.67816 14.8432 1.87932L1.87932 14.8431C1.67817 15.0443 1.35203 15.0443 1.15087 14.8431Z"
                        fill={isHovered ? hoverCrossColor : primaryColor}
                        className={styles.cross}
                    />
                    <path
                        d="M1.15683 1.1569C1.35798 0.955747 1.68413 0.955747 1.88528 1.1569L14.8491 14.1207C15.0503 14.3218 15.0503 14.648 14.8491 14.8491C14.648 15.0503 14.3218 15.0503 14.1207 14.8491L1.15683 1.88536C0.955669 1.6842 0.955669 1.35806 1.15683 1.1569Z"
                        stroke={isHovered ? hoverCrossColor : primaryColor}
                        className={styles.cross}
                    />
                    <path
                        d="M1.15087 14.8431C0.949711 14.6419 0.949711 14.3158 1.15087 14.1146L14.1147 1.15087C14.3159 0.949711 14.642 0.949711 14.8432 1.15087C15.0443 1.35202 15.0443 1.67816 14.8432 1.87932L1.87932 14.8431C1.67817 15.0443 1.35203 15.0443 1.15087 14.8431Z"
                        stroke={isHovered ? hoverCrossColor : primaryColor}
                        className={styles.cross}
                    />
                </svg>
                <div className={styles.circle}></div>
            </button>
        </>
    )
}
