import { renameFile, uniqFileNameAndKeepExtension } from "@/app/services/files.service"
import { NewsDetailsOrderSliceNameType } from "@/app/types/data/details.type"
import { NewsFormDataEnum, NewsFormDataEnumType } from "@/app/types/data/news.type"
import { FormElements } from "@/app/types/ui/form_components/inputContainers.type"
import { useDetailsFormSlice } from "@/app/utils/hooks/admin/detailsForm/useDetailsFormSlice"
import { getIndexedDBStoreForImages } from "@/app/utils/hooks/admin/indexedDB/useIndexedDBStoreForImages"
import { useAppDispatch } from "@/app/utils/redux/hooks"
import { del, set } from "idb-keyval"
import { useCallback } from "react"
import { v4 as uuidv4 } from 'uuid';


interface ChangeEventProps<T extends FormElements> {
    e: React.ChangeEvent<T>
    elementType: NewsFormDataEnumType
    oldValue?: string | null
}

export function useNewsFormHandleChange(
    indexedDBStoreName: string,
    detailsOrderSliceName: NewsDetailsOrderSliceNameType
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
            case NewsFormDataEnum.TITLE:
                // REQUIRED ERROR HANDLING 
                if (newValue.length > 0) dispatch(setFormError({
                    field: NewsFormDataEnum.TITLE,
                    message: ''
                }))

                dispatch(setTitle(newValue))
                break;

            case NewsFormDataEnum.DESCRIPTION:
                // REQUIRED ERROR HANDLING 
                if (newValue.length > 0) dispatch(setFormError({
                    field: NewsFormDataEnum.DESCRIPTION,
                    message: ''
                }))

                dispatch(setDescription(newValue))
                break;

            case NewsFormDataEnum.BACKGROUNDIMG:
                const uniqName = uuidv4()
                // REQUIRED ERROR HANDLING 
                if (newValue.length > 0) dispatch(setFormError({
                    field: NewsFormDataEnum.BACKGROUNDIMG,
                    message: ''
                }))

                // Delete old image from IndexedDB if it exists
                if (oldValue) {
                    del(oldValue, store)
                }

                if (newFile && newFile[0]) {
                    const imageName = uniqFileNameAndKeepExtension(uniqName, newFile[0])
                    const image = renameFile(newFile[0], imageName)

                    set(imageName, image, store)
                    dispatch(setBackgroundImage(imageName))
                }
                break;
        }
    }, [indexedDBStoreName, detailsOrderSliceName])

    return handleChange
}