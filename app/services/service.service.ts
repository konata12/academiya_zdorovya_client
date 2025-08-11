import {
    CreateServiceEmployeesFormData,
    CreateServiceFormData,
    CreateServiceTreatmentStagesFormData,
    CreateServiceTypesFormData,
    Service,
    ServiceEmployeesFormDataEnum,
    ServiceFormDataEnum,
    ServiceTreatmentStageEnum,
    ServiceTypesEnum,
} from '@/app/types/data/services.type';
import { clear, get } from 'idb-keyval';
import { getIndexedDBStoreForImages } from '@/app/utils/hooks/admin/indexedDB/useIndexedDBStoreForImages';
import { parseDetailsCreateRequestFormData, parseDetailsResponse } from '@/app/services/details.service';
import { renameFile } from '@/app/services/files.service';
import { getFileNameFromSignedURLAndSaveBlobInIndexedDB } from '@/app/services/response.service';

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
                formData.append(key, value)
                formData.append(`service_${key}`, parsedImage)
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
            else if (key === ServiceFormDataEnum.SERVICETYPES) {
                const typedValues = value as CreateServiceTypesFormData[] | null

                if (typedValues) {
                    await Promise.all(typedValues.map(async (typedValue, i) => {
                        for (const typedKey in typedValue) {
                            const value = typedValue[typedKey as keyof CreateServiceTypesFormData]

                            if (typedKey === 'order') {
                                if (typeof value !== 'number') {
                                    throw Error('Заголовок або опис неправильного формату')
                                }
                                formData.append(`${key}[${i}][${typedKey}]`, `${value}`)

                            } else if (typedKey === ServiceTypesEnum.TITLE || typedKey === ServiceTypesEnum.DESCRIPTION) {
                                if (typeof value !== 'string') {
                                    throw Error('Заголовок або опис неправильного формату')
                                }
                                formData.append(`${key}[${i}][${typedKey}]`, value)
                            } else if (typedKey === ServiceTypesEnum.BACKGROUNDIMG) {
                                if (typeof value !== 'string') throw Error('Помилка BACKGROUNDIMG при створенні новини зображення')
                                const image = await get<File>(value, getIndexedDBStoreForImages(createStoreName))

                                if (!(image instanceof File)) throw Error('Помилка BACKGROUNDIMG при створенні новини зображення')
                                formData.append(`${key}[${i}][${typedKey}]`, value)
                                formData.append(`backgroundImgs`, image)
                            } else if (typedKey === ServiceTypesEnum.DETAILS) {
                                if (typeof value === 'string' || typeof value === 'number') throw Error('Помилка даних редактора')
                                await parseDetailsCreateRequestFormData(formData, value, createStoreName, `${key}[${i}]`)
                            }
                        }
                    }))
                }
            }
            else if (key === ServiceFormDataEnum.EMPLOYEES) {
                const employees = value as CreateServiceEmployeesFormData[]

                employees.forEach((employee, i) => {
                    formData.append(`${key}[${i}][order]`, `${i}`)
                    formData.append(`${key}[${i}][${ServiceEmployeesFormDataEnum.ID}]`, `${employee[ServiceEmployeesFormDataEnum.ID]}`)
                })
            }
            else if (key === ServiceFormDataEnum.SERVICETYPESDESCRIPTION) {
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

// PARSE RESPONSE DATA
export async function parseServiceResponse(service: Service[]): Promise<Service[]> {
    // CLEAR INDEXED DB DATA
    const store = getIndexedDBStoreForImages(storeName)
    clear(store)

    return await Promise.all(service.map(async (serviceData) => {
        const {
            image,
            serviceTypes,
            ...data
        } = serviceData
        let parsedServiceTypes = serviceTypes

        const parsedImage = await getFileNameFromSignedURLAndSaveBlobInIndexedDB(image, store)
        if (serviceTypes) {
            parsedServiceTypes = await Promise.all(serviceTypes.map(async (type) => {
                const {
                    details,
                    backgroundImg,
                    ...data
                } = type

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

        return {
            ...data,
            image: parsedImage,
            serviceTypes: parsedServiceTypes
        }
    }))

}