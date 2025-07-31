import { renameFile } from "@/app/services/files.service"
import { CreateEmployeesFormData, Employee, EmployeeFormData, EmployeesFormDataEnum } from "@/app/types/data/employees.type"
import { getIndexedDBStoreForImages } from "@/app/utils/hooks/admin/indexedDB/useIndexedDBStoreForImages"
import { get } from "idb-keyval"

const storeName = 'employee_images'
const updateStoreName = 'employee_update_images'
const createStoreName = 'employee_create_images'

export const createEmployeeFormData = async (data: CreateEmployeesFormData) => {
    const formData = new FormData()

    for (const key in data) {
        const value = data[key as keyof CreateEmployeesFormData]

        if (key === EmployeesFormDataEnum.IMAGE) {
            if (typeof value !== 'string') throw Error('Помилка зображення при створенні варіанту лікування')
            const image = await get<File>(value, getIndexedDBStoreForImages(createStoreName))

            if (!(image instanceof File)) throw Error('Помилка зображення при створенні варіанту лікування 2')
            const parsedImage = renameFile(image, value + image.name)
            formData.append(key, parsedImage)
        }
        else if (Array.isArray(value) && typeof value !== 'string') {
            if (key !== undefined) {
                value.forEach((item) => {
                    formData.append(`${key}[]`, item)
                })
            }
        }
        else if (value !== undefined && value !== null) {
            formData.append(key, value)
        }
    }

    return formData
}

export const parseEmployeeFormDataToUpdate = (data: EmployeeFormData, id: string): Employee => {
    return {
        id: +id,
        name: data.name,
        surname: data.surname,
        position: data.position,
        description: data.description,
        degree: data.degree,
        instagram: data.instagram || null,
        facebook: data.facebook || null,
        X: data.X || null,
        youtube: data.youtube || null,
        workSpecialities: data.workSpecialities.map((type) => type),
        achivements: data.achivements ? data.achivements.map((type) => type) : [],
        backgroundImgColor: data.backgroundImgColor,
        image: 'string',
    }
}