import { FormElements } from '@/app/types/ui/form_components/inputContainers.type';
import { getIndexedDBStoreForImages } from '@/app/utils/hooks/admin/indexedDB/useIndexedDBStoreForImages';
import {
    ServiceFormDataEnum,
    ServiceFormDataEnumType,
    ServiceFormHandleChangeField,
    ServiceFormIndexedDBType,
    ServiceStringKeysType,
    ServiceTreatmentStageEnum,
    ServiceTreatmentStageEnumType
} from '@/app/types/data/services.type';
import { useAppDispatch } from '@/app/utils/redux/hooks';
import { useCallback } from 'react';
import { useServiceFormSlice } from '@/app/utils/hooks/admin/serviceForm/useServiceFormSlice';
import { v4 as uuidv4 } from 'uuid';
import { del, set } from 'idb-keyval';


interface ChangeEventProps<T extends FormElements> {
    e: React.ChangeEvent<T>
    elementType: ServiceFormHandleChangeField
    oldValue?: string | null
    arrIndex?: number
}

export function useServiceFormHandleChange(
    indexedDBStoreName: ServiceFormIndexedDBType
) {
    const dispatch = useAppDispatch()
    const store = getIndexedDBStoreForImages(indexedDBStoreName)
    const {
        setStringValue,
        setTreatmentStagesValue,
        setBasicValueError,
        setTreatmentStagesError
    } = useServiceFormSlice(indexedDBStoreName)

    // SET ARRAYS FOR GROUPING FIELDS BY VALUE TYPES
    const stringFields: ServiceStringKeysType[] = [
        ServiceFormDataEnum.TITLE,
        ServiceFormDataEnum.SHORTDESCRIPTION,
        ServiceFormDataEnum.MAINDESCRIPTION,
        ServiceFormDataEnum.TREATMENTTYPESDESCRIPTION,
    ];

    const handleChange = useCallback(<T extends FormElements>({
        e,
        elementType,
        oldValue = null,
        arrIndex,
    }: ChangeEventProps<T>) => {
        const newValue = e.target.value
        const newFile = (e as React.ChangeEvent<HTMLInputElement>).target.files || null

        if (stringFields.includes(elementType as ServiceStringKeysType)) {
            // REQUIRED ERROR HANDLING 
            if (newValue.length > 0) dispatch(setBasicValueError({
                field: elementType as ServiceStringKeysType,
                message: ''
            }))

            dispatch(setStringValue({
                field: elementType as ServiceStringKeysType,
                value: newValue
            }))
        }
        if (elementType === `${ServiceFormDataEnum.TREATMENTSTAGES}_${ServiceTreatmentStageEnum.TITLE}`
            || elementType === `${ServiceFormDataEnum.TREATMENTSTAGES}_${ServiceTreatmentStageEnum.DESCRIPTION}`) {
            // REQUIRED ERROR HANDLING
            if (arrIndex !== undefined) {
                const field = elementType.split('_')[1]
                if (newValue.length > 0) dispatch(setTreatmentStagesError({
                    field: field as ServiceTreatmentStageEnumType,
                    index: arrIndex,
                    message: ''
                }))

                dispatch(setTreatmentStagesValue({
                    field: field as ServiceTreatmentStageEnumType,
                    index: arrIndex,
                    value: newValue
                }))
            }
        }
        if (elementType === ServiceFormDataEnum.IMAGE) {
            const imageName = uuidv4()
            // REQUIRED ERROR HANDLING 
            if (newValue.length > 0) dispatch(setBasicValueError({
                field: ServiceFormDataEnum.IMAGE,
                message: ''
            }))

            // Delete old image from IndexedDB if it exists
            if (oldValue) {
                del(oldValue, store)
            }
            if (newFile && newFile[0]) set(imageName, newFile[0], store)

            // SET REDUX VALUE
            dispatch(setStringValue({
                field: ServiceFormDataEnum.IMAGE,
                value: imageName
            }))
        }
    }, [indexedDBStoreName])

    return handleChange
}