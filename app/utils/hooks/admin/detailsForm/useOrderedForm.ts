import { arrayMove } from '@dnd-kit/sortable';
import {
    DetailsFormData,
    DetailsFormDataEnum,
    OrderComponent,
    OrderSliceNameType,
    } from '@/app/types/data/details.type';
import { DragEndEvent } from '@dnd-kit/core';
import { useAppDispatch } from '@/app/utils/redux/hooks';
import { useCallback } from 'react';
import { useDetailsFormSelectSlice } from '@/app/utils/hooks/admin/detailsForm/useDetailsFormSelectSlice';


export function useOrderedForm(orderSliceName: OrderSliceNameType) {
    const { setDetailsStateOrder } = useDetailsFormSelectSlice(orderSliceName)

    const dispatch = useAppDispatch()

    const renderOrderedComponents = useCallback((order: OrderComponent[]): DetailsFormData => {
        const data: DetailsFormData = {
            titles: [],
            paragraphs: [],
            quoutes: [],
            lists: [],
            images: [],
        }

        order.forEach((component) => {
            switch (component.type) {
                case DetailsFormDataEnum.TITLES:
                    data.titles.push(component.data)
                    break;

                case DetailsFormDataEnum.PARAGRAPHS:
                    data.paragraphs.push(component.data)
                    break;

                case DetailsFormDataEnum.QUOUTES:
                    data.quoutes.push(component.data)
                    break;

                case DetailsFormDataEnum.LISTS:
                    data.lists.push(component.data)
                    break;

                case DetailsFormDataEnum.IMAGES:
                    data.images.push(component.data)
                    break;

                default:
                    throw Error('renderOrderedComponents error')
            }
        })

        return data
    }, [])

    // DRAG AND DROP HANDLER
    const handleDragEnd = useCallback((event: DragEndEvent, order: OrderComponent[]) => {
        const { active, over } = event

        if (!over) return
        if (active.id === over.id) return

        // Find the actual items in the order array
        const activeItemIndex = order.findIndex(item => item.data.orderId === active.id)
        const overItemIndex = order.findIndex(item => item.data.orderId === over.id)

        if (activeItemIndex === -1 || overItemIndex === -1) return

        // Create the new ordered array
        const newOrder = arrayMove(order, activeItemIndex, overItemIndex)

        // Dispatch the update
        dispatch(setDetailsStateOrder(newOrder))
    }, [])

    return {
        renderOrderedComponents,
        handleDragEnd,
    }
}