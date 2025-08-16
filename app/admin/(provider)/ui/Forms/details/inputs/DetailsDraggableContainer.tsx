import React from 'react'
import styles from './DetailsDraggableContainer.module.scss'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DetailsFormDataEnum, DetailsFormDataEnumType } from '@/app/types/data/details.type';
import CloseButton from '@/app/common_ui/animated_components/CloseButton/CloseButton';


export interface DetailsDraggableContainerProps {
    children: React.ReactNode
    id: string
    elementType: DetailsFormDataEnumType
    index: number
    handleDelete: () => void
}

export default function DetailsDraggableContainer({
    children,
    id,
    elementType,
    index,
    handleDelete
}: DetailsDraggableContainerProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({
        id
    });

    const componentIsTitleNotForstInOrder = elementType === DetailsFormDataEnum.TITLES && index > 0
    const dafeultPadding = 64
    const setBtnPositionAfterPadding = (padding: number) => {
        buttonPosition.top = `calc((100% - ${padding}px) / 2 + ${padding}px)`
        buttonPosition.transform = 'translateY(-50%)'
    }

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    const buttonPosition: React.CSSProperties = {}

    if (!index) {
        buttonPosition.top = '50%'
        buttonPosition.transform = 'translateY(-50%)'
    } else {
        switch (elementType) {
            case DetailsFormDataEnum.TITLES:
                setBtnPositionAfterPadding(128)
                break;

            case DetailsFormDataEnum.PARAGRAPHS:
            case DetailsFormDataEnum.QUOTES:
            case DetailsFormDataEnum.LISTS:
            case DetailsFormDataEnum.IMAGES:
                setBtnPositionAfterPadding(dafeultPadding)
                break;

            default:
                break;
        }
    }

    return (
        <div
            className={`${styles.container} ${(componentIsTitleNotForstInOrder && styles.titleNotForstInOrder) || ''}`}
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        >
            <CloseButton
                handleClick={handleDelete}
                hoverCrossColor='#FFF'
                style={buttonPosition}
                className={styles.deleteBtn}
            />
            {children}
        </div>
    )
}