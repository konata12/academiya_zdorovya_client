import { AboutTreatmentEnum, AboutTreatmentEnumType, AboutTreatmentFormIndexedDBType } from '@/app/types/data/about_treatment.type';
import { FormElements } from '@/app/types/ui/form_components/inputContainers.type';
import { getIndexedDBStoreForImages } from '@/app/utils/hooks/admin/indexedDB/useIndexedDBStoreForImages';
import {
    setAboutTreatmentBasicValueError,
    setAboutTreatmentImage,
    setAboutTreatmentTitle,
    setAboutTreatmentTreatmentType,
    setAboutTreatmentTreatmentTypesValueError
    } from '@/app/utils/redux/about_treatment/aboutTreatmentCreateFormSlice';
import { useAppDispatch } from '@/app/utils/redux/hooks';
import { del, set } from 'idb-keyval';
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
                if (newValue.length > 0) dispatch(setAboutTreatmentBasicValueError({
                    field: AboutTreatmentEnum.TITLE,
                    message: ''
                }))

                dispatch(setAboutTreatmentTitle(newValue))
                break;

            case AboutTreatmentEnum.TREATMENTTYPES:
                // REQUIRED ERROR HANDLING 
                if (arrIndex !== undefined) {
                    if (newValue.length > 0) dispatch(setAboutTreatmentTreatmentTypesValueError({
                        index: arrIndex,
                        message: ''
                    }))

                    dispatch(setAboutTreatmentTreatmentType({
                        index: arrIndex,
                        value: newValue,
                    }))
                }
                break;

            case AboutTreatmentEnum.IMG:
                const imageName = uuidv4()
                // REQUIRED ERROR HANDLING 
                if (newValue.length > 0) dispatch(setAboutTreatmentBasicValueError({
                    field: AboutTreatmentEnum.IMG,
                    message: ''
                }))

                if (oldValue) {
                    del(oldValue, store)
                } // Delete old image from IndexedDB if it exists
                if (newFile && newFile[0]) set(imageName, newFile[0], store)

                dispatch(setAboutTreatmentImage(imageName))
                break;
        }
    }, [indexedDBStoreName])

    return handleChange
}