import { CreateNewsFormData } from "@/app/types/data/news.type"


export const createNewsFormData = (data: CreateNewsFormData) => {
    const formData = new FormData()

    for (const key in data) {
        const value = data[key as keyof CreateNewsFormData]

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