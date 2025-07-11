import { ListFormData, ListOrderComponent, OrderComponent, OrderSliceNameType } from "@/app/types/data/details.type";
import { useDetailsFormSelectSlice } from "@/app/utils/hooks/admin/detailsForm/useDetailsFormSelectSlice";
import { useAppDispatch } from "@/app/utils/redux/hooks";
import { useCallback } from "react";

interface OrderedListHandleKeyDownHookProps {
    index: number
    componentData: ListOrderComponent
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
    const listFormData = detailsComponent.data
    const listFormErrors = detailsComponent.error

    const handleKeyDown = useCallback((e: React.KeyboardEvent, i: number) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();

            // HANDLE OPTIONS
            const newOptions = [...listFormData.options];
            // Insert empty string at the next position
            newOptions.splice(i + 1, 0, '');
            detailsComponent.data.options = newOptions

            // HANDLE ERRORS
            const newErrors = [...listFormErrors.options];
            // Insert empty string at the next position
            newErrors.splice(i + 1, 0, { message: '' });
            detailsComponent.error.options = newErrors

            // Properly typed setValue call
            dispatch(updateDetailsComponent({
                index,
                detailsComponent
            }))
        }

        if (e.key === 'Backspace' && listFormData.options[i] === '' && i > 0) {
            e.preventDefault();

            // HANDLE OPTIONS
            const newOptions = [...listFormData.options];
            // Remove the current option
            newOptions.splice(i, 1);
            detailsComponent.data.options = newOptions

            // HANDLE ERRORS
            const newErrors = [...listFormErrors.options];
            // Insert empty string at the next position
            newErrors.splice(i, 1);
            detailsComponent.error.options = newErrors

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