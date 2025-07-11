import AutoResizingTextarea from '@/app/common_ui/form_components/basic_components/AutoResizingTextarea/AutoResizingTextarea';
import React from 'react';
import styles from './DetailsParagraphInput.module.scss';
import { DetailsFormDataEnum, ParagraphError, ParagraphFormComponentProps, ParagraphFormData, ParagraphFormDataEnumType } from '@/app/types/data/details.type';
import { useOrderedFormInput } from '@/app/utils/hooks/admin/detailsForm/useOrderedFormInput';
import { ErrorWrapper } from '@/app/common_ui/error_components/ErrorWrapper/ErrorWrapper';

export default function DetailsParagraphInput({
    index,
    componentData,
    className,
    orderSliceName,
}: ParagraphFormComponentProps) {
    const { handleChange } = useOrderedFormInput(orderSliceName)
    const { text } = componentData.componentData as ParagraphFormData
    const error = componentData.componentError as ParagraphError

    const keyOfValueToChange: ParagraphFormDataEnumType = 'text'
    const handleChangeProps = {
        componentData,
        index,
        keyOfValueToChange
    }

    return (
        <ErrorWrapper error={error.text.message}>
            <AutoResizingTextarea
                id={DetailsFormDataEnum.PARAGRAPHS + index}
                padding={0}
                minRows={1}
                lineHeight={26}
                value={text}
                onChange={(e) => {
                    handleChange<HTMLTextAreaElement>({
                        e, ...handleChangeProps
                    })
                }}
                className={`${styles.text} ${className}`}
                placeholder='Абзац'
            />
        </ErrorWrapper>
    )
}