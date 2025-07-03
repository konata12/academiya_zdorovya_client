import AutoResizingTextareaHookForm from '@/app/common_ui/form_components/basic_components/AutoResizingTextarea/HookForm/AutoResizingTextareaHookForm'
import { TitleFormComponentProps, TitleFormDataEnumType } from '@/app/types/data/details.type'
import React from 'react'
import styles from './DetailsTitleInput.module.scss'
import { useOrderedFormInput } from '@/app/utils/hooks/admin/useOrderedFormInput'

export default function DetailsTitleInput<T extends Record<string, any>>({
    name,
    index,
    componentData,
    register,
    registerOptions,
    className,
}: TitleFormComponentProps<T>) {
    const { handleChange } = useOrderedFormInput()

    const keyOfValueToChange: TitleFormDataEnumType = 'title'
    const handleChangeProps = {
        componentData,
        index,
        keyOfValueToChange
    }

    const style: React.CSSProperties = {
        marginTop: index && '64px',
    }

    return (
        <>
            <AutoResizingTextareaHookForm
                padding={0}
                minRows={1}
                lineHeight={37}
                placeholder='Заголовок'
                className={`${styles.title} ${className}`}
                style={style}

                {...register(name, registerOptions)}
                onChange={(e) => { handleChange<HTMLTextAreaElement>({ e, ...handleChangeProps }) }}
            />
        </>
    )
}