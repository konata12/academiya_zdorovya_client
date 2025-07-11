import AutoResizingTextarea from '@/app/common_ui/form_components/basic_components/AutoResizingTextarea/AutoResizingTextarea';
import React from 'react';
import styles from './DetailsTitleInput.module.scss';
import {
    DetailsFormDataEnum,
    DetailsTitleFormComponentProps,
    TitleFormDataEnumType
    } from '@/app/types/data/details.type';
import { ErrorWrapper } from '@/app/common_ui/error_components/ErrorWrapper/ErrorWrapper';
import { useOrderedFormInput } from '@/app/utils/hooks/admin/detailsForm/useOrderedFormInput';

export default function DetailsTitleInput({
    index,
    componentData,
    className,
    orderSliceName,
}: DetailsTitleFormComponentProps) {
    const { handleChange } = useOrderedFormInput(orderSliceName)
    const { title } = componentData.data
    const error = componentData.error

    const keyOfValueToChange: TitleFormDataEnumType = 'title'
    const handleChangeProps = {
        componentData,
        index,
        keyOfValueToChange
    }

    return (
        <ErrorWrapper error={error.title.message}>
            <AutoResizingTextarea
                id={DetailsFormDataEnum.TITLES + index}
                padding={0}
                minRows={1}
                lineHeight={37}
                placeholder='Заголовок'
                className={`${styles.title} ${className}`}
                value={title}

                onChange={(e) => {
                    handleChange<HTMLTextAreaElement>({
                        e, ...handleChangeProps
                    })
                }}
            />
        </ErrorWrapper>
    )
}