import React, { useEffect, useState } from 'react'
import styles from './DetailsImageInput.module.scss'
import { DetailsFormDataEnum, ImageError, ImageFormComponentProps, ImageFormData } from '@/app/types/data/details.type'
import { v4 as uuidv4 } from 'uuid';
import { useOrderedFormInput } from '@/app/utils/hooks/admin/detailsForm/useOrderedFormInput';
import { createStore, get } from 'idb-keyval';
import AutoResizingTextarea from '@/app/common_ui/form_components/basic_components/AutoResizingTextarea/AutoResizingTextarea';
import { ErrorWrapper } from '@/app/common_ui/error_components/ErrorWrapper/ErrorWrapper';
import { ImageInputContainer } from '@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/ImageInputContainer/ImageInputContainer';
import { useGetImageUrlFromIndexedDBImage } from '@/app/utils/hooks/admin/indexedDB/useGetImageUrlFromIndexedDBImage';


export default function DetailsImageInput({
    index,
    componentData,
    className,
    orderSliceName,
    indexedDBStoreName,
}: ImageFormComponentProps) {
    const { handleChange } = useOrderedFormInput(orderSliceName)

    const { data, error } = componentData
    const imageUrl = useGetImageUrlFromIndexedDBImage(data.image, indexedDBStoreName)

    const inputId = React.useMemo(() => `upload_image_${uuidv4()}`, [])
    const descriptionValue = data.description

    return (
        <div
            id={DetailsFormDataEnum.IMAGES + index}
            className={`${styles.container} ${className?.container}`}
        >
            <div className={`${styles.imageContainer} ${styles[data.size]}`}>
                <ImageInputContainer
                    inputId={inputId}
                    className={{
                        label: styles.imageInput
                    }}
                    changeEvent={(e) => {
                        handleChange<HTMLInputElement>({
                            e,
                            componentData,
                            index,
                            keyOfValueToChange: 'image',
                        })
                    }}
                >
                    <ErrorWrapper
                        error={error.image.message}
                        className={{
                            errorWrapper: styles.imageErrorWrap,
                            error: `${styles.imageError} ${data.size === 'big' ? styles.big : ''}`,
                        }}
                    >
                        {imageUrl && <img
                            className={styles.image}
                            src={imageUrl}
                        />}
                    </ErrorWrapper>
                </ImageInputContainer>
            </div>

            <ErrorWrapper error={error.description.message}>
                <AutoResizingTextarea
                    padding={0}
                    minRows={1}
                    lineHeight={19}
                    className={`${styles.description} ${className?.description}`}
                    placeholder='Назва зображення або опис'
                    value={descriptionValue}

                    onChange={(e) => {
                        handleChange<HTMLTextAreaElement>({
                            e,
                            componentData,
                            index,
                            keyOfValueToChange: 'description',
                        })
                    }}
                />
            </ErrorWrapper>
        </div>
    )
}