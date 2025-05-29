import React from 'react'
import styles from './DetailsImageInput.module.scss'
import AutoResizingTextareaHookForm from '@/app/common_ui/form_components/basic_components/AutoResizingTextarea/HookForm/AutoResizingTextareaHookForm'
import { ImageFormComponentProps } from '@/app/types/data/details.type'


export default function DetailsImageInput<T extends Record<string, any>>({
    name,
    register,
    registerOptions,
    image,
    imageName,
    imageRegisterOptions,
    className,
}: ImageFormComponentProps<T>) {
    return (
        <div className={`${styles.container} ${className?.container}`}>
            <div>
                <input
                    type='image'
                    className={`${styles.image} ${className?.image}`}
                    placeholder='Автор цитати'
                    {...register(imageName, imageRegisterOptions)}
                />
            </div>
            <AutoResizingTextareaHookForm
                padding={0}
                minRows={1}
                lineHeight={26}
                {...register(name, registerOptions)}
                className={`${styles.description} ${className?.description}`}
                placeholder='Назва зображення або опис'
            />
        </div>
    )
}
