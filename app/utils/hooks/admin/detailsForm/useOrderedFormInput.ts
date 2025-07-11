import {
    ComponentsFormDataEnum,
    DetailsFormDataEnum,
    ImageError,
    ImageFormData,
    ImageFormDataEnum,
    ImageFormDataEnumType,
    ListError,
    ListFormData,
    ListFormDataEnum,
    ListFormDataEnumType,
    OrderComponent,
    OrderSliceNameType,
    ParagraphError,
    ParagraphFormData,
    ParagraphFormDataEnumType,
    QuouteError,
    QuouteFormData,
    QuouteFormDataEnumType,
    TitleError,
    TitleFormDataEnumType
} from '@/app/types/data/details.type';
import { del, set } from 'idb-keyval';
import { useAppDispatch } from '@/app/utils/redux/hooks';
import { useCallback } from 'react';
import { useDetailsFormSelectSlice } from '@/app/utils/hooks/admin/detailsForm/useDetailsFormSelectSlice';
import { useIndexedDBStoreForDetailsImages } from '@/app/utils/hooks/admin/detailsForm/useIndexedDBStoreForDetailsImages';
import { v4 as uuidv4 } from 'uuid';


interface HandleChangeProps<T extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> {
    e: React.ChangeEvent<T>,
    componentData: OrderComponent,
    index: number,
    keyOfValueToChange: ComponentsFormDataEnum,
    optionIndex?: number,
}

export function useOrderedFormInput(orderSliceName: OrderSliceNameType) {
    const { updateDetailsComponent } = useDetailsFormSelectSlice(orderSliceName)

    const store = useIndexedDBStoreForDetailsImages(orderSliceName)
    const dispatch = useAppDispatch()

    const handleChange = useCallback(
        <T extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>({
            e,
            componentData,
            index,
            keyOfValueToChange,
            optionIndex,
        }: HandleChangeProps<T>) => {
            const newValue = e.target.value
            const newFile = (e as React.ChangeEvent<HTMLInputElement>).target.files || null
            const newComponentData = structuredClone(componentData)

            switch (newComponentData.type) {
                case DetailsFormDataEnum.TITLES:
                    keyOfValueToChange = keyOfValueToChange as TitleFormDataEnumType;
                    newComponentData.data[keyOfValueToChange] = newValue;

                    // HANDLE ERROR
                    if (newValue.length) {
                        (newComponentData.error as TitleError)[keyOfValueToChange].message = ''
                    }
                    break;
                case DetailsFormDataEnum.PARAGRAPHS:
                    keyOfValueToChange = keyOfValueToChange as ParagraphFormDataEnumType
                    (newComponentData.data as ParagraphFormData)[keyOfValueToChange] = newValue

                    // HANDLE ERROR
                    if (newValue.length) {
                        (newComponentData.error as ParagraphError)[keyOfValueToChange].message = '';
                    }
                    break;
                case DetailsFormDataEnum.QUOUTES:
                    keyOfValueToChange = keyOfValueToChange as QuouteFormDataEnumType
                    (newComponentData.data as QuouteFormData)[keyOfValueToChange] = newValue

                    // HANDLE ERROR
                    if (newValue.length) {
                        (newComponentData.error as QuouteError)[keyOfValueToChange].message = '';
                    }
                    break;
                case DetailsFormDataEnum.LISTS:
                    keyOfValueToChange = keyOfValueToChange as ListFormDataEnumType
                    if (optionIndex !== undefined && keyOfValueToChange === ListFormDataEnum.OPTIONS) {
                        (newComponentData.data as ListFormData)[keyOfValueToChange][optionIndex] = newValue

                        // HANDLE ERROR
                        if (newValue.length) {
                            (newComponentData.error as ListError)[keyOfValueToChange][optionIndex].message = '';
                        }
                    }
                    break;
                case DetailsFormDataEnum.IMAGES:
                    keyOfValueToChange = keyOfValueToChange as ImageFormDataEnumType
                    if (keyOfValueToChange === ImageFormDataEnum.IMAGE) {
                        // save image name to redux
                        const imageName = uuidv4();
                        (newComponentData.data as ImageFormData)[keyOfValueToChange] = imageName;

                        // save image to indexedDB using name as key
                        const oldImageName = (componentData.data as ImageFormData)[keyOfValueToChange];
                        if (oldImageName) {
                            del(oldImageName, store);
                        };
                        set(imageName, newFile?.[0] || null, store)
                    } else if (keyOfValueToChange !== ImageFormDataEnum.SIZE) {
                        (newComponentData.data as ImageFormData)[keyOfValueToChange] = newValue
                    }

                    // HANDLE ERROR
                    if (newValue.length && keyOfValueToChange !== ImageFormDataEnum.SIZE) {
                        (newComponentData.error as ImageError)[keyOfValueToChange].message = '';
                    }
                    break;
            }

            dispatch(updateDetailsComponent({
                index,
                detailsComponent: newComponentData
            }))
        }, []
    )

    return {
        handleChange,
    }
}