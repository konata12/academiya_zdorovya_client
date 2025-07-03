import AutoResizingTextareaHookForm from '@/app/common_ui/form_components/basic_components/AutoResizingTextarea/HookForm/AutoResizingTextareaHookForm'
import { ParagraphFormComponentProps, ParagraphFormDataEnumType } from '@/app/types/data/details.type'
import React from 'react'
import styles from './DetailsParagraphInput.module.scss'
import { useOrderedFormInput } from '@/app/utils/hooks/admin/useOrderedFormInput'

export default function DetailsParagraphInput<T extends Record<string, any>>({
    name,
    index,
    componentData,
    register,
    registerOptions,
    className,
}: ParagraphFormComponentProps<T>) {
    const { handleChange } = useOrderedFormInput()

    const keyOfValueToChange: ParagraphFormDataEnumType = 'text'
    const handleChangeProps = {
        componentData,
        index,
        keyOfValueToChange
    }

    return (
        <>
            <AutoResizingTextareaHookForm
                padding={0}
                minRows={1}
                lineHeight={26}
                {...register(name, registerOptions)}
                onChange={(e) => { handleChange<HTMLTextAreaElement>({e, ...handleChangeProps}) }}
                className={`${styles.text} ${className}`}
                placeholder='Абзац'
            />
        </>
    )
}