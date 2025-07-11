import { ListFormData, OrderComponent, OrderSliceNameType } from "@/app/types/data/details.type";
import { useDetailsFormSelectSlice } from "@/app/utils/hooks/admin/detailsForm/useDetailsFormSelectSlice";
import { useAppDispatch } from "@/app/utils/redux/hooks";
import { useCallback } from "react";

interface OrderedListHandleKeyDownHookProps {
    index: number
    componentData: OrderComponent
    orderSliceName: OrderSliceNameType
}

export function useOrderedListHandleKeyDown({
    index,
    componentData,
    orderSliceName,
}: OrderedListHandleKeyDownHookProps) {
    const { updateDetailsComponent } = useDetailsFormSelectSlice(orderSliceName)

    const dispatch = useAppDispatch()

    const detailsComponent = structuredClone(componentData)
    const listFormData = detailsComponent.componentData as ListFormData

    const handleKeyDown = useCallback((e: React.KeyboardEvent, i: number) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();

            const newOptions = [...listFormData.options];
            // Insert empty string at the next position
            newOptions.splice(i + 1, 0, '');
            (detailsComponent.componentData as ListFormData).options = newOptions

            // Properly typed setValue call
            dispatch(updateDetailsComponent({
                index,
                detailsComponent
            }))
        }

        if (e.key === 'Backspace' && listFormData.options[i] === '' && i > 0) {
            e.preventDefault();

            const newOptions = [...listFormData.options];
            // Remove the current option
            newOptions.splice(i, 1);
            (detailsComponent.componentData as ListFormData).options = newOptions

            // Properly typed setValue call
            dispatch(updateDetailsComponent({
                index,
                detailsComponent
            }))
        }
    }, [detailsComponent, listFormData])

    return {
        handleKeyDown
    }
}