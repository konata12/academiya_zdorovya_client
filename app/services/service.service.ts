// noinspection ExceptionCaughtLocallyJS

import {
    CreateServiceEmployeesFormData,
    CreateServiceFormData,
    CreateServiceTreatmentStagesFormData,
    CreateServiceTypesFormData,
    Service,
    ServiceEmployeesFormDataEnum,
    ServiceFormData,
    ServiceFormDataEnum,
    ServiceResponseData,
    ServiceTreatmentStageBasicType,
    ServiceTreatmentStageEnum,
    ServiceTreatmentStageFormDataError,
    ServiceTypeResponseData,
    ServiceTypesEnum,
    ServiceTypeServiceFormData,
} from '@/app/types/data/services.type';
import { clear, get, UseStore } from 'idb-keyval';
import { getIndexedDBStoreForImages } from '@/app/utils/hooks/admin/indexedDB/useIndexedDBStoreForImages';
import { parseDetailsCreateRequestFormData, parseDetailsResponse, parseDetailsUpdateRequestFormData, transferDetailsRedactorTypeImagesBetweenIndexDBStores } from '@/app/services/details.service';
import { renameFile, renameFileOrBlob } from '@/app/services/files.service';
import { getFileNameFromSignedURLAndSaveBlobInIndexedDB } from '@/app/services/response.service';
import {
    parseOrderedArrayToRequest,
    sortByOrderWithOrderId,
    sortByOrderWithoutOrderId
} from '@/app/services/order.service';
import { AppDBSchema, transferImageBetweenIndexDBStores } from '@/app/services/indexedDB.service';


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
        }

        return formData
    } catch (error) {
        console.error(error)
        throw Error('Error when parsing create details formData')
    }
}
export const updateServiceFormData = async (data: CreateServiceFormData) => {
    try {
        const formData = new FormData()

        for (const key in data) {
            const value = data[key as keyof CreateServiceFormData]

            if (key === ServiceFormDataEnum.IMAGE) {
                if (typeof value !== 'string') throw Error('Помилка IMAGE при створенні послуги')
                const image = await get<File | Blob>(value, getIndexedDBStoreForImages(updateStoreName))

                if (!(image instanceof Blob)) throw Error('Помилка IMAGE при створенні послуги')
                const parsedImage = renameFileOrBlob(image, value)
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
                                const image = await get<File | Blob>(value, getIndexedDBStoreForImages(updateStoreName))

                                if (!(image instanceof Blob)) throw Error('Помилка BACKGROUNDIMG при створенні новини зображення')
                                const parsedImage = renameFileOrBlob(image, value)

                                formData.append(`${key}[${i}][${typedKey}]`, value)
                                formData.append(`backgroundImgs`, parsedImage)
                            } else if (typedKey === ServiceTypesEnum.DETAILS) {
                                if (typeof value === 'string' || typeof value === 'number') throw Error('Помилка даних редактора')
                                await parseDetailsUpdateRequestFormData(formData, value, updateStoreName, `${key}[${i}]`)
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
        }

        return formData
    } catch (error) {
        console.error(error)
        throw Error('Error when parsing create details formData')
    }
}

// PARSE RESPONSE DATA
export async function parseServiceResponse(service: ServiceResponseData[]): Promise<Service[]> {
    // CLEAR INDEXED DB DATA
    const store = getIndexedDBStoreForImages(storeName)
    await clear(store)

    return await Promise.all(service.map(async (serviceData) => {
        const {
            image,
            treatmentStages,
            serviceTypes,
            ...data
        } = serviceData

        const parsedImage = await getFileNameFromSignedURLAndSaveBlobInIndexedDB(image, store)
        const parsedTreatmentStages = sortByOrderWithoutOrderId(treatmentStages)
        const parsedServiceTypes = await parseServiceTypesResponse(serviceTypes, store)

        return {
            ...data,
            image: parsedImage,
            treatmentStages: parsedTreatmentStages,
            serviceTypes: parsedServiceTypes,
        }
    }))
}
async function parseServiceTypesResponse(
    serviceTypes: ServiceTypeResponseData[] | null,
    store: UseStore,
): Promise<ServiceTypeResponseData[] | null> {
    if (!serviceTypes) return serviceTypes

    return await Promise.all(serviceTypes.map(async (type) => {
        const {
            details,
            backgroundImg,
            ...data
        } = type

        let parsedBackgroundImg = await getFileNameFromSignedURLAndSaveBlobInIndexedDB(backgroundImg, store)

        // PARSE DETAILS AND SAVE IMAGES IN INDEXEDDB
        const parsedDetails = await parseDetailsResponse(details, store)

        return {
            ...data,
            backgroundImg: parsedBackgroundImg,
            details: parsedDetails
        }
    }))
}

// PARSE RESPONSE DATA TO FORM DATA
export function parseServiceToServiceFormData(
    service: Service
): ServiceFormData {
    const {
        id,
        serviceTypes,
        employees,
        ...data
    } = service

    const parsedServiceTypes = parseServiceTypesToServiceTypesFormData(serviceTypes)
    const parsedEmployees = sortByOrderWithOrderId(employees)

    return {
        ...data,
        serviceTypes: parsedServiceTypes,
        employees: parsedEmployees,
        errors: {
            title: { message: '' },
            shortDescription: { message: '' },
            image: { message: '' },
            treatmentStages: createTreatmentStagesErrors(data.treatmentStages),
            mainDescription: { message: '' },
            serviceTypesDescription: { message: '' },
            serviceTypes: { message: '' },
            employees: { message: '' },
        },
    }
}
function parseServiceTypesToServiceTypesFormData(
    serviceTypes: ServiceTypeResponseData[] | null
): ServiceTypeServiceFormData[] | null {
    if (!serviceTypes) return serviceTypes

    return sortByOrderWithOrderId(serviceTypes)
}
function createTreatmentStagesErrors(
    treatmentStages: ServiceTreatmentStageBasicType[]
): ServiceTreatmentStageFormDataError[] {
    return new Array(treatmentStages.length).fill({
        title: { message: '' },
        description: { message: '' },
    })
}

// WORK WITH IMAGES
export async function transferServiceImagesBetweenIndexDBStores(
    service: Service,
    getStoreName: keyof AppDBSchema,
    setStoreName: keyof AppDBSchema,
) {
    try {
        await transferImageBetweenIndexDBStores(
            service.image,
            getStoreName,
            setStoreName,
            'transferServiceImagesBetweenIndexDBStores',
        )

        if (service.serviceTypes) {
            await Promise.all(service.serviceTypes.map(async (type) => {
                await transferImageBetweenIndexDBStores(
                    type.backgroundImg,
                    getStoreName,
                    setStoreName,
                    'transferServiceImagesBetweenIndexDBStores',
                )

                await transferDetailsRedactorTypeImagesBetweenIndexDBStores(type.details, getStoreName, setStoreName)
            }))
        }
    } catch (error) {
        console.error(error)
        throw new Error('Error when transferring service images between indexedDB stores')
    }
}

// PARSE SERVICE AND SERVICE FORM DATA TO ONE TYPE
export function parseOldAndNewServiceDataToCheckIfDataIsEqual(
    oldData: Service | undefined,
    newData: Omit<ServiceFormData, 'errors'>
) {
    // console.log('oldData:', oldData)
    // console.log('newData:', newData)
    if (!oldData) return {
        oldData,
        newData,
    }

    const {
        id,
        ...oldOtherData
    } = oldData
    const {
        serviceTypes: newServiceTypes,
        employees: newEmployees,
        ...newOtherData
    } = newData

    return {
        oldData: oldOtherData,
        newData: {
            ...newOtherData,
            serviceTypes: newServiceTypes && parseOrderedArrayToRequest(newServiceTypes),
            employees: parseOrderedArrayToRequest(newEmployees),
        },
    }
}