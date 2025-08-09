import { arrayMove } from '@dnd-kit/sortable';
import {
    OrderComponent,
    DetailsOrderSliceNameType,
    } from '@/app/types/data/details.type';
import { DragEndEvent } from '@dnd-kit/core';
import { useAppDispatch } from '@/app/utils/redux/hooks';
import { useCallback } from 'react';
import { useDetailsFormSlice } from '@/app/utils/hooks/admin/detailsForm/useDetailsFormSlice';


export function useOrderedForm(orderSliceName: DetailsOrderSliceNameType) {
    const { setDetailsStateOrder } = useDetailsFormSlice(orderSliceName)

    const dispatch = useAppDispatch()

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
        handleDragEnd,
    }
}