import { DetailsFormDataEnum, ListError, ListFormComponentProps, ListFormData } from '@/app/types/data/details.type'
import React from 'react'
import styles from './DetailsListInput.module.scss'
import { useOrderedFormInput } from '@/app/utils/hooks/admin/detailsForm/useOrderedFormInput'
import { useOrderedListHandleKeyDown } from '@/app/utils/hooks/admin/detailsForm/useOrderedListHandleKeyDown'
import AutoResizingTextarea from '@/app/common_ui/form_components/basic_components/AutoResizingTextarea/AutoResizingTextarea'
import { ErrorWrapper } from '@/app/common_ui/error_components/ErrorWrapper/ErrorWrapper'

export default function DetailsListInput({
    index,
    componentData,
    className,
    orderSliceName,
}: ListFormComponentProps) {
    const { handleChange } = useOrderedFormInput(orderSliceName)
    const { handleKeyDown } = useOrderedListHandleKeyDown({
        index,
        componentData,
        orderSliceName,
    })
    
    const { data: list, error } = componentData

    return (
        <>
            {<ul
                id={DetailsFormDataEnum.LISTS + index}
                className={`${styles.list} ${className?.container || ''}`}
            >
                {list.options.map((option, optionIndex) => (
                    <li
                        key={list.orderId + optionIndex}
                        className={`${styles.option} ${list.numerable ? styles.numerable : ''}`}
                    >
                        {list.numerable && <span>{optionIndex + 1 + '.'}</span>}

                        <ErrorWrapper
                            error={error.options[optionIndex].message}
                            className={{ error: styles.error }}
                        >
                            <AutoResizingTextarea
                                lineHeight={26}
                                padding={0}
                                className={`${styles.input} ${className?.option}`}
                                placeholder={`Опція ${optionIndex + 1}`}
                                value={option}

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
                        </ErrorWrapper>
                    </li>
                ))}
            </ul>}
        </>
    )
}