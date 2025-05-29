import { Employee, EmployeesFormData } from "@/app/types/data/employees.type"


export const createEmployeeFormData = (data: EmployeesFormData) => {
    const formData = new FormData()

    for (const key in data) {
        const value = data[key as keyof EmployeesFormData]

        if (value instanceof FileList) {
            Array.from(value).forEach((file: File) => {
                formData.append(key, file)
            })
        }
        else if (Array.isArray(value) && typeof value !== 'string') {
            if (key !== undefined) {
                value.forEach((item) => {
                    formData.append(`${key}[]`, item.value)
                })
            }
        }
        else if (value !== undefined && value !== null) {
            formData.append(key, value)
        }
    }

    return formData
}

export const parseEmployeeFormDataToUpdate = (data: EmployeesFormData, id: string): Employee => {
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
        workSpecialities: data.workSpecialities.map((type) => type.value),
        achivements: data.achivements ? data.achivements.map((type) => type.value) : [],
        backgroundImgColor: data.backgroundImgColor,
        imgUrl: null,
    }
}