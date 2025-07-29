import { AboutTreatmentEnum, AboutTreatmentEnumType, AboutTreatmentFormIndexedDBType } from '@/app/types/data/about_treatment.type';
import { del, set } from 'idb-keyval';
import { FormElements } from '@/app/types/ui/form_components/inputContainers.type';
import { getIndexedDBStoreForImages } from '@/app/utils/hooks/admin/indexedDB/useIndexedDBStoreForImages';
import { useAboutTreatmentFormSlice } from '@/app/utils/hooks/admin/aboutTreatmentForm/useAboutTreatmentFormSlice';
import { useAppDispatch } from '@/app/utils/redux/hooks';
import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';


interface ChangeEventProps<T extends FormElements> {
    e: React.ChangeEvent<T>
    elementType: AboutTreatmentEnumType
    oldValue?: string | null
    arrIndex?: number
}

export function useAboutTreatmentFormHandleChange(
    indexedDBStoreName: AboutTreatmentFormIndexedDBType
) {
    const dispatch = useAppDispatch()
    const store = getIndexedDBStoreForImages(indexedDBStoreName)
    const {
        setTitle,
        setImage,
        setTreatmentType,
        setBasicValueError,
        setTreatmentTypesValueError,
    } = useAboutTreatmentFormSlice(indexedDBStoreName)

    const handleChange = useCallback(<T extends FormElements>({
        e,
        elementType,
        oldValue = null,
        arrIndex,
    }: ChangeEventProps<T>) => {
        const newValue = e.target.value
        const newFile = (e as React.ChangeEvent<HTMLInputElement>).target.files || null

        switch (elementType) {
            case AboutTreatmentEnum.TITLE:
                // REQUIRED ERROR HANDLING 
                if (newValue.length > 0) dispatch(setBasicValueError({
                    field: AboutTreatmentEnum.TITLE,
                    message: ''
                }))

                dispatch(setTitle(newValue))
                break;

            case AboutTreatmentEnum.TREATMENTTYPES:
                // REQUIRED ERROR HANDLING 
                if (arrIndex !== undefined) {
                    if (newValue.length > 0) dispatch(setTreatmentTypesValueError({
                        index: arrIndex,
                        message: ''
                    }))

                    dispatch(setTreatmentType({
                        index: arrIndex,
                        value: newValue,
                    }))
                }
                break;

            case AboutTreatmentEnum.IMG:
                const imageName = uuidv4()
                // REQUIRED ERROR HANDLING 
                if (newValue.length > 0) dispatch(setBasicValueError({
                    field: AboutTreatmentEnum.IMG,
                    message: ''
                }))

                if (oldValue) {
                    del(oldValue, store)
                } // Delete old image from IndexedDB if it exists
                if (newFile && newFile[0]) set(imageName, newFile[0], store)

                dispatch(setImage(imageName))
                break;
        }
    }, [indexedDBStoreName])

    return handleChange
}