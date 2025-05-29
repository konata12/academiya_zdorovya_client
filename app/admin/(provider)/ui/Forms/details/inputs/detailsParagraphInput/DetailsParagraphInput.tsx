import AutoResizingTextareaHookForm from '@/app/common_ui/form_components/basic_components/AutoResizingTextarea/HookForm/AutoResizingTextareaHookForm'
import { ParagraphFormComponentProps } from '@/app/types/data/details.type'
import React from 'react'
import styles from './DetailsParagraphInput.module.scss'

export default function DetailsParagraphInput<T extends Record<string, any>>({
    name,
    register,
    registerOptions,
    className,
}: ParagraphFormComponentProps<T>) {
    return (
        <>
            <AutoResizingTextareaHookForm
                padding={0}
                minRows={1}
                lineHeight={26}
                {...register(name, registerOptions)}
                className={`${styles.text} ${className}`}
                placeholder='Абзац'
            />
        </>
    )
}