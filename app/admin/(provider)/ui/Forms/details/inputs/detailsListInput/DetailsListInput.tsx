import AutoResizingTextareaHookForm from '@/app/common_ui/form_components/basic_components/AutoResizingTextarea/HookForm/AutoResizingTextareaHookForm'
import { ListFormComponentProps } from '@/app/types/data/details.type'
import React from 'react'
import styles from './DetailsListInput.module.scss'
import { Path, PathValue } from 'react-hook-form'

export default function DetailsListInput<T extends Record<string, any>>({
    name,
    register,
    setValue,
    registerOptions,
    className,
    list,
}: ListFormComponentProps<T>) {

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();

            if (setValue) {
                // Create a new array reference to trigger React Hook Form's change detection
                const newOptions = [...list.options];
                // Insert empty string at the next position
                newOptions.splice(index + 1, 0, '');

                // Properly typed setValue call
                setValue(name as Path<T>, newOptions as PathValue<T, Path<T>>);
            }
        }

        if (e.key === 'Backspace' && list.options[index] === '' && index > 0) {
            e.preventDefault();

            if (setValue) {
                // Create a new array reference to trigger React Hook Form's change detection
                const newOptions = [...list.options];
                // Remove the current option
                newOptions.splice(index, 1);

                // Properly typed setValue call
                setValue(name as Path<T>, newOptions as PathValue<T, Path<T>>);
            }
        }
    };

    return (
        <>
            {<ul className={`${styles.list} ${className?.container || ''}`}>
                {list.options.map((option, index) => (
                    <li
                        key={list.orderId + index}
                        className={`${styles.option} ${list.numerable ? styles.numerable : ''}`}
                    >
                        {list.numerable && <span>{index + 1 + '.'}</span>}
                        <AutoResizingTextareaHookForm
                            {...register((name + `.${index}` as Path<T>), registerOptions)}
                            onKeyDown={(e: React.KeyboardEvent) => { handleKeyDown(e, index) }}
                            placeholder={`Опція ${index + 1}`}
                            className={`${styles.input} ${className?.option}`}
                            lineHeight={26}
                            padding={0}
                        />
                    </li>
                ))}
            </ul>}
        </>
    )
}