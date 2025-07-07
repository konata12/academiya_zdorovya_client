import { ComponentsFormDataEnum, DetailsFormDataEnum, ImageFormData, ImageFormDataEnum, ImageFormDataEnumType, ListFormData, ListFormDataEnum, ListFormDataEnumType, OrderComponent, OrderSliceNameType, ParagraphFormData, ParagraphFormDataEnumType, QuouteFormData, QuouteFormDataEnum, QuouteFormDataEnumType, TitleFormData, TitleFormDataEnum, TitleFormDataEnumType } from "@/app/types/data/details.type";
import { useAppDispatch } from "@/app/utils/redux/hooks";
import { useCallback } from "react";
import { createStore, set, del } from 'idb-keyval';
import { v4 as uuidv4 } from 'uuid';
import { useDetailsFormSelectSlice } from "@/app/utils/hooks/admin/detailsForm/useDetailsFormSelectSlice";


interface HandleChangeProps<T extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> {
    e: React.ChangeEvent<T>,
    componentData: OrderComponent,
    index: number,
    keyOfValueToChange: ComponentsFormDataEnum,
    optionIndex?: number,
}

export function useOrderedFormInput(orderSliceName: OrderSliceNameType) {
    const { updateDetailsComponent } = useDetailsFormSelectSlice(orderSliceName)

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
            const imageName = uuidv4()
            const newFile = (e as React.ChangeEvent<HTMLInputElement>).target.files || null
            const newComponentData = structuredClone(componentData)

            console.log(newFile)

            switch (componentData.componentType) {
                case DetailsFormDataEnum.TITLES:
                    keyOfValueToChange = keyOfValueToChange as TitleFormDataEnumType
                    (newComponentData.componentData as TitleFormData)[keyOfValueToChange] = newValue
                    break;

                case DetailsFormDataEnum.PARAGRAPHS:
                    keyOfValueToChange = keyOfValueToChange as ParagraphFormDataEnumType
                    (newComponentData.componentData as ParagraphFormData)[keyOfValueToChange] = newValue
                    break;

                case DetailsFormDataEnum.QUOUTES:
                    keyOfValueToChange = keyOfValueToChange as QuouteFormDataEnumType
                    (newComponentData.componentData as QuouteFormData)[keyOfValueToChange] = newValue
                    break;

                case DetailsFormDataEnum.LISTS:
                    keyOfValueToChange = keyOfValueToChange as ListFormDataEnumType
                    if (optionIndex !== undefined && keyOfValueToChange === ListFormDataEnum.OPTIONS) {
                        (newComponentData.componentData as ListFormData)[keyOfValueToChange][optionIndex] = newValue
                    }
                    break;

                case DetailsFormDataEnum.IMAGES:
                    keyOfValueToChange = keyOfValueToChange as ImageFormDataEnumType
                    if (keyOfValueToChange === ImageFormDataEnum.IMAGE) {
                        // save image name to redux
                        (newComponentData.componentData as ImageFormData)[keyOfValueToChange] = imageName

                        // save image to indexedDB using name as key
                        const oldImageName = (componentData.componentData as ImageFormData)[keyOfValueToChange]
                        if (oldImageName) {
                            del(oldImageName, createStore('app_db', 'news_images'))
                        }
                        set(imageName, newFile?.[0] || null, createStore('app_db', 'news_images'))
                    } else if (keyOfValueToChange !== ImageFormDataEnum.SIZE) {
                        (newComponentData.componentData as ImageFormData)[keyOfValueToChange] = newValue
                    }
                    break;

                default:
                    break;
            }

            const detailsComponent = {
                componentType: newComponentData.componentType,
                componentData: newComponentData.componentData
            }

            console.log(detailsComponent)

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