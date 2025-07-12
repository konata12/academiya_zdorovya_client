import { parseDetailsRequestFormData } from "@/app/services/details.service"
import { CreateNewsFormData, NewsFormDataEnum } from "@/app/types/data/news.type"
import { useIndexedDBStoreForImages } from "@/app/utils/hooks/admin/indexedDB/useIndexedDBStoreForImages"
import { get } from "idb-keyval"

const storeName = 'news_images'

export const createNewsFormData = async (data: CreateNewsFormData) => {
    const formData = new FormData()

    for (const key in data) {
        const value = data[key as keyof CreateNewsFormData]

        if (key === NewsFormDataEnum.TITLE || key === NewsFormDataEnum.DESCRIPTION) {
            if (typeof value !== 'string') {
                throw Error('Заголовок або опис неправильного формату')
            }
            formData.append(key, value)
        } else if (key === NewsFormDataEnum.BACKGROUNDIMG) {
            if (typeof value !== 'string') throw Error('Помилка зображення')
            const image = await get(value, useIndexedDBStoreForImages(storeName))

            if (!(image instanceof File)) throw Error('Помилка зображення')
            formData.append(key, image)
        } else if (key === NewsFormDataEnum.DETAILS) {
            if (typeof value === 'string') throw Error('Помилка даних редактора')
            await parseDetailsRequestFormData(formData, value, storeName)
        }
    }

    return formData
}