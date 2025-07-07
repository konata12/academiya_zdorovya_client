import { DetailsFormData, DetailsFormDataEnum, DetailsFormDataEnumType, DetailsFormDataType, ImageFormData, ListFormData, OrderComponent, OrderSliceNameType, ParagraphFormData, QuouteFormData, TitleFormData } from "@/app/types/data/details.type"
import { useDetailsFormSelectSlice } from "@/app/utils/hooks/admin/detailsForm/useDetailsFormSelectSlice"
import { useAppDispatch } from "@/app/utils/redux/hooks"
import { DragEndEvent } from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"
import { useCallback } from "react"
import { FieldArrayWithId } from "react-hook-form"


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
            switch (component.componentType) {
                case DetailsFormDataEnum.TITLES:
                    data.titles.push(component.componentData as TitleFormData)
                    break;

                case DetailsFormDataEnum.PARAGRAPHS:
                    data.paragraphs.push(component.componentData as ParagraphFormData)
                    break;

                case DetailsFormDataEnum.QUOUTES:
                    data.quoutes.push(component.componentData as QuouteFormData)
                    break;

                case DetailsFormDataEnum.LISTS:
                    data.lists.push(component.componentData as ListFormData)
                    break;

                case DetailsFormDataEnum.IMAGES:
                    data.images.push(component.componentData as ImageFormData)
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
        return fieldArray.findIndex((field) => (field as any).orderId === orderedId)
    }, [])

    return {
        renderOrderedComponents,

        handleDragEnd,
        getFieldArrayIdByOrderId,
        getFieldArrayIndexByOrderId
    }
}