import {
    CreateServiceEmployeesFormData,
    CreateServiceFormData,
    CreateServiceTreatmentStagesFormData,
    CreateServiceTreatmentTypesFormData,
    ServiceEmployeesFormDataEnum,
    ServiceFormDataEnum,
    ServiceTreatmentStageEnum,
    ServiceTreatmentTypesEnum,
    ServiceTreatmentTypesEnumType
} from '@/app/types/data/services.type';
import { get } from 'idb-keyval';
import { getIndexedDBStoreForImages } from '@/app/utils/hooks/admin/indexedDB/useIndexedDBStoreForImages';
import { parseDetailsCreateRequestFormData } from '@/app/services/details.service';
import { renameFile } from '@/app/services/files.service';

const storeName = 'service_images'
const createStoreName = 'service_create_images'
const updateStoreName = 'service_update_images'

export const createServiceFormData = async (data: CreateServiceFormData) => {
    try {
        const formData = new FormData()

        for (const key in data) {
            const value = data[key as keyof CreateServiceFormData]

            if (key === ServiceFormDataEnum.IMAGE) {
                if (typeof value !== 'string') throw Error('Помилка BACKGROUNDIMG при створенні послуги')
                const image = await get<File>(value, getIndexedDBStoreForImages(createStoreName))

                if (!(image instanceof File)) throw Error('Помилка BACKGROUNDIMG при створенні послуги')
                const parsedImage = renameFile(image, value + image.name)
                formData.append(key, parsedImage)
            }
            else if (key === ServiceFormDataEnum.TREATMENTSTAGES) {
                const typedValues = value as CreateServiceTreatmentStagesFormData[]

                typedValues.forEach((typedValue, i) => {
                    if (typedValue[ServiceTreatmentStageEnum.TITLE] && typedValue[ServiceTreatmentStageEnum.DESCRIPTION]) {
                        formData.append(`${key}[${i}][order]`, `${i}`)
                        formData.append(`${key}[${i}][${ServiceTreatmentStageEnum.TITLE}]`, typedValue[ServiceTreatmentStageEnum.TITLE])
                        formData.append(`${key}[${i}][${ServiceTreatmentStageEnum.DESCRIPTION}]`, typedValue[ServiceTreatmentStageEnum.DESCRIPTION])
                    }
                })
            }
            else if (key === ServiceFormDataEnum.TREATMENTTYPES) {
                const typedValues = value as CreateServiceTreatmentTypesFormData[]

                await Promise.all(typedValues.map(async (typedValue, i) => {
                    for (const typedKey in typedValue) {
                        const value = typedValue[typedKey as keyof CreateServiceTreatmentTypesFormData]

                        if (typedKey === 'order') {
                            if (typeof value !== 'number') {
                                throw Error('Заголовок або опис неправильного формату')
                            }
                            formData.append(`${key}[${i}][${typedKey}]`, `${value}`)

                        } else if (typedKey === ServiceTreatmentTypesEnum.TITLE || typedKey === ServiceTreatmentTypesEnum.DESCRIPTION) {
                            if (typeof value !== 'string') {
                                throw Error('Заголовок або опис неправильного формату')
                            }
                            formData.append(`${key}[${i}][${typedKey}]`, value)
                        } else if (typedKey === ServiceTreatmentTypesEnum.BACKGROUNDIMG) {
                            if (typeof value !== 'string') throw Error('Помилка BACKGROUNDIMG при створенні новини зображення')
                            const image = await get<File>(value, getIndexedDBStoreForImages(createStoreName))

                            if (!(image instanceof File)) throw Error('Помилка BACKGROUNDIMG при створенні новини зображення')
                            const parsedImage = renameFile(image, value + image.name)
                            formData.append(`${key}[${i}][${typedKey}]`, value)
                            formData.append(`backgroundImgs`, parsedImage)
                        } else if (typedKey === ServiceTreatmentTypesEnum.DETAILS) {
                            if (typeof value === 'string' || typeof value === 'number') throw Error('Помилка даних редактора')
                            await parseDetailsCreateRequestFormData(formData, value, createStoreName, `${key}[${i}]`)
                        }
                    }
                }))
            }
            else if (key === ServiceFormDataEnum.EMPLOYEES) {
                const employees = value as CreateServiceEmployeesFormData[]

                employees.forEach((employee, i) => {
                    formData.append(`${key}[${i}][order]`, `${i}`)
                    formData.append(`${key}[${i}][${ServiceEmployeesFormDataEnum.ID}]`, `${employee[ServiceEmployeesFormDataEnum.ID]}`)
                })
            }
            else if (key === ServiceFormDataEnum.TREATMENTTYPESDESCRIPTION) {
                if (!Array.isArray(value) && value !== null) {
                    formData.append(key, value)
                }
            }
            // FOR STRING VALUES
            else {
                if (!Array.isArray(value) && value !== null) {
                    formData.append(key, value)
                }
            }
            // if (key === ServiceFormDataEnum.TITLE || key === ServiceFormDataEnum.DESCRIPTION) {
            //     if (typeof value !== 'string') {
            //         throw Error('Заголовок або опис неправильного формату')
            //     }
            //     formData.append(key, value)
            // } else if (key === ServiceFormDataEnum.IMAGE) {
            //     if (typeof value !== 'string') throw Error('Помилка BACKGROUNDIMG при створенні новини зображення')
            //     const image = await get<File>(value, getIndexedDBStoreForImages(createStoreName))

            //     if (!(image instanceof File)) throw Error('Помилка BACKGROUNDIMG при створенні новини зображення')
            //     const parsedImage = renameFile(image, value + image.name)
            //     formData.append(key, parsedImage)
            // } else if (key === ServiceFormDataEnum.DETAILS) {
            //     if (typeof value === 'string') throw Error('Помилка даних редактора')
            //     await parseDetailsCreateRequestFormData(formData, value, createStoreName)
            // }
        }

        return formData
    } catch (error) {
        console.error(error)
        throw Error('Error when parsing create details formData')
    }
}