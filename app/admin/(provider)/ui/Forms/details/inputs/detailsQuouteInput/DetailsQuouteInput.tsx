import AutoResizingTextareaHookForm from '@/app/common_ui/form_components/basic_components/AutoResizingTextarea/HookForm/AutoResizingTextareaHookForm'
import { QuouteFormComponentProps, QuouteFormData, QuouteFormDataEnum } from '@/app/types/data/details.type'
import React from 'react'
import styles from './DetailsQuouteInput.module.scss'
import { useOrderedFormInput } from '@/app/utils/hooks/admin/useOrderedFormInput'

export default function DetailsQuouteInput<T extends Record<string, any>>({
    name,
    index,
    componentData,
    register,
    registerOptions,
    authorName,
    authorRegisterOptions,
    className,
}: QuouteFormComponentProps<T>) {
    const { handleChange } = useOrderedFormInput()

    const handleChangeProps = {
        componentData,
        index,
    }


    return (
        <div className={`${styles.container} ${className?.container}`}>
            <div className={`${styles.sideLine}`}></div>
            <AutoResizingTextareaHookForm
                className={`${styles.text} ${className?.quoute}`}
                placeholder='Текст цитати'
                padding={0}
                minRows={1}
                lineHeight={26}
            
                {...register(name, registerOptions)}
                onChange={(e) => {
                    handleChange<HTMLTextAreaElement>({
                        e,
                        keyOfValueToChange: 'text',
                        ...handleChangeProps
                    })
                }}
            />
            <input
                type="text"
                className={`${styles.author} ${className?.author}`}
                placeholder='Автор цитати'
            
                {...register(authorName, authorRegisterOptions)}
                onChange={(e) => {
                    handleChange<HTMLInputElement>({
                        e,
                        keyOfValueToChange: 'author',
                        ...handleChangeProps
                    })
                }}
            />
        </div>
    )
}