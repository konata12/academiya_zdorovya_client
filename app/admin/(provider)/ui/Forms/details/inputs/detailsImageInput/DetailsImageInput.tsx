import React from 'react'
import styles from './DetailsImageInput.module.scss'
import AutoResizingTextareaHookForm from '@/app/common_ui/form_components/basic_components/AutoResizingTextarea/HookForm/AutoResizingTextareaHookForm'
import { ImageFormComponentProps, ImageFormData } from '@/app/types/data/details.type'
import { v4 as uuidv4 } from 'uuid';
import { useOrderedFormInput } from '@/app/utils/hooks/admin/useOrderedFormInput';


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
}: ImageFormComponentProps<T>) {
    const { handleChange } = useOrderedFormInput()

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
                    src={URL.createObjectURL(imageFile)}
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
