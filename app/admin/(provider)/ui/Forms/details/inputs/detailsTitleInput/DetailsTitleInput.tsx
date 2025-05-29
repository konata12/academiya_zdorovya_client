import AutoResizingTextareaHookForm from '@/app/common_ui/form_components/basic_components/AutoResizingTextarea/HookForm/AutoResizingTextareaHookForm'
import { TitleFormComponentProps } from '@/app/types/data/details.type'
import React from 'react'
import styles from './DetailsTitleInput.module.scss'

export default function DetailsTitleInput<T extends Record<string, any>>({
    name,
    index,
    register,
    registerOptions,
    className,
}: TitleFormComponentProps<T>) {
    const style: React.CSSProperties = {
        marginTop: index === 0 ? '0px' : '128px',
    }

    return (
        <>
            <AutoResizingTextareaHookForm
                padding={0}
                minRows={1}
                lineHeight={37}
                {...register(name, registerOptions)}
                placeholder='Заголовок'
                className={`${styles.title} ${className}`}
                style={style}
            />
        </>
    )
}