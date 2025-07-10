import { NewsFormDataEnum, NewsFormDataEnumType } from "@/app/types/data/news.type"
import { FormElements } from "@/app/types/ui/form_components/inputContainers.type"
import { useIndexedDBStoreForImages } from "@/app/utils/hooks/admin/indexedDB/useIndexedDBStoreForImages"
import { useAppDispatch } from "@/app/utils/redux/hooks"
import { setNewsFormBackgroundImage, setNewsFormDescription, setNewsFormError, setNewsFormTitle } from "@/app/utils/redux/news/newsFormSlice"
import { del, set } from "idb-keyval"
import { useCallback } from "react"
import { v4 as uuidv4 } from 'uuid';


interface ChangeEventProps<T extends FormElements> {
    e: React.ChangeEvent<T>
    elementType: NewsFormDataEnumType
    oldValue?: string | null
}

export function useNewsFormHandleChange(indexedDBStoreName: string) {
    const dispatch = useAppDispatch()
    const store = useIndexedDBStoreForImages(indexedDBStoreName)

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
                if (newValue.length > 0) dispatch(setNewsFormError({
                    field: NewsFormDataEnum.TITLE,
                    message: ''
                }))

                dispatch(setNewsFormTitle(newValue))
                break;

            case NewsFormDataEnum.DESCRIPTION:
                // REQUIRED ERROR HANDLING 
                if (newValue.length > 0) dispatch(setNewsFormError({
                    field: NewsFormDataEnum.DESCRIPTION,
                    message: ''
                }))

                dispatch(setNewsFormDescription(newValue))
                break;

            case NewsFormDataEnum.BACKGROUNDIMG:
                const imageName = uuidv4()
                // REQUIRED ERROR HANDLING 
                if (newValue.length > 0) dispatch(setNewsFormError({
                    field: NewsFormDataEnum.BACKGROUNDIMG,
                    message: ''
                }))

                if (oldValue) {
                    console.log(oldValue)
                    del(oldValue, store)
                } // Delete old image from IndexedDB if it exists
                if (newFile && newFile[0]) set(imageName, newFile[0], store)

                dispatch(setNewsFormBackgroundImage(imageName))
                break;
        }
    }, [indexedDBStoreName])

    return handleChange
}