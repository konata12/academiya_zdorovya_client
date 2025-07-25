import {
    clear,
    get,
    set,
    UseStore
} from 'idb-keyval';
import { CreateNewsFormData, News, NewsRequstDataEnum } from '@/app/types/data/news.type';
import { getFileNameFromSignedURLAndSaveBlobInIndexedDB } from '@/app/services/response.service';
import { getIndexedDBStoreForImages } from '@/app/utils/hooks/admin/indexedDB/useIndexedDBStoreForImages';
import { NewsDetailsOrderIndexedDBStoreNameType } from '@/app/types/data/details.type';
import { parseDetailsCreateRequestFormData, parseDetailsResponse, parseDetailsUpdateRequestFormData, transferDetailsRedactorTypeImagesBetweenIndexDBStores } from '@/app/services/details.service';
import { renameFileOrBlob } from '@/app/services/files.service';

const storeName = 'news_images'
const createStoreName = 'news_create_images'
const updateStoreName = 'news_update_images'

export const createNewsFormData = async (data: CreateNewsFormData) => {
    try {
        const formData = new FormData()

        for (const key in data) {
            const value = data[key as keyof CreateNewsFormData]

            if (key === NewsRequstDataEnum.TITLE || key === NewsRequstDataEnum.DESCRIPTION) {
                if (typeof value !== 'string') {
                    throw Error('Заголовок або опис неправильного формату')
                }
                formData.append(key, value)
            } else if (key === NewsRequstDataEnum.BACKGROUNDIMG) {
                if (typeof value !== 'string') throw Error('Помилка BACKGROUNDIMG при створенні новини зображення')
                const image = await get<File>(value, getIndexedDBStoreForImages(createStoreName))

                if (!(image instanceof File)) throw Error('Помилка BACKGROUNDIMG при створенні новини зображення')
                formData.append(key, image)
            } else if (key === NewsRequstDataEnum.DETAILS) {
                if (typeof value === 'string') throw Error('Помилка даних редактора')
                await parseDetailsCreateRequestFormData(formData, value, createStoreName)
            }
        }
        formData.append(NewsRequstDataEnum.CREATEDAT, `${Date.now()}`)

        return formData
    } catch (error) {
        console.error(error)
    }
}

export const updateNewsFormData = async (data: CreateNewsFormData) => {
    try {
        const formData = new FormData()

        for (const key in data) {
            const value = data[key as keyof CreateNewsFormData]

            if (key === NewsRequstDataEnum.TITLE || key === NewsRequstDataEnum.DESCRIPTION) {
                if (typeof value !== 'string') {
                    throw Error('Заголовок або опис неправильного формату')
                }
                formData.append(key, value)
            } else if (key === NewsRequstDataEnum.BACKGROUNDIMG) {
                if (typeof value !== 'string') throw Error('Помилка BACKGROUNDIMG при оновлені новини зображення')
                const image = await get<File | Blob>(value, getIndexedDBStoreForImages(updateStoreName))

                if (!(image instanceof Blob)) throw Error('Помилка BACKGROUNDIMG при оновлені новини зображення')
                const parsedImage = renameFileOrBlob(image, value)
                formData.append(key, parsedImage)
            } else if (key === NewsRequstDataEnum.DETAILS) {
                if (typeof value === 'string') throw Error('Помилка даних редактора')
                await parseDetailsUpdateRequestFormData(formData, value, updateStoreName)
            }
        }
        formData.append(NewsRequstDataEnum.CREATEDAT, `${Date.now()}`)
        console.log(2)

        return formData
    } catch (error) {
        console.error(error)
    }
}

export async function parseNewsResponse(news: News[]): Promise<News[]> {
    // CLEAR INDEXED DB DATA
    const store = getIndexedDBStoreForImages(storeName)
    clear(store)

    return await Promise.all(news.map(async (news) => {
        const {
            details,
            backgroundImg,
            ...data
        } = news

        let parsedBackgroungImg = await getFileNameFromSignedURLAndSaveBlobInIndexedDB(backgroundImg, store)

        // PARSE DETAILS AND SAVE IMAGES IN INDEXEDDB
        const parsedDetails = await parseDetailsResponse(details, store)

        return {
            ...data,
            backgroundImg: parsedBackgroungImg,
            details: parsedDetails
        }
    }))
}

export async function transferNewsImagesBetweenIndexDBStores(
    news: News,
    getStore: UseStore,
    setStore: UseStore,
) {
    const backgroundImg = await get<Blob | File>(news.backgroundImg, getStore)
    await set(news.backgroundImg, backgroundImg, setStore)

    transferDetailsRedactorTypeImagesBetweenIndexDBStores(news.details, getStore, setStore)
}