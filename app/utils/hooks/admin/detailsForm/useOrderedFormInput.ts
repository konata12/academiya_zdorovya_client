import {
    ComponentsFormDataEnum,
    DetailsFormDataEnum,
    DetailsFormDataErrorType,
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
    TitleFormData,
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


            switch (componentData.componentType) {
                case DetailsFormDataEnum.TITLES:
                    keyOfValueToChange = keyOfValueToChange as TitleFormDataEnumType;
                    (newComponentData.componentData as TitleFormData)[keyOfValueToChange] = newValue;

                    // HANDLE ERROR
                    if (newValue.length) {
                        (newComponentData.componentError as TitleError)[keyOfValueToChange].message = ''
                    }
                    break;

                case DetailsFormDataEnum.PARAGRAPHS:
                    keyOfValueToChange = keyOfValueToChange as ParagraphFormDataEnumType
                    (newComponentData.componentData as ParagraphFormData)[keyOfValueToChange] = newValue

                    // HANDLE ERROR
                    if (newValue.length) {
                        (newComponentData.componentError as ParagraphError)[keyOfValueToChange].message = '';
                    }
                    break;

                case DetailsFormDataEnum.QUOUTES:
                    keyOfValueToChange = keyOfValueToChange as QuouteFormDataEnumType
                    (newComponentData.componentData as QuouteFormData)[keyOfValueToChange] = newValue

                    // HANDLE ERROR
                    if (newValue.length) {
                        (newComponentData.componentError as QuouteError)[keyOfValueToChange].message = '';
                    }
                    break;

                case DetailsFormDataEnum.LISTS:
                    keyOfValueToChange = keyOfValueToChange as ListFormDataEnumType
                    if (optionIndex !== undefined && keyOfValueToChange === ListFormDataEnum.OPTIONS) {
                        (newComponentData.componentData as ListFormData)[keyOfValueToChange][optionIndex] = newValue

                        // HANDLE ERROR
                        if (newValue.length) {
                            (newComponentData.componentError as ListError)[keyOfValueToChange][optionIndex].message = '';
                        }
                    }
                    break;

                case DetailsFormDataEnum.IMAGES:
                    keyOfValueToChange = keyOfValueToChange as ImageFormDataEnumType
                    if (keyOfValueToChange === ImageFormDataEnum.IMAGE) {
                        // save image name to redux
                        const imageName = uuidv4();
                        (newComponentData.componentData as ImageFormData)[keyOfValueToChange] = imageName;

                        // save image to indexedDB using name as key
                        const oldImageName = (componentData.componentData as ImageFormData)[keyOfValueToChange];
                        if (oldImageName) {
                            del(oldImageName, store);
                        };
                        set(imageName, newFile?.[0] || null, store)
                    } else if (keyOfValueToChange !== ImageFormDataEnum.SIZE) {
                        (newComponentData.componentData as ImageFormData)[keyOfValueToChange] = newValue
                    }

                    // HANDLE ERROR
                    if (newValue.length && keyOfValueToChange !== ImageFormDataEnum.SIZE) {
                        (newComponentData.componentError as ImageError)[keyOfValueToChange].message = '';
                    }
                    break;
            }

            const detailsComponent = {
                componentType: newComponentData.componentType,
                componentData: newComponentData.componentData,
                componentError: newComponentData.componentError,
            }

            dispatch(updateDetailsComponent({
                index,
                detailsComponent
            }))
        }, []
    )

    return {
        handleChange,
    }
}