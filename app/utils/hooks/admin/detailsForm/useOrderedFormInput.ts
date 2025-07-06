import { ComponentsFormDataEnum, DetailsFormDataEnum, DetailsFromElementBasicType, ImageFormData, ImageFormDataEnum, ImageFormDataEnumType, ListFormData, ListFormDataEnum, ListFormDataEnumType, OrderComponent, OrderSliceNameType, ParagraphFormData, ParagraphFormDataEnumType, QuouteFormData, QuouteFormDataEnum, QuouteFormDataEnumType, TitleFormData, TitleFormDataEnum, TitleFormDataEnumType } from "@/app/types/data/details.type";
import { updateNewsDetailsComponent } from "@/app/utils/redux/details/newsDetailsOrderSlice";
import { useAppDispatch } from "@/app/utils/redux/hooks";
import { useCallback } from "react";

interface OrderedListHandleKeyDownHookProps {
    orderSliceName: OrderSliceNameType
}

interface HandleChangeProps<T extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> {
    e: React.ChangeEvent<T>,
    componentData: OrderComponent,
    index: number,
    keyOfValueToChange: ComponentsFormDataEnum,
    optionIndex?: number,
}

export function useOrderedFormInput(orderSliceName: OrderSliceNameType) {
    const dispatch = useAppDispatch()

    // select reducer based on the details order slice
    let reducer
    switch (orderSliceName) {
        case 'newsDetailsOrderSlice':
            reducer = updateNewsDetailsComponent
            break;
    }

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
                        (newComponentData.componentData as ImageFormData)[keyOfValueToChange] = newFile
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

            dispatch(reducer({
                index,
                detailsComponent
            }))
        }, []
    )

    return {
        handleChange,
    }
}