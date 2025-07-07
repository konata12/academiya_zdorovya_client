import { ListFormData, OrderComponent, OrderSliceNameType } from "@/app/types/data/details.type";
import { useDetailsFormSelectSlice } from "@/app/utils/hooks/admin/detailsForm/useDetailsFormSelectSlice";
import { useAppDispatch } from "@/app/utils/redux/hooks";
import { useCallback } from "react";
import { Path, PathValue, UseFormSetValue } from "react-hook-form";

interface OrderedListHandleKeyDownHookProps<T extends Record<string, any>> {
    name: Path<T>
    index: number
    componentData: OrderComponent
    setValue: UseFormSetValue<T> | undefined
    list: ListFormData
    orderSliceName: OrderSliceNameType
}

export function useOrderedListHandleKeyDown<T extends Record<string, any>>({
    name,
    index,
    componentData,
    setValue,
    list,
    orderSliceName,
}: OrderedListHandleKeyDownHookProps<T>) {
    const { updateDetailsComponent } = useDetailsFormSelectSlice(orderSliceName)

    const dispatch = useAppDispatch()

    const detailsComponent = structuredClone(componentData)
    const listFormData = detailsComponent.componentData as ListFormData

    const handleKeyDown = useCallback((e: React.KeyboardEvent, i: number) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();

            if (setValue) {
                // Create a new array reference to trigger React Hook Form's change detection
                const newOptions = [...listFormData.options];
                // Insert empty string at the next position
                newOptions.splice(i + 1, 0, '');
                (detailsComponent.componentData as ListFormData).options = newOptions

                // Properly typed setValue call
                setValue(name as Path<T>, newOptions as PathValue<T, Path<T>>);
                dispatch(updateDetailsComponent({
                    index,
                    detailsComponent
                }))
            }
        }

        if (e.key === 'Backspace' && listFormData.options[i] === '' && i > 0) {
            e.preventDefault();

            if (setValue) {
                // Create a new array reference to trigger React Hook Form's change detection
                const newOptions = [...listFormData.options];
                // Remove the current option
                newOptions.splice(i, 1);
                (detailsComponent.componentData as ListFormData).options = newOptions

                // Properly typed setValue call
                setValue(name as Path<T>, newOptions as PathValue<T, Path<T>>);
                dispatch(updateDetailsComponent({
                    index,
                    detailsComponent
                }))
            }
        }
    }, [list, name, detailsComponent, listFormData])

    return {
        handleKeyDown
    }
}