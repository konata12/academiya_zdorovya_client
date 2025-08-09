import {  ServiceTreatmentTypeDetailsOrderSliceNameType } from "@/app/types/data/details.type"
import { ServiceTreatmentTypesEnum, ServiceTreatmentTypesEnumType } from "@/app/types/data/services.type"
import { FormElements } from "@/app/types/ui/form_components/inputContainers.type"
import { useDetailsFormSlice } from "@/app/utils/hooks/admin/detailsForm/useDetailsFormSlice"
import { getIndexedDBStoreForImages } from "@/app/utils/hooks/admin/indexedDB/useIndexedDBStoreForImages"
import { useAppDispatch } from "@/app/utils/redux/hooks"
import { del, set } from "idb-keyval"
import { useCallback } from "react"
import { v4 as uuidv4 } from 'uuid';


interface ChangeEventProps<T extends FormElements> {
    e: React.ChangeEvent<T>
    elementType: ServiceTreatmentTypesEnumType
    oldValue?: string | null
}

export function useServiceTreatmentTypeFormHandleChange(
    indexedDBStoreName: string,
    detailsOrderSliceName: ServiceTreatmentTypeDetailsOrderSliceNameType
) {
    const dispatch = useAppDispatch()
    const store = getIndexedDBStoreForImages(indexedDBStoreName)
    const {
        setFormError,
        setTitle,
        setDescription,
        setBackgroundImage,
    } = useDetailsFormSlice(detailsOrderSliceName)

    const handleChange = useCallback(<T extends FormElements>({
        e,
        elementType,
        oldValue = null,
    }: ChangeEventProps<T>) => {
        const newValue = e.target.value
        const newFile = (e as React.ChangeEvent<HTMLInputElement>).target.files || null

        switch (elementType) {
            case ServiceTreatmentTypesEnum.TITLE:
                // REQUIRED ERROR HANDLING 
                if (newValue.length > 0) dispatch(setFormError({
                    field: ServiceTreatmentTypesEnum.TITLE,
                    message: ''
                }))

                dispatch(setTitle(newValue))
                break;

            case ServiceTreatmentTypesEnum.DESCRIPTION:
                // REQUIRED ERROR HANDLING 
                if (newValue.length > 0) dispatch(setFormError({
                    field: ServiceTreatmentTypesEnum.DESCRIPTION,
                    message: ''
                }))

                dispatch(setDescription(newValue))
                break;

            case ServiceTreatmentTypesEnum.BACKGROUNDIMG:
                const imageName = uuidv4()
                // REQUIRED ERROR HANDLING 
                if (newValue.length > 0) dispatch(setFormError({
                    field: ServiceTreatmentTypesEnum.BACKGROUNDIMG,
                    message: ''
                }))

                // Delete old image from IndexedDB if it exists
                if (oldValue) {
                    del(oldValue, store)
                }
                if (newFile && newFile[0]) set(imageName, newFile[0], store)

                dispatch(setBackgroundImage(imageName))
                break;
        }
    }, [indexedDBStoreName, detailsOrderSliceName])

    return handleChange
}