import React, { useEffect, useRef, useState } from 'react'
import styles from './PreviewEmployeeImage.module.scss'
import { useGetImageUrlFromIndexedDBImage } from '@/app/utils/hooks/admin/indexedDB/useGetImageUrlFromIndexedDBImage'
import { EmployeeFormIndexedDBType, EmployeesBackgroundImgColorType } from '@/app/types/data/employees.type'

interface PreviewEmployeeImageProps {
    image: string | null,
    error: { message: string },
    indexedDBStoreName: EmployeeFormIndexedDBType,
    backgroundImgColor: EmployeesBackgroundImgColorType,
}

export default function PreviewEmployeeImage({
    image,
    error,
    indexedDBStoreName,
    backgroundImgColor,
}: PreviewEmployeeImageProps) {
    const imageUrl = useGetImageUrlFromIndexedDBImage(image, indexedDBStoreName)

    return (
        <div className={styles.imageInputZone}>
            <div className={styles.imagePreview}>
                {error && <p className={`error ${styles.errorMessage}`}>
                    {error.message}
                </p>}

                <div className={styles.images}>
                    <div
                        className={`
                            ${styles.imageContainer} 
                            ${styles.small} 
                            ${error.message ? styles.error : ''} 
                            ${styles[backgroundImgColor]}
                        `}
                    >
                        {imageUrl && <img
                            className={styles.image}
                            src={imageUrl}
                            alt="Preview"
                        />}
                    </div>

                    <div
                        className={`
                            ${styles.imageContainer} 
                            ${styles.big} 
                            ${error.message ? styles.error : ''} 
                            ${styles[backgroundImgColor]}
                        `}
                    >
                        {imageUrl && <img
                            className={styles.image}
                            src={imageUrl}
                            alt="Preview"
                        />}
                    </div>
                </div>
                <p className={styles.caption}>
                    Попередній перегляд
                </p>
            </div>
        </div>
    )
}
