import AutoResizingTextareaHookForm from '@/app/common_ui/form_components/basic_components/AutoResizingTextarea/HookForm/AutoResizingTextareaHookForm'
import { QuouteFormComponentProps } from '@/app/types/data/details.type'
import React from 'react'
import styles from './DetailsQuouteInput.module.scss'

export default function DetailsQuouteInput<T extends Record<string, any>>({
    name,
    register,
    registerOptions,
    authorName,
    authorRegisterOptions,
    className,
}: QuouteFormComponentProps<T>) {
    return (
        <div className={`${styles.container} ${className?.container}`}>
            <div className={`${styles.sideLine}`}></div>
            <AutoResizingTextareaHookForm
                padding={0}
                minRows={1}
                lineHeight={26}
                {...register(name, registerOptions)}
                className={`${styles.text} ${className?.quoute}`}
                placeholder='Текст цитати'
            />
            <input
                type="text"
                className={`${styles.author} ${className?.author}`}
                placeholder='Автор цитати'
                {...register(authorName, authorRegisterOptions)}
            />
        </div>
    )
}