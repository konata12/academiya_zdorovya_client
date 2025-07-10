import { ImageInputPreviewFromIndexedDBProps } from '@/app/types/ui/form_components/inputContainers.type'
import styles from './ImageInputPreviewFromIndexedDB.module.scss'
import { useGetImageUrlFromIndexedDBImage } from '@/app/utils/hooks/admin/indexedDB/useGetImageUrlFromIndexedDBImage';

export function ImageInputPreviewFromIndexedDB({
    imageName,
    indexedDBStoreName,
    error,
    className,
}: ImageInputPreviewFromIndexedDBProps) {
    const imageUrl = useGetImageUrlFromIndexedDBImage(imageName, indexedDBStoreName)
    const errorForStyle = error && error.message

    return (
        <div className={`${styles.imagePreview} ${className?.imagePreview || ''}`}>
            {error && <p className={`error ${styles.errorMessage} ${className?.errorMessage || ''}`}>
                {error.message}
            </p>}

            <div className={`${styles.image} ${className?.image || ''}`}>
                <div
                    className={`
                        ${styles.imageContainer} 
                        ${styles.big} 
                        ${className?.imageContainer || ''} 
                        ${errorForStyle ? styles.error : ''}
                    `}
                >
                    {imageUrl && <img
                        className={`${className?.actuallyImage || ''}`}
                        src={imageUrl}
                        alt="Preview"
                    />}
                </div>

                <p className={`${styles.caption} ${className?.actuallyImage || ''}`}>
                    Попередній перегляд
                </p>
            </div>
        </div>
    )
}