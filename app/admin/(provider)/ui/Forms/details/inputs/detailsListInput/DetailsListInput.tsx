import AutoResizingTextareaHookForm from '@/app/common_ui/form_components/basic_components/AutoResizingTextarea/HookForm/AutoResizingTextareaHookForm'
import { ListFormComponentProps, ListFormData } from '@/app/types/data/details.type'
import React, { useCallback } from 'react'
import styles from './DetailsListInput.module.scss'
import { Path, PathValue } from 'react-hook-form'
import { useOrderedFormInput } from '@/app/utils/hooks/admin/detailsForm/useOrderedFormInput'
import { useAppDispatch } from '@/app/utils/redux/hooks'
import { updateNewsDetailsComponent } from '@/app/utils/redux/details/newsDetailsOrderSlice'
import { useOrderedListHandleKeyDown } from '@/app/utils/hooks/admin/detailsForm/useOrderedListHandleKeyDown'

export default function DetailsListInput<T extends Record<string, any>>({
    name,
    index,
    componentData,
    register,
    setValue,
    registerOptions,
    className,
    list,
    orderSliceName,
}: ListFormComponentProps<T>) {
    const { handleChange } = useOrderedFormInput(orderSliceName)
    const { handleKeyDown } = useOrderedListHandleKeyDown<T>({
        name,
        index,
        componentData,
        setValue,
        list,
        orderSliceName,
    })

    return (
        <>
            {<ul className={`${styles.list} ${className?.container || ''}`}>
                {list.options.map((_, optionIndex) => (
                    <li
                        key={list.orderId + optionIndex}
                        className={`${styles.option} ${list.numerable ? styles.numerable : ''}`}
                    >
                        {list.numerable && <span>{optionIndex + 1 + '.'}</span>}

                        <AutoResizingTextareaHookForm
                            lineHeight={26}
                            padding={0}
                            className={`${styles.input} ${className?.option}`}
                            placeholder={`Опція ${optionIndex + 1}`}

                            {...register((name + `.${optionIndex}` as Path<T>), registerOptions)}
                            onKeyDown={(e: React.KeyboardEvent) => { handleKeyDown(e, optionIndex) }}
                            onChange={(e) => {
                                handleChange<HTMLTextAreaElement>({
                                    e,
                                    componentData,
                                    index,
                                    keyOfValueToChange: 'options',
                                    optionIndex,
                                })
                            }}
                        />
                    </li>
                ))}
            </ul>}
        </>
    )
}