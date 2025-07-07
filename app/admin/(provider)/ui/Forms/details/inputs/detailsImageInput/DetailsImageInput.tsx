import React, { useEffect, useState } from 'react'
import styles from './DetailsImageInput.module.scss'
import AutoResizingTextareaHookForm from '@/app/common_ui/form_components/basic_components/AutoResizingTextarea/HookForm/AutoResizingTextareaHookForm'
import { ImageFormComponentProps, ImageFormData } from '@/app/types/data/details.type'
import { v4 as uuidv4 } from 'uuid';
import { useOrderedFormInput } from '@/app/utils/hooks/admin/detailsForm/useOrderedFormInput';
import { createStore, get } from 'idb-keyval';


export default function DetailsImageInput<T extends Record<string, any>>({
    name,
    index,
    componentData,
    register,
    registerOptions,
    image,
    imageName,
    imageRegisterOptions,
    className,
    orderSliceName,
}: ImageFormComponentProps<T>) {
    const { handleChange } = useOrderedFormInput(orderSliceName)
    const [imageUrl, setImageUrl] = useState<string | null>(null)

    console.log(image)

    useEffect(() => {
        let isMounted = true;

        const fetchImage = async () => {
            if (image?.image) {
                try {
                    const imageFile = await get(image.image, createStore('app_db', 'news_images'));
                    console.log(imageFile)
                    if (isMounted && imageFile) {
                        const newUrl = URL.createObjectURL(imageFile);
                        setImageUrl(newUrl);
                    }
                } catch (error) {
                    console.error('Error loading image from IndexedDB:', error);
                }
            }
        };

        fetchImage();

        return () => {
            isMounted = false;
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl); // Clean up the object URL
            }
        };
    }, [image?.image]); // Re-run if `image.image` changes

    const imageGG = get(image.image || '', createStore('app_db', 'news_images'))
    const imageFile = (componentData.componentData as ImageFormData).image?.[0] || image?.image?.[0]
    const inputId = React.useMemo(() => `upload_image_${uuidv4()}`, [])

    return (
        <div className={`${styles.container} ${className?.container}`}>
            <div className={`${styles.imageContainer} ${styles[image.size]}`}>
                <input
                    id={inputId}
                    type="file"
                    hidden

                    {...register(imageName, imageRegisterOptions)}
                    onChange={(e) => {
                        handleChange<HTMLInputElement>({
                            e,
                            componentData,
                            index,
                            keyOfValueToChange: 'image',
                        })
                    }}
                />
                <label
                    className={`btn blue sm ${styles.imageInput}`}
                    htmlFor={inputId}
                >
                    Завантажити
                </label>

                {imageFile && <img
                    className={styles.image}
                    src={imageUrl || undefined}
                />}
            </div>

            <AutoResizingTextareaHookForm
                padding={0}
                minRows={1}
                lineHeight={19}
                className={`${styles.description} ${className?.description}`}
                placeholder='Назва зображення або опис'

                {...register(name, registerOptions)}
                onChange={(e) => {
                    handleChange<HTMLTextAreaElement>({
                        e,
                        componentData,
                        index,
                        keyOfValueToChange: 'description',
                    })
                }}
            />
        </div>
    )
}