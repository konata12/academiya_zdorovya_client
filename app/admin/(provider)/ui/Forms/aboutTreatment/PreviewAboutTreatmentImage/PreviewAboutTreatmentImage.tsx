import React, { useEffect, useRef, useState } from 'react'
import styles from './PreviewAboutTreatmentImage.module.scss'
import { useGetImageUrlFromIndexedDBImage } from '@/app/utils/hooks/admin/indexedDB/useGetImageUrlFromIndexedDBImage'
import { AboutTreatmentFormIndexedDBType } from '@/app/types/data/about_treatment.type'

interface PreviewAboutTreatmentImageProps {
    image: string | null,
    error: { message: string },
    indexedDBStoreName: AboutTreatmentFormIndexedDBType
}

export default function PreviewAboutTreatmentImage({
    image,
    error,
    indexedDBStoreName
}: PreviewAboutTreatmentImageProps) {
    const [imageContainerHeight, setImageContainerHeight] = useState<number>(0)
    const [imageHeight, setImageHeight] = useState<number>(0)
    const imageRef = useRef<HTMLImageElement | null>(null)
    const imageContainerRef = useRef<HTMLDivElement | null>(null)

    const imageUrl = useGetImageUrlFromIndexedDBImage(image, indexedDBStoreName)

    // SET IMAGE HEIGHT
    useEffect(() => {
        if (imageContainerRef.current) {
            setImageContainerHeight(imageContainerRef.current.offsetHeight)
        }
    }, [imageContainerRef.current, imageUrl])
    useEffect(() => {
        if (imageRef.current && image) {
            const img = imageRef.current;
            img.onload = () => {
                setImageHeight(img.offsetHeight);
            };
        }
    }, [image, imageContainerRef.current, imageUrl]);

    const imageMarginTop = imageContainerRef.current && (imageHeight > imageContainerHeight)
        ? (imageHeight - imageContainerHeight + 'px')
        : '64px'

    return (
        <div className={styles.imageInputZone}>
            <div className={styles.imagePreview}>
                {error && <p className={`error ${styles.errorMessage}`}>
                    {error.message}
                </p>}

                <div
                    className={`
                                ${styles.imageContainer} 
                                ${error.message ? styles.error : ''}
                            `}
                    ref={imageContainerRef}
                    style={{
                        marginTop: imageMarginTop
                    }}
                >
                    {imageUrl && <img
                        className={styles.image}
                        src={imageUrl}
                        ref={imageRef}
                        alt="Preview"
                    />}
                </div>
                <p className={styles.caption}>
                    Попередній перегляд
                </p>
            </div>
        </div>
    )
}
