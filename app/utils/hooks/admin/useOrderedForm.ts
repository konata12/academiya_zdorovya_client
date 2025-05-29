import { DetailsFormData, DetailsFormDataEnumType, OrderComponent } from "@/app/types/data/details.type"
import { setDetailsStateOrder } from "@/app/utils/redux/details/detailsOrderSlice"
import { useAppDispatch } from "@/app/utils/redux/hooks"
import { DragEndEvent } from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"
import { useCallback } from "react"
import { FieldArrayWithId } from "react-hook-form"

export function useOrderedForm() {
    const dispatch = useAppDispatch()

    // DRAG AND DROP HANDLER
    const handleDragEnd = useCallback((event: DragEndEvent, order: OrderComponent[]) => {
        const { active, over } = event

        if (!over) return
        if (active.id === over.id) return

        // Find the actual items in the order array
        const activeItemIndex = order.findIndex(item => item.componentData.orderId === active.id)
        const overItemIndex = order.findIndex(item => item.componentData.orderId === over.id)

        if (activeItemIndex === -1 || overItemIndex === -1) return

        // Create the new ordered array
        const newOrder = arrayMove(order, activeItemIndex, overItemIndex)

        // Dispatch the update
        dispatch(setDetailsStateOrder(newOrder))
    }, [])

    // HELPER FUNCTIONS
    const getFieldArrayIdByOrderId = useCallback(<T extends DetailsFormDataEnumType>(
        orderedId: string,
        fieldArray: FieldArrayWithId<DetailsFormData, T, "id">[]
    ) => {
        const field = fieldArray.find((field) => (field as any).orderId === orderedId)
        return field?.id
    }, [])

    const getFieldArrayIndexByOrderId = useCallback(<T extends DetailsFormDataEnumType>(
        orderedId: string,
        fieldArray: FieldArrayWithId<DetailsFormData, T, "id">[]
    ) => {
        // console.log(orderedId, fieldArray)
        return fieldArray.findIndex((field) => (field as any).orderId === orderedId)
    }, [])

    return {
        handleDragEnd,
        getFieldArrayIdByOrderId,
        getFieldArrayIndexByOrderId
    }
}