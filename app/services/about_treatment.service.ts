import { renameFile, renameFileOrBlob } from "@/app/services/files.service"
import { getFileNameFromSignedURLAndSaveBlobInIndexedDB } from "@/app/services/response.service"
import { AboutTreatment, AboutTreatmentEnum, AboutTreatmentFormData, CreateAboutTreatmentFormData } from "@/app/types/data/about_treatment.type"
import { getIndexedDBStoreForImages } from "@/app/utils/hooks/admin/indexedDB/useIndexedDBStoreForImages"
import { clear, get } from "idb-keyval"

const storeName = 'about_treatment_images'
const updateStoreName = 'about_treatment_update_images'
const createStoreName = 'about_treatment_create_images'

export const createAboutTreatmentFormData = async (data: CreateAboutTreatmentFormData) => {
    const formData = new FormData()

    for (const key in data) {
        const value = data[key as keyof CreateAboutTreatmentFormData]

        if (key === AboutTreatmentEnum.TITLE) {
            if (typeof value !== 'string') {
                throw Error('Заголовок неправильного формату')
            }
            formData.append(key, value)
        } else if (key === AboutTreatmentEnum.IMG) {
            if (typeof value !== 'string') throw Error('Помилка зображення при створенні варіанту лікування')
            const image = await get<File>(value, getIndexedDBStoreForImages(createStoreName))

            if (!(image instanceof File)) throw Error('Помилка зображення при створенні варіанту лікування 2')
            const parsedImage = renameFile(image, value + image.name)
            formData.append(key, parsedImage)
        } else if (key === AboutTreatmentEnum.TREATMENTTYPES) {
            if (!value.length || typeof value === 'string') throw Error('Список варіантів лікування не може бути порожнім')

            value.forEach(treatmentType => formData.append(`${key}[]`, treatmentType))
        }
    }

    return formData
}
export const updateAboutTreatmentFormData = async (data: CreateAboutTreatmentFormData) => {
    const formData = new FormData()

    for (const key in data) {
        const value = data[key as keyof CreateAboutTreatmentFormData]

        if (key === AboutTreatmentEnum.TITLE) {
            if (typeof value !== 'string') {
                throw Error('Заголовок неправильного формату')
            }
            formData.append(key, value)
        } else if (key === AboutTreatmentEnum.IMG) {
            if (typeof value !== 'string') throw Error('Помилка зображення при створенні варіанту лікування')
            const image = await get<File | Blob>(value, getIndexedDBStoreForImages(updateStoreName))
            console.log(image)

            if (!(image instanceof Blob)) throw Error('Помилка зображення при створенні варіанту лікування 2')
            const parsedImage = renameFileOrBlob(image, value)
            formData.append(key, parsedImage)
        } else if (key === AboutTreatmentEnum.TREATMENTTYPES) {
            if (!value.length || typeof value === 'string') throw Error('Список варіантів лікування не може бути порожнім')

            value.forEach(treatmentType => formData.append(key, treatmentType))
        }
    }

    return formData
}

export async function parseAboutTreatmentsResponse(aboutTreatments: AboutTreatment[]): Promise<AboutTreatment[]> {
    const store = getIndexedDBStoreForImages(storeName)
    clear(store)
    try {
        return await Promise.all(aboutTreatments.map(async (aboutTreatment) => {
            const {
                image,
                ...data
            } = aboutTreatment

            let parsedImage = await getFileNameFromSignedURLAndSaveBlobInIndexedDB(image, store)

            return {
                ...data,
                image: parsedImage,
            }
        }))
    } catch (error) {
        console.error(error)
        throw Error('Помилка при парсингу варіантів лікування')
    }
}