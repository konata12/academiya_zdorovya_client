import React from 'react'
import styles from './DraggableContainer.module.scss'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DetailsFormDataEnum, DetailsFormDataEnumType } from '@/app/types/data/details.type';


export interface DraggableContainerProps {
    children: React.ReactNode
    id: string
    elementType: DetailsFormDataEnumType
    index: number
}

export default function DraggableContainer({
    children,
    id,
    elementType,
    index,
}: DraggableContainerProps) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id
    });
    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        outline: transform ? '1px solid #2F3035' : undefined,
    };

    const buttonPosition: React.CSSProperties = {}

    switch (elementType) {
        case DetailsFormDataEnum.TITLES:
            index === 0
                ? (
                    buttonPosition.top = '50%',
                    buttonPosition.transform = 'translateY(-50%)'
                )
                : buttonPosition.bottom = '6px'
            break;

        case DetailsFormDataEnum.PARAGRAPHS:
            buttonPosition.bottom = '0'
            break;

        case DetailsFormDataEnum.QUOUTES:
        case DetailsFormDataEnum.LISTS:
            buttonPosition.top = 'calc((100% - 64px) / 2)'
            buttonPosition.transform = 'translateY(calc((100% + 64px) / 2))'
            break;

        default:
            break;
    }

    return (
        <div
            className={styles.container}
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        >
            <button
                type='button'
                className={styles.deleteBtn}
                style={buttonPosition}
            >
                X
            </button>
            {children}
        </div>
    )
}