import AutoResizingTextareaHookForm from '@/app/common_ui/form_components/basic_components/AutoResizingTextarea/HookForm/AutoResizingTextareaHookForm'
import { ListFormComponentProps, ListFormData } from '@/app/types/data/details.type'
import React, { useCallback } from 'react'
import styles from './DetailsListInput.module.scss'
import { Path, PathValue } from 'react-hook-form'
import { useOrderedFormInput } from '@/app/utils/hooks/admin/useOrderedFormInput'
import { useAppDispatch } from '@/app/utils/redux/hooks'
import { updateDetailsComponent } from '@/app/utils/redux/details/detailsOrderSlice'

export default function DetailsListInput<T extends Record<string, any>>({
    name,
    index,
    componentData,
    register,
    setValue,
    registerOptions,
    className,
    list,
}: ListFormComponentProps<T>) {
    const { handleChange } = useOrderedFormInput()
    const dispatch = useAppDispatch()

    const detailsComponent = structuredClone(componentData)
    const listFormData = detailsComponent.componentData as ListFormData

    const handleKeyDown = useCallback((e: React.KeyboardEvent, i: number) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();

            if (setValue) {
                // Create a new array reference to trigger React Hook Form's change detection
                const newOptions = [...listFormData.options];
                // Insert empty string at the next position
                newOptions.splice(i + 1, 0, '');
                (detailsComponent.componentData as ListFormData).options = newOptions
                // console.log('newOptions', newOptions)
                // console.log('detailsComponent', detailsComponent)

                // Properly typed setValue call
                setValue(name as Path<T>, newOptions as PathValue<T, Path<T>>);
                dispatch(updateDetailsComponent({
                    index,
                    detailsComponent
                }))
            }
        }

        if (e.key === 'Backspace' && listFormData.options[i] === '' && i > 0) {
            e.preventDefault();

            if (setValue) {
                // Create a new array reference to trigger React Hook Form's change detection
                const newOptions = [...listFormData.options];
                // Remove the current option
                newOptions.splice(i, 1);
                (detailsComponent.componentData as ListFormData).options = newOptions

                // Properly typed setValue call
                setValue(name as Path<T>, newOptions as PathValue<T, Path<T>>);
                dispatch(updateDetailsComponent({
                    index,
                    detailsComponent
                }))
            }
        }
    }, [list, name, detailsComponent, listFormData])

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