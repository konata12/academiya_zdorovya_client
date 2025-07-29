import { renameFile } from "@/app/services/files.service"
import { AboutTreatment, AboutTreatmentEnum, AboutTreatmentFormData, CreateAboutTreatmentFormData } from "@/app/types/data/about_treatment.type"
import { getIndexedDBStoreForImages } from "@/app/utils/hooks/admin/indexedDB/useIndexedDBStoreForImages"
import { get } from "idb-keyval"

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

            if (!(image instanceof File)) throw Error('Помилка зображення при створенні варіанту лікування')
            const parsedImage = renameFile(image, value + image.name)
            formData.append(key, parsedImage)
        } else if (key === AboutTreatmentEnum.TREATMENTTYPES) {
            if (!value.length || typeof value === 'string') throw Error('Список варіантів лікування не може бути порожнім')
            
            value.forEach(treatmentType => formData.append('list', treatmentType))
        }
    }

    return formData
    // formData.append('title', data.title)
    // if (data.image) {
    //     formData.append('image', data.image[0]) // Assuming you want to send the first file in the FileList
    // }
    // data.treatmentTypes.forEach((type) => {
    //     formData.append(`list`, type.value)
    // })
    // return formData
}

export const parseFormDataToUpdate = (data: AboutTreatmentFormData, id: string): AboutTreatment => {
    return {
        id: +id,
        title: data.title,
        image: null,
        treatmentTypes: data.treatmentTypes
    }
}